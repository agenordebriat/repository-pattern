import { z } from "zod"

export const post = z
  .object({
    userId: z.number(),
    id: z.number(),
    title: z.string(),
    body: z.string(),
  })
  .describe("Post")