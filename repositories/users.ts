import { defu } from "defu"
import type { z } from "zod"
import RepositoriesFactory from "~/repositories/factory"
import schemas from "~/schemas/users"
import type { Options } from "~/repositories/factory"

export default class UsersRepository extends RepositoriesFactory {
  all = (options?: Options) => this.fetch("/users", options, schemas.all)
  names = (options?: Options) => {
    const defaults: Options<z.infer<typeof schemas.all>, string[]> = {
      asyncDataOptions: { transform: users => users.map(user => user.id) },
    }

    return this.fetch("/users", defu(defaults, options), schemas.names)
  }
}
