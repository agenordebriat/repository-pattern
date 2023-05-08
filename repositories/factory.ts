import type { ZodSchema } from "zod"
import type { AsyncDataOptions } from "nuxt/app"

export interface Options<T = void, U = T> {
  fetchOptions?: Parameters<typeof $fetch>[1]
  asyncDataOptions?: AsyncDataOptions<T, U>
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
    schema: T,
    { fetchOptions, asyncDataOptions, errorOptions = {} }: Options | any = {},
  ) {
    if (!schema.description) {
      throw createError({
        statusMessage: "Schema description is required",
        fatal: true,
      })
    }

    const { data, pending, error, ...rest } = await useAsyncData(
      schema.description,
      () => this.$fetch(request, fetchOptions),
      asyncDataOptions,
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

    return { data: parseData(data, schema), pending, ...rest, error }
  }
}
