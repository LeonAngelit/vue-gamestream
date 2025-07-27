import { reactive, onMounted } from "vue";

export function useFetch(apiUrl = '', onSuccess = () => { }) {
    const fetchGames = async () => {
        try {
            state.isLoading = true;
            const response = await fetch(apiUrl);
            const json = await response.json();
            state.data = json;
            onSuccess(json)
        } catch (error) {
            console.error(error)
            state.error = error
        } finally {
            state.isLoading = false
        }

    }

    const state = reactive({
        error: null,
        isLoading: false,
        data: []
    })

    onMounted(() => {
        fetchGames();
    })

    return {state}
}