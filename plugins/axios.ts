import { NuxtAxiosInstance } from '@nuxtjs/axios'

export default function ({ $axios }: { $axios: NuxtAxiosInstance })  {
  $axios.interceptors.request.use((config) => {
    console.log(`[REQUEST] ${config.method?.toUpperCase()} ${config.url}`, config.data || {})
    return config
  })
  $axios.interceptors.response.use((response) => {
    if (response.config.method && ['POST', 'PUT', 'PATCH'].includes(response.config.method.toUpperCase())) {
      // Use Data from Request for better prototyping
      response.data = JSON.parse(response.config.data)
    }
    return response
  })
  $axios.defaults.baseURL = 'https://private-anon-2ad44816f5-smaplypersonastest.apiary-mock.com/personas'
}
