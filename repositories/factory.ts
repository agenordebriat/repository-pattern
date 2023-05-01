import type { ZodSchema, z } from "zod"

export interface Options {
  fetchOptions?: Parameters<typeof $fetch>[1]
  asyncDataOptions?: Parameters<typeof useAsyncData>[2]
  errorOptions?: {
    statusCode?: number
    statusMessage?: string
    message?: string
    fatal?: boolean
  }
}

function parseData<T extends ZodSchema>(
  data: Ref<unknown>,
  schema: T,
): Ref<z.infer<T> | null> {
  if (!data.value)
    return data

  const result = schema.safeParse(data.value)

  if (!result.success) {
    throw createError({
      statusCode: 500,
      statusMessage: "La validation des données a échoué",
      message: result.error.message,
      fatal: true,
    })
  }

  return ref(result.data)
}

export default class RepositoriesFactory {
  private $fetch: typeof $fetch

  constructor(fetchInstance: typeof $fetch) {
    this.$fetch = fetchInstance
  }

  async fetch<T extends ZodSchema>(
    request: string,
    schema: T,
    { fetchOptions, asyncDataOptions, errorOptions = {} }: Options = {},
  ) {
    const { data, error, ...rest } = await useAsyncData(
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
        fatal: fatal ?? false,
      })
    }

    return { data: parseData(data, schema), ...rest }
  }
}
