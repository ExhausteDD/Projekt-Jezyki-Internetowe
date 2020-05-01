<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <div class="task-list__header">
          <h1 class="ui-title-1">Movies</h1>
          <div class="buttons-list ">
            <p>{{ filter }}</p>
            <div @click="filter = 'active'" class="button button--round button-default">Aktywne</div>
            <div @click="filter = 'completed'" class="button button--round button-default">Skończone</div>
            <div @click="filter = 'all'" class="button button--round button-default">Wszystko</div>
          </div>
        </div>
        <div class="task-list">
          <div v-for="task in tasksFilter" :key="task.id" :class="{ completed: task.completed}" class="task-item">
            <div class="ui-card ui-card--shadow">
              <div class="task-item__info">
                <div class="task-item__main-i">
                  <span class="ui-label ui-label--light">{{ task.whatWatch }}</span>
                  <span class="task-item__time">Czas całkowity: {{ task.time }}</span>
                </div>
                <span class="button-close"></span>
              </div>
              <div class="task-item__content">
                <div class="task-item__header">
                  <div class="ui-checkbox-wrapper">
                    <input v-model="task.completed" class="ui-checkbox" type="checkbox">
                  </div>
                  <span class="ui-title-3">{{ task.title }}</span>
                </div>
                <div class="task-item__body">
                  <p class="ui-text-regular">{{ task.description }}</p>
                </div>
                <div class="task-item__footer">
                  <div class="tag-list">
                    <div v-for="tag in task.tags" :key="tag.title" class="ui-tag__wrapper">
                      <div class="ui-tag">
                        <span class="tag-title">{{ tag.title }}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
      filter: 'active'
    }
  },
  computed: {
    tasksFilter () {
      if (this.filter === 'active') {
        return this.$store.getters.taskNotCompleted
      } else if (this.filter === 'completed') {
        return this.$store.getters.taskCompleted
      } else if (this.filter === 'all') {
        return this.$store.getters.tasks
      }
      return this.filter === 'active'
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-list__header
  display flex
  justify-content space-between
  align-items center
  margin-bottom 30px
  .button
    margin-right 8px
  .ui-title-1
    margin-bottom 0
.task-item
  margin-bottom 20px
  .ui-checkbox:checked:before
    border-color #909399
  &.completed
    .ui-title-3,
    .ui-text-regular,
    .ui-tag
    .task-item__time
      text-decoration line-through
      color #909399
    margin-bottom 0px

.ui-label
  margin-right 8px

.task-item__info
  display flex
  align-items center
  justify-content space-between
  margin-bottom 20px
  .button-close
    width 20px
    height 20px
.task-item__header
  display flex
  align-items center
  margin-bottom 18px
  .ui-checkbox-wrapper
    margin-right 8px
  .ui-title-3
    margin-bottom 0
</style>
