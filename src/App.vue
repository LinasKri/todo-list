<script setup>
import { onMounted } from "vue";
import { useDataStore } from "./store/useDataStore";

import TaskFilters from "./components/TaskFilters.vue";
import TaskList from "./components/TaskList.vue";

const store = useDataStore();

onMounted(() => {
  store.loadData();
  console.log('Columns:', store.columns);
  console.log('Authors:', store.authors);
  console.log('Tasks:', store.tasks);
});
</script>

<template>
    <div class="min-h-screen bg-gray-100 p-4">
      <TaskFilters />
      <TaskList />
  </div>

</template>
