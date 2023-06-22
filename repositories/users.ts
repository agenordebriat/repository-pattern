import { defu } from "defu"
import type { z } from "zod"
import RepositoriesFactory from "~/repositories/factory"
import { UserNames, Users } from "~/schemas/users"
import type { Options } from "~/repositories/factory"

export default class UsersRepository extends RepositoriesFactory {
  getUserNames = (options?: Options) => {
    const defaults: Options<
      z.infer<typeof Users>,
      z.infer<typeof UserNames>
    > = {
      options: { transform: users => users.map(user => user.name) },
    }

    return this.fetch(
      "/users",
      UserNames,
      "Get user names",
      defu(options, defaults),
    )
  }

  getUsers = () => this.fetch("/users", Users, "Get users")
}
