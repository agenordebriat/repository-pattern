import { z } from "zod"

export default {
  all: z.array(
    z.object({
      id: z.string(),
      name: z.string(),
      city: z.string(),
    }),
  ),
  names: z.array(z.string()),
}
