<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <div class="auth">
          <div class="auth__banner">
            <img src="https://images.pexels.com/photos/1040158/pexels-photo-1040158.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=1920&w=1280" alt="auth banner">
          </div>
          <div class="auth__form">
            <span class="ui-title-2">Login</span>
            <form @submit.prevent="onSubmit">
              <div :class="{ 'errorInput': $v.email.$error }" class="form-item">
                <input v-model="email" :class="{ 'error': $v.email.$error }" @change="$v.email.$touch()" type="email" placeholder="Email">
                <div class="error" v-if="!$v.email.required">Pole wymagane</div>
                <div class="error" v-if="!$v.email.email">Nieprawidłowy adres email</div>
              </div>
              <div :class="{ 'errorInput': $v.password.$error }" class="form-item">
                <input v-model="password" :class="{ 'error': $v.password.$error }" @change="$v.password.$touch()" type="password" placeholder="Hasło">
                <div class="error" v-if="!$v.password.required">Pole wymagane</div>
                <div class="error" v-if="!$v.password.minLength">Hasło musi zawierac minimalnie {{ $v.password.$params.minLength.min }} znaków.</div>
              </div>
              <div class="buttons-list">
                <button :class="{ 'button--disable': $v.$invalid }" type="submit" class="button button-primary">
                  <span v-if="loading">Loading...</span>
                  <span v-else>Loguj</span>
                </button>
              </div>
              <div class="buttons-list buttons-list--info">
                <p class="typo__p" v-if="submitStatus === 'OK'">Zalogowano</p>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Proszę prawidłowo wypełnić pola.</p>
                <p class="typo__p" v-else="">{{ submitStatus }}</p>
              </div>
              <div class="buttons-list buttons-list--info">
                <span>Nie jesteś zarejestrowany?
                  <router-link to="/registration">  Wejdź tutaj</router-link>
                </span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      email: '',
      password: '',
      repeatPassword: '',
      submitStatus: null
    }
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required,
      minLength: minLength(6)
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) { // Sprawdzanie walidnosci
        this.submitStatus = 'ERROR'
      } else {
        const user = {
          email: this.email,
          password: this.password
        }
        this.$store.dispatch('loginUser', user) // Logowanie usera i przekierowywanie na strona glowna
          .then(() => {
            this.submitStatus = 'OK'
            this.$router.push('/')
          })
          .catch(err => { //  w razie bledu komunikat o pomylce
            this.submitStatus = err.message
          })
      }
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style lang="stylus" scoped>
.content-wrapper
  min-height auto

.ui-title-2
  color #fffffe

.auth__banner
  box-shadow 0px 4px 10px 2px rgba(white, 0.2)

// Rozdzielenie ekranu na 2 czesci
.auth
  display flex
  flex-wrap wrap
  justify-content space-between
.auth__banner,
.auth__form
  width 50%
  @media screen and (max-width 768px)
    width 100%
    margin-bottom 30px
    &:last-child
      margin-bottom 0px

.auth__form
  max-width 400px

// Style dla wskazowek walidacyjnych
.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13px
    color #fc5c65
  &.errorInput
    .error
      display block

input
  background-color #232946
  border 2px solid #121629
  color #fffffe
  transition .7s
  &::placeholder
    color #eebbc3
    font-family Montserrat
  &.error
    border-color #fc5c65
    animation shake .3s
  &:focus
    box-shadow 0px 4px 10px 2px rgba(white, 0.2)

// Przyciski
.buttons-list
  text-align right
  margin-bottom 20px
  .button
    font-family inherit
    font-weight bold
    background-color #eebbc3
    color #232946
    border 3px solid #121629
    border-radius 9em
    transition all .7s
    &:hover
      border-color #fffffe
  .button--disable
    opacity 0.3
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0px

a
  color #fffffe
  font-weight bold
  transition .7s
  &:hover
    color #eebbc3
</style>
