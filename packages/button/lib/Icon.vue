<template>
  <a-dropdown v-if="payload?.subType === 'dropdown'">
    <button type="button">
      <div
        v-if="payload?.html"
        class="w-5 h-5 fill-current"
        v-html="payload.html"
      />
      <div
        v-if="payload?.src"
        class="w-5 h-5 fill-current"
        :src="payload.src"
      />
    </button>
    <component v-if="payload?.overlay" :is="payload.overlay" slot="overlay" />
  </a-dropdown>
  <button v-else type="button" @click="payload?.onClick?.call()">
    <div
      v-if="payload?.html"
      class="w-5 h-5 fill-current"
      v-html="payload.html"
    />
    <div v-if="payload?.src" class="w-5 h-5 fill-current" :src="payload.src" />
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
