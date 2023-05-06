import RepositoriesFactory from "~/repositories/factory"
import schemas from "~/schemas"
import type { Options } from "~/repositories/factory"

type Users = {
  id: string
  name: string
  city: string
}[]

export default class UsersRepository extends RepositoriesFactory {
  all(options?: Options) {
    return this.fetch("/users", schemas.users.all, options)
  }

  names(options?: Options) {
    const { asyncDataOptions, ...rest } = options || {}

    return this.fetch("/users", schemas.users.names, {
      ...rest,
      asyncDataOptions: {
        ...asyncDataOptions,
        transform: users => (users as Users).map(user => user.name),
      },
    })
  }
}
