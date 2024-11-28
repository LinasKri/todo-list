import { defineStore } from "pinia";
import axios from "axios";

export const useDataStore = defineStore("dataStore", {
  state: () => ({
    columns: [],
    authors: [],
    tasks: {},
    filteredTasks: {},
  }),

  actions: {
    async loadData() {
      try {
        const response = await axios.get("/api/frontend-task-data.json");
        const { columns = [], authors = [], tasks = [] } = response.data;

        this.columns = columns;
        this.authors = authors;

        this.tasks = columns.reduce((accumulator, column) => {
          return {
            ...accumulator,
            [column]: tasks
              .filter((task) => task.current_column === column)
              .map((task) => ({
                ...task,
                author_name: this.getAuthorName(task.author_id),
              })),
          };
        }, {});

        this.filteredTasks = { ...this.tasks };
      } catch (error) {
        console.error("Error loding data:", error);
      }
    },

    getAuthorName(authorId) {
      return (
        this.authors.find((a) => a.id === authorId)?.display_name ||
        "Unknown Author"
      );
    },

    filterTasks(authorId, title) {
      this.filteredTasks = Object.keys(this.tasks).reduce(
        (accumulator, column) => {
          const filtered = this.tasks[column].filter((task) => {
            const matchesAuthor = authorId ? task.author_id === authorId : true;
            const matchesTitle = task.title
              .toLowerCase()
              .includes(title.toLowerCase());
            return matchesAuthor && matchesTitle;
          });
          return { ...accumulator, [column]: filtered };
        },
        {}
      );
    },
  },
});
