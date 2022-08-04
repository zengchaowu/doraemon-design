<template>
  <a-dropdown v-if="payload?.subType === 'dropdown'">
    <button type="button" class="flex items-center gap-1">
      <div
        v-if="payload?.html"
        class="w-5 h-5 fill-current"
        v-html="payload.html"
      />
      <img v-if="payload?.src" class="w-5 h-5" :src="payload.src" />
      <span v-if="payload?.label">{{ payload.label }}</span>
    </button>
    <component v-if="payload?.overlay" :is="payload.overlay" slot="overlay" />
  </a-dropdown>
  <button
    v-else
    type="button"
    class="flex items-center gap-1"
    @click="payload?.onClick?.call()"
  >
    <div
      v-if="payload?.html"
      class="w-5 h-5 fill-current"
      v-html="payload.html"
    />
    <img v-if="payload?.src" class="w-5 h-5" :src="payload.src" />
    <span v-if="payload?.label">{{ payload.label }}</span>
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
