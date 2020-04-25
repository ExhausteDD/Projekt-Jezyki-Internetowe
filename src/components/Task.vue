<template>
  <div class="content-wrapper">
    <section>
      <div class="container">
        <h1 class="ui-title-1">Tasks</h1>
        <div class="task-list">
          <div v-for="task in tasks" :key="task.id" :class="{ completed: task.completed}" class="task-item">
            <div class="ui-card ui-card--shadow">
              <div class="task-item__info">
                <div class="task-item__main-i">
                  <span class="ui-label ui-label--light">{{ task.whatWatch }}</span>
                  <span>Czas całkowity:</span>
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
      tasks: [
        {
          id: 1,
          title: 'GrowthBusters: Hooked on Growth',
          description: 'I directed this documentary challenge',
          whatWatch: 'Film',
          completed: false,
          editing: false
        },
        {
          id: 2,
          title: 'Breaking Bad',
          description: 'Say my name',
          whatWatch: 'Serial',
          completed: false,
          editing: false
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
.task-item
  margin-bottom 20px
  &:last-child
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
