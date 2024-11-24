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
  <div v-if="columns.length > 0 && store.tasks.length > 0">
    <div v-for="column in columns" :key="column">
      <h2>{{ column }}</h2>
      <div>
        <TaskItem
          v-for="task in filteredTasks(column)"
          :key="task.id"
          :task="task"
        />
      </div>
    </div>
  </div>
  <p v-else>Loading...</p>
</template>
