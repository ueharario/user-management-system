// import { createStore } from 'vuex'
// import { VuexPersistence } from 'vuex-persist'

// const vuexPersist = new VuexPersistence({
//   storage: localStorage
// })

// export default createStore({
//   state: {
//     count: 0,
//     users: []
//   },
//   getters: {
//     getCount: (state) => {
//       return state.users.length
//     },
//     getAll: (state) => {
//       return state.users
//     },
//     getUserById: (state) => (id) => {
//       return state.users.find(user => user.id === id)
//     }
//   },
//   mutations: {
//     RESTORE_MUTATION: vuexPersist.RESTORE_MUTATION,
//     /** user を保存する */
//     save (state, newUser) {
//       if (newUser.id) {
//         let x = state.users.find(user => user.id === newUser.id)
//         x.name = newUser.name,
//         x.gender = newUser.gender
//       } else {
//         newUser.id = ++state.count
//         state.users.unshift(newUser)
//       }
//     },
//     delete (state, id) {
//       state.users = state.users.filter(user => user.id !== id)
//     },
//   },
//   actions: {
//   },
//   modules: {
//   },
//   plugins: [vuexPersist.plugin]
// })
