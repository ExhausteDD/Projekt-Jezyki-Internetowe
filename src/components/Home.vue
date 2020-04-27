<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <h1 class="ui-title-1">Home</h1>
        <input v-model="taskTitle" @keyup.enter="newTask" type="text" placeholder="Co będziesz oglądać">
        <textarea v-model="taskDescription" @keyup.enter="newTask" type="text" ></textarea>
        <div class="option-list">
          <input v-model='whatWatch' type="radio" id="radioFilm" value="Film" class="what-watch--radio ui-checkbox">
          <label for="radioFilm">Film</label>
          <input v-model='whatWatch' type="radio" id="radioSerial" value="Serial" class="what-watch--radio ui-checkbox">
          <label for="radioSerial">Serial</label>
        </div>
        <div class="total-time">
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
              <span class="tag-title">Dodaj nowy</span>
              <span :class="{ active: !tagMenuShow }" class="button-close"></span>
            </div>
          </div>
        </div>
        <div v-if="tagMenuShow" class="tag-list tag-list--menu">
          <input v-model="tagTitle" @keyup.enter="newTag" type="text" placeholder="Nowy tag" class="tag-add--input">
          <div @click="newTag" class="button button-default">Wyślij</div>
        </div>
        <div class="tag-list">
          <div v-for="tag in tags" :key="tag.title" class="ui-tag__wrapper">
            <div @click="addTagUsed(tag)" :class="{active: tag.use}" class="ui-tag">
              <span class="tag-title">{{ tag.title }}</span>
              <span class="button-close"></span>
            </div>
          </div>
        </div>
        <p>{{ tagsUsed }}</p>
        <div class="button-list">
          <div @click="newTask" class="button button--round button-primary">Wyślij</div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data () {
    return {
      taskTitle: '',
      taskDescription: '',
      whatWatch: 'Film',
      taskId: 3,

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
      tagsUsed: [],
      tags: [
        {
          title: 'Komedia',
          use: false
        },
        {
          title: 'Horror',
          use: false
        },
        {
          title: 'Dramat',
          use: false
        },
        {
          title: 'Fantastyka',
          use: false
        },
        {
          title: 'Western',
          use: false
        }
      ]
    }
  },

  methods: {
    newTag () {
      if (this.tagTitle === '') {
        return
      }
      this.tags.push({
        title: this.tagTitle,
        used: false
      })
      // const tag = {
      //   title: this.tagTitle
      // }
    },
    newTask () { // Metoda do wpisywania danych w input
      // Zabezpieczenie od zapisywania pustych form
      if (this.taskTitle === '') {
        return
      }
      let time // Wyswietlamy czas
      if (this.whatWatch === 'Film') {
        time = this.filmTime
      } else {
        time = this.serialTime
      }
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        time,
        tagsUsed: this.tagsUsed,
        completed: false,
        editing: false
      }
      console.log(task)

      // Resetujemy ID oraz nazwe z opisem w inpucie, wprowadzone dane w metki
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
      this.tagsUsed = []
    },

    addTagUsed (tag) { // Metoda do dodawania metek
      tag.use = !tag.use
      if (tag.use) {
        this.tagsUsed.push(
          tag.title
        )
      } else { // Usuniecie metek
        this.tagsUsed.splice(tag.title, 1)
      }
    },

    getHoursAndMinutes (minutes) { // Zaokraglamy minuty w godziny
      const hours = Math.trunc(minutes / 60)
      const min = minutes % 60
      return hours + ' Hours ' + min + ' Minutes '
    }
  },

  computed: { // Liczymy ilosc czasu dla kazdej kategorii
    filmTime () {
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
// Ustawienia wyboru
.option-list
  display flex
  align-items center
  margin-bottom 20px
  .what-watch--radio
    margin-right 12px
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

// Metki
.tag-list
  margin-bottom 20px

.ui-tag__wrapper
  margin-right 18px
  margin-bottom 10px
  &:last-child
    margin-right 0px

.ui-tag
  .button-close
    &.active
      transform rotate(45deg)
  &.used
    background-color #444ce0
    color #fff
    .button-close
      &:before,
      &:after
        background-color #fff

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
</style>
