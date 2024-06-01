<template>
  <Teleport to="body">
    <div v-if="open" class="modal">
      <div class="modal__overlay" @click="close"></div>
      <div class="modal__content">
        <DeleteIcon class="modal__button" @click="close" />
        <slot></slot>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
import DeleteIcon from "@/components/icons/DeleteIcon.vue";

interface Props {
  open: boolean;
}
defineProps<Props>();
const emit = defineEmits<{
  (e: "close"): void;
}>();

const close = () => {
  emit("close");
};
</script>

<style lang="scss" scoped>
.modal {
  &__overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
  }

  &__content {
    background-color: #fff;
    padding: 10px;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    position: fixed;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    max-height: 332px;
    height: 100%;
    max-width: 315px;
    width: 100%;
  }
  &__button {
    cursor: pointer;
  }
}
</style>
