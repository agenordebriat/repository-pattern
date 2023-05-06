import RepositoriesFactory from "~/repositories/factory"
import users from "~/schemas/users"
import type { Options } from "~/repositories/factory"

type Users = {
  id: string
  name: string
  city: string
}[]

const { all, names } = users

export default class UsersRepository extends RepositoriesFactory {
  all(options?: Options) {
    return this.fetch("/users", all, options)
  }

  names(options?: Options) {
    const { asyncDataOptions, ...rest } = options || {}

    return this.fetch("/users", names, {
      ...rest,
      asyncDataOptions: {
        ...asyncDataOptions,
        transform: users => (users as Users).map(user => user.name),
      },
    })
  }
}
