import { ref } from "vue";

export const useFetch = <T>(initialValue: T, fetcher: () => Promise<T>) => {
    const result = ref<T>(initialValue)
    const isLoading = ref(false);
    const error = ref<string | null>(null);

    const fetchData = async () => {
        try {
            isLoading.value = true;
            error.value = null;
            result.value = await fetcher();
        } catch (err) {
            error.value = (err as Error).message || 'Failed to fetch data';
        } finally {
            isLoading.value = false;
        }
    };

    return {
        result,
        isLoading,
        error,
        fetchData,
    } as const;
};