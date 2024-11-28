<script setup>
import { ref, watch } from "vue";
import { useDataStore } from "../store/useDataStore";

const store = useDataStore();
const selectedAuthor = ref(null);
const searchTitle = ref(""); 

watch([selectedAuthor, searchTitle], ([authorId, title]) => {
  store.filterTasks(authorId, title);
});
</script>

<template>
  <div class="bg-red-200 p-4 mb-4 rounded-lg shadow">
    <h3 class="text-3xl mb-2">Filters</h3>
    <div class="flex space-x-4">
      <div>
        <label for="author-filter" class="block text-sm font-medium">Filter by Author</label>
        <select
          id="author-filter"
          v-model="selectedAuthor"
          class="border rounded-lg p-2"
        >
          <option :value="null">All Authors</option>
          <option
            v-for="author in store.authors"
            :key="author.id"
            :value="author.id"
          >
            {{ author.display_name }}
          </option>
        </select>
      </div>

      <div class="w-full">
        <label for="search-title" class="block text-sm font-medium">Search by Title</label>
        <input
          id="search-title"
          v-model="searchTitle"
          type="text"
          placeholder="Enter task title"
          class="border rounded-lg p-2 w-full"
        />
      </div>
    </div>
  </div>
</template>
