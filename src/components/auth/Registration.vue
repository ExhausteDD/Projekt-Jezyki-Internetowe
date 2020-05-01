<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <div class="auth">
          <div class="auth__banner">
            <h1 class="ui-title-2">Hello banner</h1>
          </div>
          <div class="auth__form">
            <span class="ui-title-2">Registration</span>
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
              <div :class="{ 'errorInput': $v.repeatPassword.$error }" class="form-item">
                <input v-model="repeatPassword" :class="{ 'error': $v.repeatPassword.$error }" @change="$v.repeatPassword.$touch()" type="password" placeholder="Powtórz swoje hasło">
                <div class="error" v-if="!$v.repeatPassword.sameAsPassword">Hasła nie są identyczne</div>
              </div>
              <div class="buttons-list">
                <button :disabled="submitStatus === 'PENDING'" type="submit" class="button button-primary">Rejestruj</button>
              </div>
              <div class="buttons-list buttons-list--info">
                <p class="typo__p" v-if="submitStatus === 'OK'">Dziękujemy za rejestracje!</p>
                <p class="typo__p" v-if="submitStatus === 'ERROR'">Proszę prawidłowo wypełnić pola.</p>
                <p class="typo__p" v-if="submitStatus === 'PENDING'">Wysyłanie...</p>
              </div>
              <div class="buttons-list buttons-list--info">
                <span>Jesteś zarejestrowany?
                  <router-link to="/login">  Wejdź tutaj</router-link>
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
import { required, email, minLength, sameAs } from 'vuelidate/lib/validators'
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
    },
    repeatPassword: {
      sameAsPassword: sameAs('password')
    }
  },
  methods: {
    onSubmit () {
      this.$v.$touch()
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        console.log('submit!')
        const user = {
          email: this.email,
          password: this.password
        }
        console.log(user)
        this.submitStatus = 'PENDING'
        setTimeout(() => {
          this.submitStatus = 'OK'
        }, 500)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.auth
  display flex
.auth__banner,
.auth__form
  width 50%

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
