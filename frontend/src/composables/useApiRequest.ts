import { ref } from 'vue';
import { ApiClientError } from '../services/apiClient';

export const useApiRequest = () => {
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  const run = async <TData>(request: () => Promise<TData>): Promise<TData | null> => {
    isLoading.value = true;
    error.value = null;

    try {
      return await request();
    } catch (requestError) {
      error.value =
        requestError instanceof ApiClientError
          ? requestError.message
          : 'Something went wrong. Please try again.';

      return null;
    } finally {
      isLoading.value = false;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return {
    isLoading,
    error,
    run,
    clearError,
  };
};
