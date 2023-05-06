import schemas from "~/schemas"

type Key = keyof typeof schemas
type Schema = keyof (typeof schemas)[Key]

type DelayedParseFunction = (
  data: Ref<unknown>,
  key: Key,
  schema: Schema,
  pending: Ref<boolean>,
) => void

export const delayedParse: DelayedParseFunction = (
  data,
  key,
  schema,
  pending,
) => {
  watch(pending, () => {
    if (!pending.value) data.value = parseData(data, schemas[key][schema]).value
  })
}
