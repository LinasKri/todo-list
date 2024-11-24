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
  <div>
    <h3>{{ task.title }}</h3>
    <p>Author: {{ task.author_name }}</p>
  </div>
</template>
