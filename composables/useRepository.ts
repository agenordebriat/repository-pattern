import UsersRepository from "~/repositories/users"

interface Repositories {
  users: UsersRepository
}

export function useRepository(repository: keyof Repositories) {
  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_BASE_URL,
  })

  const repositories: Repositories = {
    users: new UsersRepository(fetch),
  }

  return repositories[repository]
}
