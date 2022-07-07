<template>
  <div class="flex flex-col">
    <button>
      <img class="w-5 h-5" :src="payload.icon" />
      <span v-if="payload.name" class="min-w-0 truncate">
        {{ payload.name }}
      </span>
    </button>
    <template v-if="payload.children" class="flex flex-col">
      <DoraemonTree
        v-for="(child, index) in payload.children"
        :key="index"
        :payload="child"
        :indent="indent + 1"
      />
    </template>
  </div>
</template>

<script>
export default {
  name: "DoraemonTree",
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
    indent: {
      type: Number,
      default: 0,
    },
  },
};
</script>
