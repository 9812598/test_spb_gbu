<script setup lang="ts">
import type { Task } from '../types'
import DoneIcon from '../assets/icons/done.svg'
import UndoneIcon from '../assets/icons/undone.svg'

const props = defineProps<{
  tasks: Task[]
}>()

const emits = defineEmits<{
  toggleDone: [id: string]
}>()

function formatDate(timestamp: number): string {
  const date = new Date(timestamp)
  return date.toLocaleDateString('ru-RU')
}
</script>

<template>
  <div class="task-table-wrapper">
    <!-- Header -->
    <div class="table-row header">
      <div class="icon-col empty"></div>

      <div class="title-col header-cell">
        <span>Описание</span>
      </div>

      <div class="status-col header-cell">
        <span>Статус</span>
      </div>

      <div class="date-col header-cell">
        <span>Дата</span>
      </div>
    </div>

    <!-- Tasks -->
    <div v-for="task in props.tasks" :key="task.id" class="table-row task-row">
      <div class="icon-col">
        <button class="icon-btn" @click="emits('toggleDone', task.id)">
          <img :src="task.completed ? DoneIcon : UndoneIcon" alt="toggle" />
        </button>
      </div>
      <div class="title-col">
        <span>{{ task.title }}</span>
      </div>
      <div class="status-col">
        <span :class="task.completed ? 'done' : 'undone'">
          {{ task.completed ? 'Выполнено' : 'В работе' }}
        </span>
      </div>
      <div class="date-col">
        <span>{{ formatDate(task.createdAt) }}</span>
      </div>
    </div>
  </div>
</template>

<style scoped>
.header-cell {
  position: relative;
  display: flex;
  align-items: center;
  padding-left: 1.25rem;
}

.header-cell::before {
  content: '';
  position: absolute;
  left: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 1px;
  height: 1.5rem;
  background-color: #c4c4c4;
}

.task-table-wrapper {
  width: 100%;

  display: flex;
  flex-direction: column;
}

.table-row {
  display: flex;
  align-items: center;
  padding: 1rem 0;
  border-bottom: 1px solid #eeebe9;
}

.header {
  background-color: transparent;
  font-weight: normal;
}

/* Row hover */
.task-row:hover {
  background-color: #f6f9ff;
  box-shadow: 0 0 4px rgba(0, 0, 0, 0.25);
}

/* Column widths and paddings */
.icon-col {
  width: 2.5rem;
  padding-left: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.icon-col.empty {
  padding-left: 2.5rem;
}

.title-col {
  flex: 1;
  padding-left: 1.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.header-title {
  position: relative;
  align-items: center;
}

/* Vertical separator after "Описание" in header */
.header-title .vertical-separator {
  position: absolute;
  right: 0rem;
  top: 50%;
  transform: translateY(-50%);
  height: 1.5rem;
  width: 1px;
  background-color: #c4c4c4;
}

.status-col {
  width: 10rem;
  padding-left: 1.25rem;
  display: flex;
  align-items: center;
}

.date-col {
  width: 8rem;
  padding-left: 1.25rem;
  display: flex;
  align-items: center;
}

/* Status colors */
.done {
  color: #134ec1;
}

.undone {
  color: #f89b11;
}

/* Button style */
.icon-btn {
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  display: flex;
  align-items: center;
}
</style>
