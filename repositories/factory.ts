import { defu } from "defu"
import { hash } from "ohash"
import type { ZodSchema } from "zod"
import type { AsyncDataOptions } from "nuxt/app"
import type { MultiWatchSources } from "nuxt/dist/app/composables/asyncData"

export interface Options<T = any, U = T> {
  fetchOptions?: Parameters<typeof $fetch>[1]
  asyncDataOptions?: Omit<AsyncDataOptions<T, U>, "watch"> & {
    watch?: MultiWatchSources | false
  }
  errorOptions?: {
    statusCode?: number
    statusMessage?: string
    message?: string
    fatal?: boolean
  }
}

export default class RepositoriesFactory {
  private $fetch: typeof $fetch

  constructor(fetchInstance: typeof $fetch = $fetch) {
    this.$fetch = fetchInstance
  }

  async fetch<T extends ZodSchema>(
    request: Parameters<typeof $fetch>[0],
    { fetchOptions, asyncDataOptions = {}, errorOptions = {} }: Options = {},
    schema: T | false,
  ) {
    if (schema && !schema.description) {
      throw createError({
        statusMessage: "Schema description is required",
        fatal: true,
      })
    }

    const _fetchOptions = reactive({ ...fetchOptions })
    const { watch } = asyncDataOptions

    const { data, pending, error, ...rest } = await useAsyncData(
      `${
        schema
          ? schema.description
          : `${request} (${hash([
              request,
              fetchOptions,
              asyncDataOptions,
              errorOptions,
            ])})`
      }`,
      () => this.$fetch(request, { ..._fetchOptions }),
      defu(
        { watch: watch === false ? [] : [_fetchOptions, ...(watch || [])] },
        asyncDataOptions,
      ),
    )

    if (error.value) {
      const { statusCode, statusMessage, message, fatal } = errorOptions
      const errorData: typeof errorOptions = error.value

      throw createError({
        statusCode: statusCode ?? errorData.statusCode,
        statusMessage: statusMessage ?? errorData.statusMessage,
        message: message ?? errorData.message,
        fatal: fatal ?? true,
      })
    }

    if (asyncDataOptions?.immediate === false) pending.value = false

    return {
      data: schema ? parseData(data, schema) : data,
      pending,
      ...rest,
      error,
    }
  }
}
