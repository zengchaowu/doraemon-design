<template>
  <div>
    <button
      v-for="(tab, index) in payload?.tabs"
      :key="index"
      type="button"
      class="relative"
      :class="tab.value === value ? 'text-primary' : 'text-gray-500'"
      @click="$emit('update', tab.value)"
    >
      <span class="font-semibold">{{ tab.label }}</span>
      <span
        v-if="tab?.unreadCount > 0"
        class="absolute -right-1 -top-1 flex-none w-2 h-2 rounded-full"
        style="background-color: red"
      />
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
