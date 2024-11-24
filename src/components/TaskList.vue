<script setup> 
import { computed } from "vue";
import { useDataStore } from "../store/useDataStore";
import TaskItem from "./TaskItem.vue";

const store = useDataStore();

const columns = computed(() => store.columns);

const getAuthorName = (authorId) => {
  const author = store.authors.find((a) => a.id === authorId);
  return author ? author.display_name : "Unknown Author";
};

const filteredTasks = (column) =>
  store.tasks
    .filter((task) => task.current_column === column)
    .map((task) => ({
      ...task,
      author_name: getAuthorName(task.author_id),
    }));
</script>

<template>
  <div v-if="columns.length > 0 && store.tasks.length > 0" class="p-4 bg-gray-100">
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="column in columns"
        :key="column"
        class="bg-white rounded-lg shadow p-4"
      >
        <h2 class="text-lg font-bold text-center mb-4">{{ column }}</h2>
        <div class="space-y-4">
          <TaskItem
            v-for="task in filteredTasks(column)"
            :key="task.id"
            :task="task"
          />
        </div>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-xl text-gray-500 mt-5">Loading...</p>
</template>
