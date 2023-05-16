import { z } from "zod"

export const users = z
  .array(z.object({ id: z.string(), name: z.string(), city: z.string() }))
  .describe("Users")

export const userNames = z.array(z.string()).describe("User names")
