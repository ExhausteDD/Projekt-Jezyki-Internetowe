<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <h1 class="ui-title-1">Home</h1>
        <form @submit.prevent="onSubmit">
          <div :class="{ errorInput: $v.taskTitle.$error }" class="form-item">
            <input v-model="taskTitle" @change="$v.taskTitle.$touch()" :class="{ error: $v.taskTitle.$error }" type="text" placeholder="Co będziesz oglądać">
            <div class="error" v-if="!$v.taskTitle.required">Pole wymagane</div>
          </div>
          <div class="form-item">
            <textarea v-model="taskDescription" @keyup.enter="onSubmit" type="text" placeholder="Opis"></textarea>
          </div>
          <div class="option-list">
            <input v-model='whatWatch' type="radio" id="radioFilm" value="Film" class="what-watch--radio ui-checkbox">
            <label for="radioFilm">Film</label>
            <input v-model='whatWatch' type="radio" id="radioSerial" value="Serial" class="what-watch--radio ui-checkbox">
            <label for="radioSerial">Serial</label>
          </div>
          <div class="total-time">
            <p class="ui-text-regular">Wpisz ile to trwa</p>
            <div v-if="whatWatch === 'Film'" class="total-time__film">
              <span class="time-title">Godziny</span>
              <input v-model="filmHours" type="number" class="time-input">
              <span class="time-title">Minuty</span>
              <input v-model="filmMinutes" type="number" class="time-input">
              <p> {{ filmTime }} </p>
            </div>
            <div v-if="whatWatch === 'Serial'" class="total-time__serial">
              <span class="time-title">Ile sezonów?</span>
              <input v-model="serialSeason" type="number" class="time-input">
              <span class="time-title">Ile odcinków?</span>
              <input v-model="serialSeries" type="number" class="time-input">
              <span class="time-title">Ile trwa jeden odcinek? (w minutach)</span>
              <input v-model="serialSeriesMinutes" type="number" class="time-input">
              <p> {{ serialTime }} </p>
            </div>
          </div>
          <div class="tag-list tag-list--add">
            <div @click="tagMenuShow = !tagMenuShow" class="ui-tag__wrapper">
              <div class="ui-tag">
                <span class="tag-title">Dodaj nową metkę</span>
                <span :class="{ active: !tagMenuShow }" class="button-close"></span>
              </div>
            </div>
          </div>
          <transition name="fade">
            <div v-if="tagMenuShow" class="tag-list tag-list--menu">
              <input v-model="tagTitle" @keyup.enter="newTag" type="text" placeholder="Nowy tag" class="tag-add--input">
              <div @click="newTag" class="button button-default">Wyślij</div>
            </div>
          </transition>
          <div class="tag-list">
            <p class="ui-text-regular">Spis twoich metek:</p>
            <transition-group enter-active-class="animated fadeInRight" leave-active-class="animated fadeOutDown">
              <div v-for="tag in tags" :key="tag.id" class="ui-tag__wrapper">
                <div @click="addTagUsed(tag)" :class="{used: tag.use}" class="ui-tag">
                  <span class="tag-title">{{ tag.title }}</span>
                  <span @click="deleteTag(tag.id)" class="button-close"></span>
                </div>
              </div>
            </transition-group>
          </div>
          <div class="button-list">
            <div type="submit" @click="onSubmit" :disabled="submitStatus === 'PENDING'" class="button button--round">Wyślij</div>
          </div>
        </form>
      </div>
    </section>
  </div>
</template>

