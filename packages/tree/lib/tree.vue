<template>
  <div
    id="container"
    class="flex flex-col"
    :style="{
      gap: '1px',
    }"
  >
    <button
      type="button"
      v-if="payload?.icon || payload?.title"
      id="link"
      class="flex justify-between items-center"
      :class="perference?.classForNode(payload)"
      :style="{
        padding: '8px 8px',
      }"
      @click="click"
    >
      <div
        class="flex-grow flex items-center"
        :style="{
          paddingLeft: (indent - 1) * 26 + 'px',
          gap: '8px',
        }"
      >
        <img
          v-if="payload?.icon"
          :src="perference?.srcForNode(payload)"
          :style="{
            width: '18px',
            height: '18px',
          }"
        />
        <span v-if="payload?.title" id="title" class="min-w-0 truncate">
          {{ payload?.title }}
        </span>
        <span
          v-if="payload?.unreadCount > 0"
          class="flex-none w-2 h-2 rounded-full"
          style="background-color: red"
        />
      </div>
      <div
        v-if="payload?.children"
        id="arrow"
        class="flex items-center"
        :style="{
          padding: '4px',
          transform: payload.isOpen ? 'rotate(90deg)' : undefined,
        }"
      >
        <img
          :src="perference?.arrowForNode(payload)"
          :style="{
            width: '18px',
            height: '18px',
          }"
        />
      </div>
    </button>
    <template v-if="payload?.children && payload.isOpen">
      <DoraemonTree
        v-for="(child, index) in payload?.children"
        :key="index"
        :payload="child"
        :perference="perference"
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
    perference: {
      type: Object,
      default: undefined,
    },
    indent: {
      type: Number,
      default: 0,
    },
  },
  methods: {
    click() {
      if (this.payload?.children) {
        this.payload.isOpen = !this.payload.isOpen;
      } else {
        this.perference?.selectNode(this.payload);
      }
    },
  },
};
</script>
