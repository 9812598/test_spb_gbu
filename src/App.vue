<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import AddTask from './components/AddTask.vue'
import Filtration from './components/Filtration.vue'
import type { Task, TaskFilter } from './types'
import SearchInput from './components/SearchInput.vue'
import TaskTable from './components/TaskTable.vue'

const tasks = ref<Task[]>([])
const route = useRoute()

// Load tasks from localStorage
onMounted(() => {
  const stored = localStorage.getItem('tasks')
  if (stored) {
    tasks.value = JSON.parse(stored)
  }
})

// Toggle task status
function toggleDone(id: string) {
  const task = tasks.value.find((task) => task.id === id)
  if (task) {
    task.completed = !task.completed
    localStorage.setItem('tasks', JSON.stringify(tasks.value))
  }
}

// Compute filtered/sorted tasks
const filteredTasks = computed(() => {
  const search = (route.query.search as string)?.toLowerCase() ?? ''
  const filter = (route.query.filter as TaskFilter) ?? 'not_set'

  let list = [...tasks.value]

  // Filter logic
  switch (filter) {
    case 'undone':
      list.sort((a, b) => Number(a.completed) - Number(b.completed))
      break
    case 'done':
      list.sort((a, b) => Number(b.completed) - Number(a.completed))
      break
    case 'date':
      list.sort((a, b) => b.createdAt - a.createdAt)
      break
    case 'not_set':
    default:
      // No sorting
      break
  }

  // Search by name only
  if (search) {
    list = list.filter((task) => task.title.toLowerCase().includes(search))
  }

  return list
})
</script>

<template>
  <main>
    <div class="header-container">
      <h1>To do list</h1>
      <AddTask />
    </div>

    <h3 v-if="!tasks.length">No Tasks</h3>
    <div class="filter-container">
      <SearchInput />
      <Filtration />
    </div>
    <!-- <TaskList :tasks="filteredTasks" @toggleDone="toggleDone" /> -->
    <TaskTable :tasks="filteredTasks" @toggleDone="toggleDone" />
  </main>
</template>

<style scoped>
main {
  width: 100%;
  max-width: 81.25rem;
  margin-left: auto;
  margin-right: auto;
  margin-top: 6.25rem;
}
.header-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2.5rem;
}
.filter-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 2.5rem;
}
</style>
