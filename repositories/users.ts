import { defu } from "defu"
import type { z } from "zod"
import RepositoriesFactory from "~/repositories/factory"
import { userNames, users } from "~/schemas/users"
import type { Options } from "~/repositories/factory"

export default class UsersRepository extends RepositoriesFactory {
  users = (options?: Options) => this.fetch("/users", options, users)

  userNames = (options?: Options) => {
    const defaults: Options<z.infer<typeof users>, string[]> = {
      options: { transform: users => users.map(user => user.name) },
    }

    return this.fetch("/users", defu(defaults, options), userNames)
  }
}
