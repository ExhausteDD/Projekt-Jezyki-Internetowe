import firebase from 'firebase/app'
import Task from './task_help'

export default {
  state: {
    tasks: []
  },
  mutations: {
    loadTasks (state, payload) {
      state.tasks = payload
    },
    newTask (state, payload) {
      state.tasks.push(payload)
    }
  },
  actions: {
    async loadTasks ({ commit }, payload) {
      commit('clearError')
      commit('setLoading', true)
      try {
        const task = await firebase.database().ref('task').once('value') // Zwracamy sie do bazy danych i poszukujemy dane
        const tasks = task.val()
        const tasksArray = []
        Object.keys(tasks).forEach(key => { // wyjmujemy z bazy potrzebne dane
          const t = tasks[key]
          tasksArray.push(
            new Task(
              t.title,
              t.description,
              t.whatWatch,
              t.time,
              t.tags,
              t.completed,
              t.editing,
              t.user,
              key
            )
          )
        })

        commit('loadTasks', tasksArray)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    },
    async newTask ({ commit, getters }, payload) { // Zwracamy sie do bazy danych w celu wyslania i zapisywania danych
      commit('clearError')
      commit('setLoading', true)
      try {
        const newTask = new Task(
          payload.title,
          payload.description,
          payload.whatWatch,
          payload.time,
          payload.tags,
          payload.completed,
          payload.editing,
          getters.user.id
        )
        const task = await firebase.database().ref('task').push(newTask) // Wysylamy dane
        commit('newTask', {
          ...newTask,
          id: task.key
        })
        commit('setLoading', false)
      } catch (error) {
        commit('setLoading', false)
        commit('setError', error.message)
        throw error
      }
    }
  },
  getters: {
    tasks (state) {
      return state.tasks
    },
    taskCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed
      })
    },
    taskNotCompleted (state) {
      return state.tasks.filter(task => {
        return task.completed === false
      })
    }
  }
}
