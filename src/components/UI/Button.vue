<template>
  <button :style="buttonStyle">{{ text.toUpperCase() }}</button>
</template>

<script setup lang="ts">
import { StyleValue } from "vue";

enum ButtonSizes {
  small,
  regular,
  large,
}

interface Props {
  text: string;
  primary?: boolean;
  secondary?: boolean;
  size?: ButtonSizes;
}

const props = withDefaults(defineProps<Props>(), {
  primary: false,
  secondary: false,
  size: ButtonSizes.regular,
});
const buttonStyle = getButtonStyle();

function getButtonStyle(): StyleValue {
  let style: StyleValue = {};

  const primary = { backgroundColor: "#5451FF", color: "#FFFFFF" };
  const secondary = { backgroundColor: "black", color: "white" };
  const defaultStyle = {};

  if (props.primary) {
    style = { ...primary };
  } else if (props.secondary) {
    style = { ...secondary };
  } else {
    style = { ...defaultStyle };
  }

  switch (props.size) {
    case ButtonSizes.small:
      style.fontSize = "12px";
      style.padding = "2px";
      break;
    case ButtonSizes.regular:
      style.fontSize = "16px";
      style.padding = "4px";
      break;
    case ButtonSizes.large:
      style.fontSize = "18px";
      style.padding = "6px";
      break;
  }

  return style;
}
</script>

<style scoped lang="scss">
button {
  border: none;
  border-radius: 2px;
  cursor: pointer;
}
</style>
