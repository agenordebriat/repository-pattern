import { z } from "zod"

export const UserNames = z.array(z.string())

export const Users = z.array(
  z.object({ id: z.string(), name: z.string(), city: z.string() }),
)
