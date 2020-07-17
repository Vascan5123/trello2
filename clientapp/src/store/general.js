
export default {
    state: {
        processing: false,
        error: false,
    },
    mutations: {
        set_processing(state, payload) {
            state.processing = payload
        },
        set_error(state, payload) {
            state.error = payload
        },
        clean_error(state) {
            state.error = null
        }
        },
    actions: {
        
    },
    getters: {
        get_processing: (state) => state.processing,
        get_error: (state) => state.error,
    }
}
