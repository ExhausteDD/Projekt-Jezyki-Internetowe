<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <h1 class="ui-title-1">Home</h1>
        <input v-model="taskTitle" @keyup.enter="newTask" type="text" placeholder="Co będziesz oglądać">
        <textarea v-model="taskDescription" @keyup.enter="newTask" type="text"></textarea>
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
          </div>
          <div v-if="whatWatch === 'Serial'" class="total-time__serial">
            <span class="time-title">Ile sezonów?</span>
            <input v-model="serialSeason" type="number" class="time-input">
            <span class="time-title">Ile odcinków?</span>
            <input v-model="serialSeries" type="number" class="time-input">
            <span class="time-title">Ile trwa jeden odcinek? (w minutach)</span>
            <input v-model="serialSeriesMinutes" type="number" class="time-input">
          </div>
        </div>
        <div class="tag-list">
          <div class="ui-tag__wrapper">
            <div class="ui-tag">
              <span class="tag-title">Serial</span>
              <span class="button-close"></span>
            </div>
          </div>
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
      serialSeriesMinutes: 50
    }
  },
  // Metoda do wpisywania danych w input
  methods: {
    newTask () {
      // Zabezpieczenie od zapisywania pustych form
      if (this.taskTitle === '') {
        return
      }
      const task = {
        id: this.taskId,
        title: this.taskTitle,
        description: this.taskDescription,
        whatWatch: this.whatWatch,
        completed: false,
        editing: false
      }
      console.log(task)

      // Resetujemy ID oraz nazwe z opisem w inpucie
      this.taskId += 1
      this.taskTitle = ''
      this.taskDescription = ''
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
</style>
