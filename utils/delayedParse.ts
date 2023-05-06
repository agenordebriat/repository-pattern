import schemas from "~/schemas"

type DelayedParseFunction = (
  data: Ref<unknown>,
  repository: keyof typeof schemas,
  schema: keyof (typeof schemas)[keyof typeof schemas],
  pending: Ref<boolean>,
) => void

export const delayedParse: DelayedParseFunction = (
  data,
  repository,
  schema,
  pending,
) => {
  watch(pending, () => {
    if (!pending.value)
      data.value = parseData(data, schemas[repository][schema]).value
  })
}
