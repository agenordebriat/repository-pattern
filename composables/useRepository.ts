import PostsRepository from "~/repositories/posts"
import UsersRepository from "~/repositories/users"

interface Repositories {
  posts: PostsRepository
  users: UsersRepository
}

export function useRepository<T extends keyof Repositories>(repository: T): Repositories[T] {
  const jsonplaceholderFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.JSONPLACEHOLDER_BASE_URL,
  })

  const mockapiFetch = $fetch.create({
    baseURL: useRuntimeConfig().public.MOCKAPI_BASE_URL,
  })

  const repositories: Repositories = {
    posts: new PostsRepository(jsonplaceholderFetch),
    users: new UsersRepository(mockapiFetch),
  }

  return repositories[repository]
}
