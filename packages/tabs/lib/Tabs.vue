<template>
  <div>
    <button
      v-for="(tab, index) in payload?.tabs"
      :key="index"
      type="button"
      :class="tab.value === value ? 'text-primary' : 'text-gray-500'"
      @click="$emit('update', tab.value)"
    >
      <span class="font-semibold">{{ tab.label }}</span>
    </button>
  </div>
</template>
<script>
export default {
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    value: {
      type: [String, Number],
      default: undefined,
    },
    payload: {
      type: Object,
      default: undefined,
    },
  },
};
</script>
