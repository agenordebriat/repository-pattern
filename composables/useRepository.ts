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
  const jsonplaceholderOptions = {
    baseURL: useRuntimeConfig().public.JSONPLACEHOLDER_BASE_URL,
  }

  const mockapiOptions = {
    baseURL: useRuntimeConfig().public.MOCKAPI_BASE_URL,
  }

  const repositories: Repositories = {
    posts: new PostsRepository(jsonplaceholderOptions),
    users: new UsersRepository(mockapiOptions),
  }

  return repositories[repository]
}
