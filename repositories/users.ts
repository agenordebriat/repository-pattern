import { defu } from "defu"
import type { z } from "zod"
import RepositoriesFactory from "~/repositories/factory"
import users from "~/schemas/users"
import type { Options } from "~/repositories/factory"

const { all, names } = users

export default class UsersRepository extends RepositoriesFactory {
  all = (options?: Options) => this.fetch("/users", options, all)
  names = (options?: Options) => {
    const defaults: Options<z.infer<typeof all>, string[]> = {
      asyncDataOptions: {
        transform: users => users.map(user => user.id),
      },
    }

    return this.fetch("/users", defu(defaults, options), names)
  }
}
