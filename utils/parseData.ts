import type { ZodSchema, z } from "zod"

type ParseDataFunction = <T extends ZodSchema>(
  data: Ref<unknown>,
  schema: T,
) => Ref<z.infer<T> | null>

export const parseData: ParseDataFunction = (data, schema) => {
  if (!data.value) return data

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
