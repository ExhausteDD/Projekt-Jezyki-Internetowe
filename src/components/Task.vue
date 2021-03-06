<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <div class="task-list__header">
          <h1 class="ui-title-1">Library</h1>
          <div class="buttons-list ">
            <div @click="filter = 'active'" class="button button--round button-default">Aktywne</div>
            <div @click="filter = 'completed'" class="button button--round button-default">Skończone</div>
            <div @click="filter = 'all'" class="button button--round button-default">Wszystko</div>
          </div>
        </div>
        <div class="task-list">
          <transition-group name="taskList">
            <div v-for="task in tasksFilter" :key="task.id" :class="{ completed: task.completed}" class="task-item">
              <div class="ui-card">
                <div class="task-item__info">
                  <div class="task-item__main-i">
                    <span :class="[{ 'ui-label--primary': !task.completed }, { 'ui-label--light': task.completed  }]" class="ui-label ui-label--light">{{ task.whatWatch }}</span>
                    <span class="task-item__time">Czas całkowity - {{ task.time }}</span>
                  </div>
                  <span @click="deleteTask(task.id)" class="button-close"></span>
                </div>
                <div class="task-item__content">
                  <div class="task-item__header">
                    <div class="ui-checkbox-wrapper">
                      <input v-model="task.completed" @click="taskCompleted(task.id, task.completed)" class="ui-checkbox" type="checkbox">
                    </div>
                    <span class="ui-title-2">{{ task.title }}</span>
                  </div>
                  <div class="task-item__body">
                    <p class="ui-text-regular body-description">{{ task.description }}</p>
                  </div>
                  <div class="task-item__footer">
                    <div class="tag-list">
                      <div v-for="tag in task.tags" :key="tag.title" class="ui-tag__wrapper">
                        <div class="ui-tag">
                          <span class="tag-title">{{ tag.title }}</span>
                        </div>
                      </div>
                      <div class="buttons-list">
                        <div @click="taskEdit(task.id, task.title, task.description)" class="button button--round">Edytuj</div>
                        <div @click="taskCompleted(task.id, task.completed)" class="button button--round">
                          <span v-if="task.completed">Wróć</span>
                          <span v-else="">Zakończ</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </transition-group>
        </div>
      </div>
      <div v-if="editingPopup" @click="cancelTaskEdit" :class="{active: editingPopup}" class="ui-messageBox__wrapper">
        <div @click.stop="" class="ui-messageBox fadeInDown">
          <div class="ui-messageBox__header">
            <span class="messageBox-title">{{ titleEditing }}</span>
            <span @click="cancelTaskEdit" class="button-close ui-messageBox-close"></span>
          </div>
          <div class="ui-messageBox__content">
            <p>Nazwa</p>
            <input v-model="titleEditing" @keyup.esc="cancelTaskEdit" type="text">
            <p>Opis</p>
            <textarea v-model="descrEditing" @keyup.esc="cancelTaskEdit" type="text"></textarea>
          </div>
          <div class="ui-messageBox__footer">
            <div @click="cancelTaskEdit" class="button button-light ui-messageBox-cancel">Wróć</div>
            <div @click="finishTaskEdit" class="button button-primary ui-messageBox-ok">OK</div>
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
      filter: 'active',
      editingPopup: false,
      titleEditing: '',
      descrEditing: '',
      taskId: null
    }
  },
  methods: {
    taskCompleted (id, completed) { // Mozliwosc przenoszenia do skonczonych jednym kliekiem
      completed ? completed = false : completed = true
      this.$store.dispatch('completedTask', {
        id,
        completed
      })
    },
    taskEdit (id, title, description) { // Mozliwosc edytowania tresci
      this.editingPopup = !this.editingPopup
      this.taskId = id
      this.titleEditing = title
      this.descrEditing = description
    },
    cancelTaskEdit () {
      this.editingPopup = !this.editingPopup
      // Resetujemy dane
      this.taskId = null
      this.titleEditing = ''
      this.descrEditing = ''
    },
    finishTaskEdit () { // Po skonczeniu edytowania dane edytuja sie na stronie i w BD
      this.$store.dispatch('editTask', {
        id: this.taskId,
        title: this.titleEditing,
        description: this.descrEditing
      })
      this.editingPopup = !this.editingPopup
    },
    deleteTask (id) { // Usuwanie tasku i odrazu usuwanie go ze strony
      this.$store.dispatch('deleteTask', id)
        .then(() => {
          this.$store.dispatch('loadTasks')
        })
    }
  },
  computed: { // Sprawdzenie wartosci filtru
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active' // Dla wyswietlania najpierw listy aktywnych filmow i tp
    }
  }
}
</script>

<style lang="stylus" scoped>
// Lista przycisków
.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 30px
  .button
    margin-right 8px
    font-weight bold
    background-color #eebbc3
    color #232946
    border 3px solid #121629
    transition all .7s
    &:hover
      border-color #fffffe
  .ui-title-1
    margin-bottom 0
    color #fffffe

// Style dla kategorii
.task-item
  margin-bottom 20px
  .ui-tag
    font-weight bold
    color #fffffe
    border 2px solid #dcdfe6
  .ui-card
    background-color #232946
    border 3px solid #121629
    color #fffffe
    transition box-shadow .7s
    &:hover
      box-shadow 0px 4px 10px 2px rgba(white, 0.2)
    .ui-title-2
      color #fffffe
  .ui-checkbox
    &:after
      top 0
      background: #d4d8f0
      border 2px solid #121629
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-2,
    .ui-text-regular,
    .ui-tag
    .task-item__time
      text-decoration line-through
      color #909399
    margin-bottom 20px
.task-item__body
  .body-description
    margin-bottom 18px
    color #fffffe

.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .ui-label
    margin-right 8px
    background-color #eebbc3
    font-weight bold
  .button-close
    &:after,
    &:before
      height 2px
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-3
    margin-bottom 0

// Lista metek
.task-item__footer
  .ui-tag__wrapper
    margin-right 10px
    &:last-child
      margin-right 0px

.tag-list
  margin-bottom 20px

.task-item__footer
  .buttons-list
    text-align right

.buttons-list
  .button
    margin-right 12px
    font-weight: bold;
    background-color #eebbc3
    color #232946;
    border 3px solid #121629
    transition all .7s
    &:hover
      border-color #fffffe
    &:last-child
      margin-right 0px

.ui-messageBox__wrapper
  &.active
   display flex
  .button-light
   margin-right 8px
  .ui-messageBox
    color #fffffe
    background-color #232946
    font-weight bold
    .ui-messageBox__content
      input,
      textarea
        color #fffffe
        border 2px solid #121629
    .ui-messageBox__footer
      .button
        border-radius: 1.2em;
        padding: 0.48em 1.2em;
        font-weight: bold;
        background-color #eebbc3
        color #232946;
        border 3px solid #121629
        transition all .7s
        &:hover
          border-color #fffffe
</style>
