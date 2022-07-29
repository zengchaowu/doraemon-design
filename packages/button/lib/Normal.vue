<template>
  <a-button class="flex items-center" @click="payload.onClick?.call()">
    <span>
      {{ payload?.label }}
    </span>
  </a-button>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
  },
};
</script>
