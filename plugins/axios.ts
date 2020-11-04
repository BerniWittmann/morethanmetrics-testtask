import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios }: { $axios: NuxtAxiosInstance })  {
  $axios.interceptors.request.use((config) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config.data || {})
    return config
  })
  $axios.defaults.baseURL = 'https://private-anon-2ad44816f5-smaplypersonastest.apiary-mock.com/personas'
}
