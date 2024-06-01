<template>
  <div class="todo">
    <div class="todo__inner">
      <Modal :open="isFormOpen" @close="resetFormAndCurrentTask">
        <TodoForm
          class="todo__form"
          :task="currentTask"
          @save="saveTask"
          @cancel="resetFormAndCurrentTask"
        />
      </Modal>
      <div class="todo__actions">
        <Input
          class="todo__input"
          type="text"
          placeholder="Поиск"
          v-model="titleQuery"
        />
        <Button
          class="todo__button"
          primary
          type="button"
          @click="showForm"
          text="Добавить задачу"
        />
      </div>
      <TaskList
        :tasks="taskStore.tasksByLowerDate"
        @edit="editTask"
        @delete="deleteTask"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from "vue";
import type { Ref } from "vue";
import { useTaskStore } from "@/store/taskStore";
import TaskList from "@/components/Todo/TodoList.vue";
import Modal from "@/components/UI/Modal.vue";
import TodoForm from "@/components/Todo/TodoForm.vue";
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";
import { Task } from "@/types/Task";

const taskStore = useTaskStore();
const isFormOpen = ref(false);
const titleQuery = ref("");
const currentTask: Ref<Task | null> = ref(null);

const resetFormAndCurrentTask = () => {
  isFormOpen.value = false;
  currentTask.value = null;
};

const saveTask = (task: Task) => {
  if (task.id) {
    taskStore.updateTask(task);
  } else {
    taskStore.addTask(task);
  }
  resetFormAndCurrentTask();
};

const showForm = () => {
  currentTask.value = null;
  isFormOpen.value = true;
};

const deleteTask = (id: number) => {
  if (confirm("Вы точо хотите удалить?")) {
    taskStore.deleteTask(id);
  }
};

const editTask = async (taskId: number) => {
  const taskToEdit = await taskStore.fetchTask(taskId);
  if (taskToEdit) {
    currentTask.value = taskToEdit;
    isFormOpen.value = true;
  }
};

//запрос на каждое изменение инпута
watch(titleQuery, async (newTitleQuery) => {
  await taskStore.fetchTasksByTitle(newTitleQuery);
});

onMounted(() => {
  taskStore.fetchTasks();
});
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.todo {
  padding: 20px 20px 0;

  &__actions {
    display: flex;
    justify-content: space-between;
  }

  &__input {
    width: 280px;
    border: 1px solid #9b9b9b;
    border-radius: 4px;
    padding: 6px;
    font-family: "Manrope", sans-serif;
    font-weight: 500;

    &::placeholder {
      color: $primary-color;
    }
  }

  &__button {
    font-family: "Manrope", sans-serif;
    font-weight: 600;
  }
}
</style>
