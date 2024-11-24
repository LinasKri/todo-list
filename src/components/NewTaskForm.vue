<script setup>
import { ref } from "vue";
import { useDataStore } from "../store/useDataStore";

const store = useDataStore();

const newTaskTitle = ref("");
const selectedAuthor = ref(null);

const successMessage = ref(false);

const addTask = () => {
  if (!newTaskTitle.value || !selectedAuthor.value) {
    alert("Fill in all the fields!");
    return;
  }

  const newTask = {
    id: store.tasks.length + 1,
    title: newTaskTitle.value,
    author_id: selectedAuthor.value,
    date_created: new Date().toISOString().split("T")[0],
    current_column: "To do",
  };

  store.tasks.push(newTask);

  newTaskTitle.value = "";
  selectedAuthor.value = null;

  successMessage.value = true;

  setTimeout(() => {
    successMessage.value = false;
  }, 3000);
};
</script>

<template>
  <div class="p-5 bg-orange-200">
    <h3>Create a new Task</h3>

    <div
      v-if="successMessage"
      class="bg-green-100 text-green-800 p-2 rounded mb-4 text-center border border-green-300"
    >
      Task Created!
    </div>

    <div class="mb-4">
      <label>Title</label>
      <input
        v-model="newTaskTitle"
        type="text"
        class="block rounded-lg p-2"
        placeholder="Enter title of the task"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm mb-1">Author:</label>
      <select
        v-model="selectedAuthor"
        class="border rounded-lg p-2"
      >
        <option value="" disabled>Choose Author</option>
        <option
          v-for="author in store.authors"
          :key="author.id"
          :value="author.id"
        >
          {{ author.display_name }}
        </option>
      </select>
    </div>
    <button
      @click="addTask"
      class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
    >
      Craete
    </button>
  </div>
</template>
