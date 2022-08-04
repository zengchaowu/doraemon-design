<template>
  <a-dropdown v-if="payload?.subType === 'dropdown'">
    <button type="button">
      <div
        class="w-5 h-5 fill-current"
        v-html="require(`~/assets/images/icons/${payload?.image}?include`)"
      />
      <component v-if="payload?.overlay" :is="payload.overlay" />
    </button>
  </a-dropdown>
  <button type="button" @click="payload?.onClick?.call()">
    <div
      class="w-5 h-5 fill-current"
      v-html="require(`~/assets/images/icons/${payload?.image}?include`)"
    />
  </button>
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
