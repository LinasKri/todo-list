import { defineStore } from 'pinia'
import axios from 'axios'

export const useDataStore = defineStore('dataStore', {
  state: () => ({
    columns: [],
    authors: [],
    tasks: [],
  }),
  
  actions: {
    async loadData() {
      try {
        const response = await axios.get('/api/frontend-task-data.json');
        this.columns = response.data.columns || [];
        this.authors = response.data.authors || [];
        this.tasks = response.data.tasks || [];
      } catch (error) {
        console.error('Error:', error);
      }
    }
  },
})