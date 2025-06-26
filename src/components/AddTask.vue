<script setup lang="ts">
import { ref, defineEmits } from 'vue'
import type { Task } from '../types'

// Modal state
const open = ref(false)

// Task input
const description = ref('')

const emit = defineEmits<{
  (e: 'task-added', task: Task): void
}>()

// Save task to localStorage
function saveTask() {
  const newTask: Task = {
    id: crypto.randomUUID(),
    title: description.value,
    completed: false,
    createdAt: Date.now(),
  }

  const tasks = JSON.parse(localStorage.getItem('tasks') || '[]')
  tasks.push(newTask)
  localStorage.setItem('tasks', JSON.stringify(tasks))

  emit('task-added', newTask)

  // Reset and close modal
  description.value = ''
  open.value = false
}
</script>

<template>
  <!-- Open Button (Plus Icon) -->
  <button @click="open = true" class="icon-button">
    <img src="@/assets/icons/plus.svg" alt="Add task" />
  </button>

  <Teleport to="body">
    <Transition name="modal">
      <div v-if="open" class="modal-mask">
        <div class="modal-container">
          <div class="title-container">
            <h2>Создать новую задачу</h2>
            <button class="close-button" @click="open = false">
              <img src="@/assets/icons/close.svg" alt="Close" />
            </button>
          </div>

          <!-- Task Form -->
          <form @submit.prevent="saveTask">
            <label for="description" class="form-label">Описание</label>
            <input
              id="description"
              v-model="description"
              type="text"
              placeholder="Введите описание"
              required
            />

            <button type="submit" class="submit-button">Создать</button>
          </form>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<style scoped>
/* Open Icon Button */
.icon-button {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
}

/* Modal Backdrop with Blur */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  backdrop-filter: blur(3px);
  background-color: rgba(255, 255, 255, 0.3); /* Optional light overlay */
  display: flex;
  justify-content: center;
  align-items: center;
}

/* Modal Container */
.modal-container {
  background-color: #fff;
  border: 1px solid #dde2e4;
  padding: 2.5rem;
  padding-bottom: 3.125rem;
  border-radius: 6px;
  width: 100%;
  max-width: 400px;
  position: relative;
  box-shadow: 0px 25px 50px -12px rgba(0, 0, 0, 0.25);
}

.title-container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.close-button {
  background: none;
  border: none;
  cursor: pointer;
}

form {
  display: flex;
  flex-direction: column;
  margin-top: 1.875rem;
}

.form-label {
  font-family: 'AvantGarde', sans-serif;
  font-size: 0.875rem;
  line-height: normal;
}

input[type='text'] {
  font-family: 'VelaSans', sans-serif;
  padding-left: 1rem;
  padding-top: 0.688rem;
  padding-bottom: 0.688rem;
  font-size: 0.875rem;
  margin-top: 0.313rem;

  border: 1px solid #dde2e4;
  border-radius: 8px;
}

.submit-button {
  background-color: #f0f5ff;
  color: #314b99;
  border-radius: 8px;
  padding: 0.75rem 2.5rem;
  margin-left: auto;
  margin-right: auto;
  font-family: 'VelaSans', sans-serif;
  font-size: 1.125rem;
  border: none;
  margin-top: 1.875rem;
  cursor: pointer;
}

.submit-button:hover {
  background-color: #93c8dd;
}
</style>
