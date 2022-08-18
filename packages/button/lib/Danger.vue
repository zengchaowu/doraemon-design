<template>
  <a-button
    type="danger"
    class="flex items-center"
    @click.stop="payload.onClick?.call()"
  >
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
