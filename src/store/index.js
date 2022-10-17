import { createStore } from 'vuex'

export default createStore({
    state: {
        users: [],
        message: 'Store のお勉強'
    },
    mutations: {
        SET_USERS:
            (state, users) => (state.users = users),
        CREATE_USER:
            (state, user) => state.users.unshift(user),
        DELETE_USER:
            (state, id) => state.users = state.users.filter((v) => v.id !== id)
    },
    actions: {
        async fetchUsers({ commit }) {
            const response = await new Promise((resolve) => {
                fetch('/json/data.json')
                .then(_response => resolve(_response.json()))
            })
            commit('SET_USERS', response)
        },
        createUser({ commit }, user) {
            commit('CREATE_USER', user)
        },
        deleteUser({ commit }, id) {
            commit('DELETE_USER', id)
        }
    },
    getters: {
        _users: (state) => state.users
    }
})