export default defineNuxtConfig({
  devtools: {
    enabled: true,
  },
  runtimeConfig: {
    public: {
      JSONPLACEHOLDER_BASE_URL: "",
      MOCKAPI_BASE_URL: "",
    },
  },
  modules: ["@vueuse/nuxt"],
})
