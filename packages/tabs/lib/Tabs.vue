<template>
  <div class="flex gap-4">
    <div
      v-for="(tab, index) in payload?.tabs"
      :key="index"
      class="font-medium cursor-pointer"
      :class="tab.value === value ? 'text-primary' : 'text-gray-500'"
      @click="$emit('update', tab.value)"
    >
      <span>{{ tab.label }}</span>
    </div>
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
