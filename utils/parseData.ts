import type { ZodSchema, z } from "zod"

type ParseDataFn = <S extends ZodSchema>(
  data: unknown | Ref<unknown>,
  schema: S,
) => Ref<z.infer<S> | null>

export const parseData: ParseDataFn = (data, schema) => {
  if (!unref(data)) return data

  const result = schema.safeParse(unref(data))

  if (!result.success) {
    throw createError({
      statusCode: 500,
      statusMessage: "Échec de la validation de données.",
      message: result.error.message,
      fatal: true,
    })
  }

  if (!isRef(data)) return result.data

  data.value = result.data

  return ref(data)
}
