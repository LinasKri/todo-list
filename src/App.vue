<script setup>
import { onMounted } from "vue";
import { useDataStore } from "./store/useDataStore";

import TaskFilters from "./components/TaskFilters.vue";
import TaskList from "./components/TaskList.vue";
import NewTaskForm from "./components/NewTaskForm.vue";

const store = useDataStore();

onMounted(async () => {
  await store.loadData();
});
</script>

<template>
  <div class="min-h-screen bg-green-200 p-4">
    <NewTaskForm />
    <TaskFilters />
    <TaskList />
  </div>
</template>
 