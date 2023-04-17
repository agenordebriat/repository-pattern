import RepositoriesFactory from "~/repositories/factory"
import { Users } from "~/schemas/user"
import type { Options } from "~/repositories/factory"

export default class UserRepository extends RepositoriesFactory {
  getAll(options?: Options) {
    return this.fetch("/users", Users, options)
  }
}
