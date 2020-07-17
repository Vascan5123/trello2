
export default {
    state: {
        sign: false,
        signMode: 'reg'
    },
    mutations: {
        SetSign(state, payload) {
            state.sign = payload
        },
        SetSignMode(state, payload) {
            state.signMode = payload
        }
        },
    actions: {
        SetSignAction({ commit }, payload) {
            commit("SetSign", payload)
        },
        SetSignModeAction({ commit }, payload) {
            commit("SetSignMode", payload)
        }
    },
    getters: {
        get_sign: (state) => state.sign,
        get_sign_mode: (state) => state.signMode,
    }
}
