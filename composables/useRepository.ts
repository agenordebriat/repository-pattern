import UserRepository from "~/repositories/user"

interface Repositories {
  user: UserRepository
}

export function useRepository(repository: keyof Repositories) {
  const fetch = $fetch.create({
    baseURL: useRuntimeConfig().public.API_BASE_URL,
  })

  const repositories: Repositories = {
    user: new UserRepository(fetch),
  }

  return repositories[repository]
}
