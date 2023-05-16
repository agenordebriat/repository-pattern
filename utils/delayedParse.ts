import type { ZodSchema } from "zod"
import schemas from "~/schemas"

type DelayedParseFunction = <
  R extends keyof typeof schemas,
  S extends keyof (typeof schemas)[R],
>(
  data: Ref<unknown>,
  repository: R,
  schema: S,
  pending: Ref<boolean>,
) => void

export const delayedParse: DelayedParseFunction = (
  data,
  repository,
  schema,
  pending,
) => {
  watch(pending, () => {
    if (!pending.value) {
      const parsedData = parseData(
        data,
        schemas[repository][schema] as ZodSchema,
      )
      data.value = parsedData.value
    }
  })
}
