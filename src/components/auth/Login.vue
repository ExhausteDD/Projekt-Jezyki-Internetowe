<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <div class="auth">
          <div class="auth__banner">
            <h1 class="ui-title-2">Hello banner</h1>
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
                <button type="submit" class="button button-primary">
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
            console.log('LOGIN!')
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
// Rozdzielenie ekranu na 2 czesci
.auth
  display flex
.auth__banner,
.auth__form
  width 50%

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
  &.error
    border-color #fc5c65
    animation shake .3s

// Przyciski
.buttons-list
  text-align right
  margin-bottom 20px
  &.buttons-list--info
    text-align center
    &:last-child
      margin-bottom 0px
a
  color #444ce0
</style>
