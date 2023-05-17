import { post } from "~/schemas/posts"
import { userNames, users } from "~/schemas/users"

export default {
  posts: { post },
  users: { userNames, users },
}
