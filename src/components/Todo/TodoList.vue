<template>
  <ul class="todo-list">
    <li
      v-for="task in tasks"
      :key="task.id"
      class="todo-list__item"
      :class="{ 'todo-list__item--overdue': isOverdue(task) }"
    >
      <div class="todo-list__inner-item">
        <Input
          class="todo-list__checkbox"
          input-type="checkbox"
          v-model="task.completed"
          :true-value="true"
          :false-value="false"
        />
        <div class="todo-list__content">
          <h3
            class="todo-list__title"
            :class="{ 'todo-list__title--line-through': task.completed }"
          >
            {{ task.title }}
          </h3>
          <span class="todo-list__date">{{ task.dueDate }}</span>
        </div>
      </div>
      <div class="todo-list__actions">
        <Button
          class="todo-list__button todo-list__button--delete"
          primary
          @click="() => deleteTask(task)"
          text="Удалить"
        />
        <Button
          class="todo-list__button todo-list__button--edit"
          primary
          @click="() => editTask(task)"
          text="Редактировать"
        />
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Task } from "@/types/Task";
import Button from "@/components/UI/Button.vue";
import Input from "@/components/UI/Input.vue";

interface Props {
  tasks: Task[];
}

defineProps<Props>();

const emit = defineEmits<{
  (e: "edit", id: number): void;
  (e: "delete", id: number): void;
}>();

const editTask = (task: Task) => {
  if (task.id) {
    emit("edit", task.id);
  }
};

const deleteTask = (task: Task) => {
  if (task.id) {
    emit("delete", task.id);
  }
};

// если текущая дата больше даты в таске И таска не выполнена то true, иначе false
const isOverdue = (task: Task) => {
  return !task.completed && new Date(task.dueDate) < new Date();
};
</script>

<style lang="scss" scoped>
@import "@/styles/_variables.scss";

.todo-list {
  display: flex;
  gap: 5px;
  flex-direction: column;
  padding-top: 20px;

  &__item {
    list-style-type: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f1f1f1;
    padding: 8px;
    border-radius: 4px;

    &--overdue {
      background-color: $danger-color;
    }
  }

  &__inner-item {
    display: flex;
    align-items: center;
  }

  &__checkbox {
    width: 11px;
    height: 11px;
    cursor: pointer;
    margin-right: 10px;
  }

  &__content {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  &__title {
    font-weight: 500;
    font-size: 20px;
    color: $primary-color;

    &--line-through {
      text-decoration: line-through;
    }
  }

  &__date {
    font-size: 12px;
    font-weight: 500;
    color: $primary-color;
  }

  &__button {
    font-family: "Manrope", sans-serif;
    font-weight: 600;

    &--delete {
      margin-right: 10px;
    }
  }
}
</style>
