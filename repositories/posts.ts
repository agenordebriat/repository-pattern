import RepositoriesFactory from "~/repositories/factory"
import { Post } from "~/schemas/posts"

export default class PostsRepository extends RepositoriesFactory {
  getPostById = (id: number | Ref<number>) =>
    this.fetch(() => `/posts/${unref(id)}`, Post, "Get post by ID")

  updatePost = (count: Ref<number>) =>
    this.fetch("/posts/1", false, "Update post", {
      options: { method: "PUT", body: { count } },
    })
}
