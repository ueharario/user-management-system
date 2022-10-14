import { createStore } from 'vuex'

export default createStore({
    state: {
        users: [
            {
                id: 1,
                name: "Michael",
                gender: 1,
                maleMsg: "male_Micheal"
            },
            {
                id: 2,
                name: "Lincoln",
                gender: 1,
                maleMsg: "male_Lincoln"
            },
            {
                id: 3,
                name: "Michelle",
                gender: 2,
                femaleMsg: "female_Michelle"
            }
        ],
        message: 'Store のお勉強'
    },
    mutations: {
        xxx: function(state, users) {
            state.users = users
        }
    },
    actions: {
        ApiGetUserData({commit}) {
            return new Promise((resolve) => {
                fetch('/json/data.json')
                .then(response => { resolve(commit('xxx', response.json())) })
            })
        }
    }
})