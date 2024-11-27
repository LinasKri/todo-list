<script setup>
import { useDataStore } from "../store/useDataStore";
import TaskItem from "./TaskItem.vue";
import draggable from "vuedraggable";

const store = useDataStore();
</script>

<template>
  <div v-if="store.columns.length">
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div
        v-for="column in store.columns"
        :key="column"
        class="bg-gray-100 rounded-lg shadow p-4"
        :data-column="column"
      >
        <h2 class="text-lg font-bold text-center mb-4">{{ column }}</h2>
        <draggable
          :list="store.tasks[column]"
          group="tasks"
          itemKey="id"
          :key="store.tasks[column].length"
          class="space-y-4"
          :data-column="column"
        >
          <template #item="{ element }">
            <div :data-id="element.id">
              <TaskItem :task="element" />
            </div>
          </template>
        </draggable>
      </div>
    </div>
  </div>
  <p v-else class="text-center text-xl text-gray-500 mt-5">Loading...</p>
</template>
