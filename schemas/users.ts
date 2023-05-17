import { z } from "zod"

export const userNames = z.array(z.string()).describe("User names")

export const users = z
  .array(z.object({ id: z.string(), name: z.string(), city: z.string() }))
  .describe("Users")
