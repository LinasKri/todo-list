<script setup>
defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div
    class="task-item border border-gray-300 p-4 rounded shadow-sm cursor-pointer select-none bg-white"
  >
    <h3 class="font-semibold">{{ task.title }}</h3>
    <p class="text-sm text-gray-600">Author: {{ task.author_name }}</p>
  </div>
</template>

<style>
.task-item:hover {
  background-color: #f3f4f6;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
}
</style>
