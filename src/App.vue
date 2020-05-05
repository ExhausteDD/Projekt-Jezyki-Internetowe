<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <router-link to="/" class="header-logo">Film library</router-link>
            <div @click="menuShow = !menuShow" :class="{ active: menuShow }" class="button-burger">
              <span class="line line-1"></span>
              <span class="line line-2"></span>
              <span class="line line-3"></span>
            </div>
            <div :class="{ active: menuShow }" class="navbar-list__wrapper">
              <ul class="navbar-list">
                <li class="navbar-item" v-for="link in linkMenu" :key="link.title" @click="menuShow = false">
                  <router-link :to="`${link.url}`" class="navbar-link">{{ link.title }}</router-link>
                </li>
                <li class="navbar-item" v-if="checkUser" @click="logOut">
                  <span class="navbar-link">Logout</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  data () {
    return {
      menuShow: false
    }
  },
  methods: {
    logOut () { // przy wyogowaniu przekirowywanie na strone logowania
      this.$store.dispatch('logoutUser')
      this.$router.push('/login')
    }
  },
  computed: {
    checkUser () { // Sprawdzamy czy user jest zalogowany
      return this.$store.getters.checkUser
    },
    linkMenu () {
      if (this.checkUser) { // jezeli zalogowany to ma dostep do stron ponizszych
        return [
          { title: 'Home', url: '/' },
          { title: 'Movies', url: '/movies' }
        ]
      }
      return [
        { title: 'Login', url: '/login' }, // jak nie to lece na rejestracje
        { title: 'Registration', url: '/registration' }
      ]
    }
  }
}
</script>

<style lang="stylus">
@import './assets/stylus/main.styl';
</style>
