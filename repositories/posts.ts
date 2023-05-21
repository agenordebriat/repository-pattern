import { defu } from "defu"
import RepositoriesFactory from "~/repositories/factory"
import { post } from "~/schemas/posts"
import type { Options } from "~/repositories/factory"

export default class PostsRepository extends RepositoriesFactory {
  postById = (id: number | Ref<number>, options?: Options) =>
    this.fetch(() => `/posts/${unref(id)}`, options, post)

  updatePost = (count: Ref<number>, options?: Options) => {
    const defaults: Options = { options: { method: "PUT", body: { count } } }

    return this.fetch("/posts/1", defu(options, defaults), false)
  }
}
