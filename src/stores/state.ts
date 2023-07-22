import axios from 'axios'
import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useStateStore = defineStore('state', () => {
  const loading = ref(false)
  const error = ref(new Error())

  function isLoading(): boolean {
    return loading.value
  }

  function setLoading(val: boolean) {
    loading.value = val
  }

  function getError(): Error {
    return error.value
  }

  function clearError() {
    error.value = new Error()
  }

  function setError(e: any) {
    if (e instanceof axios.AxiosError) {
      error.value = {
        name: "Axios Error",
        message: "Request to " + e.request.responseURL + " failed with status code " + e.response?.status
      }
    } else if (e instanceof Error ) {
      error.value = e
    } else {
      error.value = new Error(e)
    }
  }

  return {
    isLoading, setLoading,
    getError, setError, clearError
  }
})
