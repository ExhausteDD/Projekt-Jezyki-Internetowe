<template>
  <div class="wrapper">
    <header>
      <div class="navbar">
        <div class="container">
          <div class="navbar-content">
            <router-link to="/" class="header-logo">Film library</router-link>
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
          { title: 'Library', url: '/library' }
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
body
  color #fffffe
  background-color #232946
header
  top 0
  position sticky
  z-index 2
  .navbar
    background-color #232946
    border-bottom: 2px solid #121629
  .navbar-content
    .header-logo
      font-weight bold
      color #fffffe
      font-size 22px
      transition font-size .7s
      &:hover
        font-size 24px
    .navbar-item
      a,span
        color #fffffe
        font-weight bold
        transition font-size .7s
        &:hover
          font-size 20px
</style>
