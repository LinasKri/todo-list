<script setup>
import { defineProps } from "vue";

defineProps({
  task: {
    type: Object,
    required: true,
  },
});
</script>

<template>
  <div class="border border-gray-300 p-4 rounded shadow-sm">
    <h3 class="text-md font-semibold">{{ task.title }}</h3>
    <p class="text-sm text-gray-600">Author: {{ task.author_name }}</p>
  </div>
</template>