<script>
import { required } from 'vuelidate/lib/validators'
export default {
  data () {
    return {
      submitStatus: null,
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',

      // Dla czasu całkowitego
      // Film
      filmHours: 1,
      filmMinutes: 30,
      // Serial
      serialSeason: 1,
      serialSeries: 10,
      serialSeriesMinutes: 50,

      // Metki
      tagTitle: '',
      tagMenuShow: false,
      tagsUsed: []
    }
  },

  validations: {
    taskTitle: {
      required
    }
  },

  methods: {
    newTag () { // Dodanie nowej metki
      if (this.tagTitle === '') {
        return
      }
      const tag = {
        title: this.tagTitle,
        use: false
      }
      this.$store.dispatch('newTag', tag)
      // Resetujemy input w metce
      this.tagTitle = ''
    },
    deleteTag (id) { // Usuwamy metke
      this.$store.dispatch('deleteTag', id)
        .then(() => {
          this.$store.dispatch('loadTags')
        })
    },

    onSubmit () {
      this.$v.$touch()

      if (this.$v.$invalid) {
        console.log('ERROR')
        this.submitStatus = 'ERROR'
      } else {
        // Validacja
        console.log('SEND')
        this.submitStatus = 'PENDING'

        // Czas
        let time
        if (this.whatWatch === 'Film') {
          time = this.filmTime
        } else {
          time = this.serialTime
        }

        // Task
        const task = {
          title: this.taskTitle,
          description: this.taskDescription,
          whatWatch: this.whatWatch,
          time,
          tags: this.tagsUsed,
          completed: false,
          editing: false
        }
        this.$store.dispatch('newTask', task)

        // Resetowanie
        this.taskTitle = ''
        this.taskDescription = ''
        // Resetowanie $v (validate)
        this.$v.$reset()

        // Resetowanie dla metek
        this.tagMenuShow = false
        this.tagsUsed = []
        this.tagTitle = ''
        for (let i = 0; i < this.tags.length; i++) {
          this.tags[i].use = false
        }
      }
    },

    addTagUsed (tag) { // Metoda do wyslania metek
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push({
          title: tag.title
        })
      } else { // Usuniecie metek
        this.tagsUsed.splice(tag.title, 1)
      }
    },

    getHoursAndMinutes (minutes) { // Zaokraglamy minuty w godziny
      const hours = Math.trunc(minutes / 60)
      const min = minutes % 60
      return `Godzin: ${hours} Minut: ${min}`
    }
  },

  computed: {
    tags () {
      return this.$store.getters.tags
    },
    filmTime () { // Liczymy ilosc czasu dla kazdej kategorii
      const min = (this.filmHours * 60) + (this.filmMinutes * 1)
      return this.getHoursAndMinutes(min)
    },
    serialTime () {
      const min = this.serialSeason * this.serialSeries * this.serialSeriesMinutes
      return this.getHoursAndMinutes(min)
    }
  }
}
</script>

<style lang="stylus" scoped>
.ui-title-1
  color #fffffe

// Ustawienia wyboru
.option-list
  display flex
  align-items center
  margin-bottom 20px
  .what-watch--radio
    margin-right 12px
  .ui-checkbox
    &:after
      top 0
      background: #d4d8f0
      border 2px solid #121629
  input
    margin-bottom 0px
  label
    margin-right 20px
    margin-bottom 0px
    &:last-child
      margin-right 0px

// Czas całkowity
.total-time
  margin-bottom 20px
.time-title
  display block
  margin-bottom 6px
.time-input
  max-width 80px
  margin-right 10px
  p
    margin-bottom 6px
  span
    margin-right 16px
  .task-input
    max-width 80px
    margin-bottom 28px
    margin-right 10px

.ui-text-regular
    color #fffffe
    margin-bottom 10px

// Metki
.tag-list
  margin-bottom 20px
  .button-default
    font-weight bold
    border-radius 0.9em
    background-color #eebbc3
    color #232946
    border 3px solid #121629

.ui-tag__wrapper
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 0px

.ui-tag
  border 3px solid #121629
  font-weight bold
  color #232946
  background-color #eebbc3
  cursor pointer
  .button-close
    &.active
      transform rotate(45deg)
  &.used
    background-color #121629
    color #fff
    border 2px solid #fffffe
    transition .5s
    .button-close
      &:before,
      &:after
        background-color #fffffe

.tag-list--menu
  display flex
  justify-content space-between
  align-items center
.tag-add--input
  margin-bottom 0px
  margin-right 10px
  height 42px
.button-list
  display flex
  justify-content flex-end
  .button
    font-weight bold
    background-color #eebbc3
    color #232946
    border 3px solid #121629

input
    background-color #232946
    border 2px solid #121629
    color #fffffe
    &::placeholder
      color #eebbc3
      font-family Montserrat

// Style dla validacji form
.form-item
  .error
    display none
    margin-bottom 8px
    font-size 13.4px
    color #fc5c65
  &.errorInput
    .error
      display block
  input
    &.error
      border-color #fc5c65
      animation shake .3s
textarea
    background-color #232946
    border 2px solid #121629
    color #fffffe
    &::placeholder
      color #eebbc3
      font-family Montserrat
</style>
