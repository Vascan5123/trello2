
export default {
    state: {
        user: {
            isAuthenticated: null,
            id: localStorage.getItem('id'),
            email: localStorage.getItem('email'),
            name: localStorage.getItem('name'),
            avatar: localStorage.getItem('avatar')
        }
    },
    mutations: {
        SetAutoLogin(state) {
            state.user.isAuthenticated = true
            state.user.id = localStorage.getItem('id')
            state.user.email = localStorage.getItem('email')
            state.user.name = localStorage.getItem('name')
            state.user.avatar = localStorage.getItem('avatar')
        },
        SetAvatarM(state, payload) {
            state.user.avatar = payload
        },
        SetNameM(state, payload) {
            state.user.name = payload
        },
        SetEmailM(state, payload) {
            state.user.email = payload
        },
    },
    actions: {
        AutoLogin({ commit }, payload) {
            if (payload != undefined) {
                if (payload.succes == true) {
                    commit("SetAutoLogin")
                }
            }
        },
        SetAvatar({ commit }, payload) {
            commit("SetAvatarM", payload)
        },
        SetName({ commit }, payload) {
            commit("SetNameM", payload)
        },
        SetEmail({ commit }, payload) {
            commit("SetEmailM", payload)
        }
    },
    getters: {
        isUserAuthenticated: (state) => state.user.isAuthenticated,
        isUserId: (state) => state.user.id,
        isUserName: (state) => state.user.name,
        isUserEmail: (state) => state.user.email,
        isUserAvatar: (state) => state.user.avatar,
    }

}