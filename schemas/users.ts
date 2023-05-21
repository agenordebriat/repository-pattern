import { z } from "zod"

export const userNames = z.array(z.string())

export const users = z.array(
  z.object({ id: z.string(), name: z.string(), city: z.string() }),
)
