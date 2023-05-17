import PostsRepository from "~/repositories/posts"
import UsersRepository from "~/repositories/users"

interface Repositories {
  posts: PostsRepository
  users: UsersRepository
}

type UseRepositoryFunction = <R extends keyof Repositories>(
  repository: R,
) => Repositories[R]

export const useRepository: UseRepositoryFunction = (repository) => {
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
