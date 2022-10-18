import { createStore } from 'vuex'
import { UsersApi } from './modules/UsersApi.js'

export default createStore({
    modules: {
        UsersApi
    }
    // state: {
    //     users: []
    // },
    // mutations: {
    //     SET_USERS: (state, users) => (state.users = users)
    // },
    // actions: {
    //     async fetchUsers({ commit }) {
    //         const response = await new Promise((resolve) => {
    //             fetch('/json/data.json')
    //             .then(_response => resolve(_response.json()))
    //         })
    //         commit('SET_USERS', response)
    //     }
    // },
    // getters: {
    //     _users : (state) => state.users
    // }
})