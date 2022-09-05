<template>
  <div class="relative">
    <slot />
    <TheStateLoading
      v-if="isLoading"
      class="absolute inset-0 bg-light1 bg-opacity-5"
    />
  </div>
</template>
<script>
export default {
  props: {
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
