<script setup lang="ts">
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import type { TaskFilter } from '../types'

const router = useRouter()
const route = useRoute()

const selectedFilter = ref<TaskFilter>((route.query.filter as TaskFilter) || 'not_set')

watch(selectedFilter, (newFilter) => {
  router.replace({
    query: {
      ...route.query,
      filter: newFilter !== 'not_set' ? newFilter : undefined,
    },
  })
})
</script>

<template>
  <div class="filter-wrapper">
    <span>Сортировать по:</span>
    <div class="select-wrapper">
      <select v-model="selectedFilter">
        <option value="not_set">Все</option>
        <option value="undone">В работе</option>
        <option value="done">Выполнено</option>
        <option value="date">Дата</option>
      </select>
    </div>
  </div>
</template>

<style scoped>
.filter-wrapper {
  padding: 1rem 0;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-family: 'VelaSans', sans-serif;
}

/* Wrapper with background icon */
.select-wrapper {
  position: relative;
  display: inline-block;
}

select {
  appearance: none; /* Remove default arrow */
  -webkit-appearance: none;
  -moz-appearance: none;

  background: transparent;
  background-image: url('@/assets/icons/sort.svg');
  background-repeat: no-repeat;
  background-position: right 0.75rem center;

  padding: 0.5rem 2rem 0.5rem 0.75rem;
  font-size: 0.875rem;
  font-family: 'VelaSans', sans-serif;

  border: none;
  outline: none;
  background-color: transparent;
  color: inherit;

  cursor: pointer;
}

/* Remove default option styles */
option {
  background-color: white; /* Or match your app theme */
  color: black;
  border: none;
}

/* Optional: Remove focus border in some browsers */
select:focus {
  outline: none;
  box-shadow: none;
}
</style>
