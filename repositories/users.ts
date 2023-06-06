import { defu } from "defu"
import type { z } from "zod"
import RepositoriesFactory from "~/repositories/factory"
import { userNames, users } from "~/schemas/users"
import type { Options } from "~/repositories/factory"

export default class UsersRepository extends RepositoriesFactory {
  getUserNames = (options?: Options) => {
    const defaults: Options<
      z.infer<typeof users>,
      z.infer<typeof userNames>
    > = {
      options: { transform: users => users.map(user => user.name) },
    }

    return this.fetch(
      "/users",
      userNames,
      "Get user names",
      defu(options, defaults),
    )
  }

  getUsers = () => this.fetch("/users", users, "Get users")
}
