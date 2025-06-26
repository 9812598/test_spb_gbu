<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const route = useRoute()
const router = useRouter()
const search = ref(route.query.search ?? '')

watch(search, (newSearch) => {
  router.replace({ query: { ...route.query, search: newSearch || undefined } })
})
</script>

<template>
  <input
    v-model="search"
    type="text"
    placeholder="Поиск Имени, статуса или даты"
    class="search-input"
  />
</template>

<style scoped>
.search-input {
  padding-left: 2.125rem;
  padding-bottom: 0.75rem;
  padding-top: 0.75rem;
  font-size: 0.875rem;
  border: none;

  outline: none;
  width: 100%;
  max-width: 20rem;

  font-family: 'VelaSans', sans-serif;
  background-image: url('@/assets/icons/search.svg');
  background-repeat: no-repeat;
  background-position: left center;
  background-size: 1.125rem;
}

.search-input::placeholder {
  color: #c4c4c4;
}
</style>
