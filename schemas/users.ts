import { z } from "zod"

const UserNames = z.array(z.string())

export default {
  names: UserNames,
}
