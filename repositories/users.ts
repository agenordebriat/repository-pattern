import { defu } from "defu"
import type { z } from "zod"
import RepositoriesFactory from "~/repositories/factory"
import users from "~/schemas/users"
import type { Options } from "~/repositories/factory"

const { all, names } = users

export default class UsersRepository extends RepositoriesFactory {
  all = (options?: Options) => this.fetch("/users", all, options)
  names = (options?: Options) => {
    const defaults: Options<z.infer<typeof all>, string[]> = {
      asyncDataOptions: {
        transform: users => users.map(user => user.name),
      },
    }

    return this.fetch("/users", names, defu(defaults, options))
  }
}
