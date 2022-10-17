import { createStore } from 'vuex'

export default createStore({
    state: {
        users: [],
        message: 'Store のお勉強'
    },
    mutations: {
        setUsers: (state, users) => (state.users = users),
        removeUser: (state, id) => state.users = state.users.filter((v) => v.id !== id)
    },
    actions: {
        async fetchUsers({ commit }) {
            const response = await new Promise((resolve) => {
                fetch('/json/data.json')
                .then(_response => resolve(_response.json()))
            })
            commit('setUsers', response)
        },
        deleteUser({ commit }, id) {
            commit('removeUser', id)
        }
    },
    getters: {
        _users: (state) => state.users
    }
})