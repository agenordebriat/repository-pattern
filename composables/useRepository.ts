import PostsRepository from "~/repositories/posts"
import UsersRepository from "~/repositories/users"

interface Repositories {
  posts: PostsRepository
  users: UsersRepository
}

type UseRepositoryFn = <R extends keyof Repositories>(
  repository: R,
) => Omit<Repositories[R], "fetch">

export const useRepository: UseRepositoryFn = (repository) => {
  const repositories: Repositories = {
    posts: new PostsRepository({
      baseURL: useRuntimeConfig().public.JSONPLACEHOLDER_BASE_URL,
    }),
    users: new UsersRepository({
      baseURL: useRuntimeConfig().public.MOCKAPI_BASE_URL,
    }),
  }

  return repositories[repository]
}
