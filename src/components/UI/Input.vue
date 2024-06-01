<template>
  <input :type="inputType" :placeholder="placeholder" v-model="model" />
</template>

<script setup lang="ts">
interface Props {
  placeholder?: string;
  inputType?: string;
}

withDefaults(defineProps<Props>(), {
  inputType: "text",
});
const model = defineModel<string | boolean>({ required: true });
</script>

<style lang="scss" scoped></style>
