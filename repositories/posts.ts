import { defu } from "defu"
import RepositoriesFactory from "~/repositories/factory"
import { post } from "~/schemas/posts"
import type { Options } from "~/repositories/factory"

export default class PostsRepository extends RepositoriesFactory {
  getPostById = (id: number | Ref<number>, options?: Options) =>
    this.fetch(() => `/posts/${unref(id)}`, post, "Get post by ID", options)

  updatePost = (count: Ref<number>, options?: Options) => {
    const defaults: Options = { options: { method: "PUT", body: { count } } }

    return this.fetch("/posts/1", false, "Update post", defu(options, defaults))
  }
}
