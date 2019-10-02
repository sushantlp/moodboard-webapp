import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

Vue.config.productionTip = false

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FirebasePlugin from './plugins/FirebasePlugin'

firebase.initializeApp({
  apiKey: "AIzaSyDNHOidgoTpuTVv4GJA6xeNPXOSzxJ7eBw",
  authDomain: "moodboard-mvp.firebaseapp.com",
  databaseURL: "https://moodboard-mvp.firebaseio.com",
  projectId: "moodboard-mvp",
  storageBucket: "moodboard-mvp.appspot.com",
  messagingSenderId: "247714230127",
  appId: "1:247714230127:web:b8e9fb2893f2c0bbc6c29a",
  measurementId: "G-C0MC8SNSLK"
});

const unsubscribe = firebase.auth().onAuthStateChanged(() => {
  unsubscribe()

  Vue.use(FirebasePlugin)

  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
})

