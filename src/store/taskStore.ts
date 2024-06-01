import api from "@/services/api";
import { Task } from "@/types/Task";
import { defineStore } from "pinia";

export const useTaskStore = defineStore("taskStore", {
  state: () => ({
    tasks: [] as Task[],
  }),
  getters: {
    tasksByLowerDate: (state) =>
      state.tasks.slice().sort((a, b) => {
        return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
      }),
  },
  actions: {
    async fetchTasks() {
      try {
        const response = await api.get<Task[]>("api/tasks");
        this.tasks = response.data;
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
      }
    },
    async fetchTask(id: number) {
      try {
        const response = await api.get<Task>(`api/tasks/${id}`);
        return response.data;
      } catch (error) {
        console.error("Failed to fetch a task", error);
      }
    },
    async fetchTasksByTitle(title: string) {
      try {
        const response = await api.get<Task[]>(`api/tasks`, {
          params: { title },
        });
        this.tasks = response.data;
      } catch (error) {
        console.error("Failed to fetch tasks by title:", error);
      }
    },
    async addTask(task: Task) {
      try {
        const response = await api.post<Task>("api/tasks", task);
        this.tasks.push(response.data);
      } catch (error) {
        console.error("Failed to add task:", error);
      }
    },
    async updateTask(task: Task) {
      try {
        const response = await api.put<Task>(`api/tasks/${task.id}`, task);
        const index = this.tasks.findIndex((t) => t.id === task.id);
        if (index !== -1) {
          this.tasks[index] = response.data;
        }
      } catch (error) {
        console.error("Failed to update task:", error);
      }
    },
    async deleteTask(id: number) {
      try {
        await api.delete(`api/tasks/${id}`);
        this.tasks = this.tasks.filter((task) => task.id !== id);
      } catch (error) {
        console.error("Failed to delete task:", error);
      }
    },
  },
});
