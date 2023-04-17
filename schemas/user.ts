import { z } from "zod"

const User = z.object({ id: z.string(), name: z.string() })

export const Users = z.array(User)
