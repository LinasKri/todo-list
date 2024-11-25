import { defineStore } from 'pinia';
import axios from 'axios';

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    columns: [],
    authors: [],
    tasks: {},
  }),

  actions: {
    async loadData() {
      try {
        const response = await axios.get('/api/frontend-task-data.json');
        const { columns = [], authors = [], tasks = [] } = response.data;

        this.columns = columns;
        this.authors = authors;

        this.tasks = columns.reduce(
          (accumulator, column) => ({
            ...accumulator,
            [column]: tasks
              .filter((task) => task.current_column === column)
              .map((task) => ({
                ...task,
                author_name: this.getAuthorName(task.author_id),
              })),
          }),
          {}
        );
      } catch (error) {
        console.error('Error:', error);
      }
    },

    getAuthorName(authorId) {
      return this.authors.find((a) => a.id === authorId)?.display_name || 'Unknown Author';
    },

    moveTask(taskId, fromColumn, toColumn) {
      const taskIndex = this.tasks[fromColumn]?.findIndex((task) => task.id === taskId);
      if (taskIndex === -1) return;

      const [task] = this.tasks[fromColumn].splice(taskIndex, 1);
      task.current_column = toColumn;
      this.tasks[toColumn] = this.tasks[toColumn] || [];
      this.tasks[toColumn].push(task);
    },
  },
});