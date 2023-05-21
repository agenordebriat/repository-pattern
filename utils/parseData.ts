import type { ZodSchema, z } from "zod"

type ParseDataFn = <S extends ZodSchema>(
  data: Ref<unknown>,
  schema: S,
) => Ref<z.infer<S> | null>

export const parseData: ParseDataFn = (data, schema) => {
  if (!data.value) return data

  const result = schema.safeParse(data.value)

  if (!result.success) {
    throw createError({
      statusCode: 500,
      statusMessage: "Échec de la validation de données.",
      message: result.error.message,
      fatal: true,
    })
  }

  return ref(result.data)
}
