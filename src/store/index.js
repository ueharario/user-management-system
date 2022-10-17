import { createStore } from 'vuex'

export default createStore({
    state: {
        userData: [],
        message: 'Store のお勉強'
    },
    mutations: {
        setUsers: (state, userData) => (state.userData = userData)
    },
    actions: {
        async fetchUsers({ commit }) {
            const response = await new Promise((resolve) => {
                fetch('/json/data.json')
                .then(_response => resolve(_response.json()))
            })
            commit('setUsers', response)
        }
    },
    getters: {
        _users: (state) => state.userData
    }
})