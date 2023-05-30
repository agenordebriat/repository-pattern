import { defu } from "defu"
import { hash } from "ohash"
import type { UseFetchOptions } from "nuxt/app"
import type { ZodSchema } from "zod"

export interface Options<T = any, U = T> {
  options?: UseFetchOptions<T, U>
  errorOptions?: {
    statusCode?: number
    statusMessage?: string
    message?: string
    fatal?: boolean
  }
}

export default class RepositoriesFactory {
  private defaultOptions: Parameters<typeof useFetch>[1]

  constructor(options: Parameters<typeof useFetch>[1]) {
    this.defaultOptions = options
  }

  async fetch<S extends ZodSchema>(
    request: Parameters<typeof useFetch>[0],
    { options, errorOptions = {} }: Options = {},
    schema: S | false,
    description: string,
  ) {
    const { data, pending, error, ...rest } = await useFetch(
      request,
      defu(
        {
          key: `${`${description} (${hash([options, errorOptions, Date()])})`}`,
          ...options,
        },
        this.defaultOptions,
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

    if (options?.immediate === false) pending.value = false

    return {
      data: (schema ? parseData(data, schema) : data) as Ref<S["_output"]>,
      pending,
      ...rest,
      error,
    }
  }
}
