import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Uimini from 'uimini/dist/css/uimini.css'

import App from './App.vue'
import router from './router'
import store from './store'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/database'

Vue.use(
  Vuelidate,
  Uimini
)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
  created () { // Konfiguracyjne dane z Firebase
    var config = {
      apiKey: 'AIzaSyA6HWRo-fTjjyWgxdXZ0gXs_TKcr6u75To',
      authDomain: 'film-library-e9532.firebaseapp.com',
      databaseURL: 'https://film-library-e9532.firebaseio.com',
      projectId: 'film-library-e9532',
      storageBucket: 'film-library-e9532.appspot.com',
      messagingSenderId: '301364626329',
      appId: '1:301364626329:web:03f833c0121cafe6f84908',
      measurementId: 'G-27N9PQ27KX'
    }
    // Initialize Firebase
    firebase.initializeApp(config)

    firebase.auth().onAuthStateChanged(user => { // Utrzymywanie sesji dla zalogowanego uzytkownika
      if (user) {
        this.$store.dispatch('loggedUser', user)
      }
      this.$store.dispatch('loadTasks') // Dla wyswieltania listy filmow odrazu po zalogowaniu
    })
  }
}).$mount('#app')
