import { createStore } from 'vuex'
import { UsersApi } from './modules/UsersApi.js'

export default createStore({
    modules: {
        UsersApi
    }
})