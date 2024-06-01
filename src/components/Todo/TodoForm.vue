<template>
  <form class="task-form" @submit.prevent="onSubmit">
    <label class="task-form__label" htmlFor="title"> Название </label>
    <Input
      class="task-form__input"
      id="title"
      v-model.trim="task.title"
      required
      placeholder="Задача №1"
    />
    <label class="task-form__label" htmlFor="description"> Описание </label>
    <Input
      class="task-form__input"
      id="description"
      v-model.trim="task.description"
      required
      placeholder="Техническое описание"
    />
    <label class="task-form__label" htmlFor="dueDate"> Срок выполнения </label>
    <Input
      class="task-form__input"
      id="dueDate"
      input-type="date"
      v-model.trim="task.dueDate"
      required
    />
    <div class="task-form__action">
      <Button
        class="task-form__button"
        primary
        type="submit"
        text="Сохранить"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import type { Ref } from "vue";
import { Task } from "@/types/Task";
import Button from "../UI/Button.vue";
import Input from "../UI/Input.vue";

interface Props {
  task?: Task | null;
}

const props = withDefaults(defineProps<Props>(), {
  task: null,
});

const emit = defineEmits<{
  (e: "save", task: Task): void;
}>();

const task: Ref<Task> = ref({
  title: "",
  description: "",
  dueDate: "",
  completed: false,
});

const onSubmit = () => {
  const { title, description, dueDate } = task.value;

  if (title && description && dueDate) {
    emit("save", task.value);
  } else {
    alert("Заполните все поля");
  }
};

//если в пропс task есть, то записываем в ref task
watch(
  () => props.task,
  (newTask) => {
    if (newTask) {
      task.value = { ...newTask };
    }
  },
  { immediate: true }
);
</script>

<style lang="scss" scoped>
.task-form {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 10px 20px;

  &__label {
    font-size: 10px;
    font-weight: 500;
    color: #1b1b1b;
    padding-bottom: 3px;
  }

  &__input {
    padding: 6px;
    border-radius: 4px;
    border: 1px solid #9b9b9b;
    margin-bottom: 10px;

    &:last-of-type {
      margin-bottom: 40px;
    }
  }

  &__action {
    text-align: center;
  }

  &__button {
    font-family: "Manrope", sans-serif;
    font-weight: 600;
    width: 110px;
  }
}
</style>
