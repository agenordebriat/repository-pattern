import { defu } from "defu"
import RepositoriesFactory from "~/repositories/factory"
import type { Options } from "~/repositories/factory"

export default class PostsRepository extends RepositoriesFactory {
  update = (count: Ref<number>, options?: Options) => {
    const defaults: Options = {
      fetchOptions: {
        method: "PUT",
        body: {
          count,
        },
      },
    }

    return this.fetch("/posts/1", defu(defaults, options), false)
  }
}
