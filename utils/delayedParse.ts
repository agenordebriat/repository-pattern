import type { ZodSchema } from "zod"

type DelayedParseFn = (
  data: Ref<unknown>,
  schema: ZodSchema,
  pending: Ref<boolean>,
) => void

export const delayedParse: DelayedParseFn = (data, schema, pending) => {
  watch(pending, () => {
    if (!pending.value) {
      const parsedData = parseData(data, schema)

      data.value = parsedData.value
    }
  })
}
