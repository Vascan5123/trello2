import Vue from 'vue'
import Vuex from 'vuex'
import UserModule from './user.js'
import GeneralModule from './general.js'
import signup from './signup.js'

Vue.use(Vuex)


export default new Vuex.Store({
    modules: {
        UserModule,
        GeneralModule,
        signup,
    },
})