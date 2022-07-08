<template>
  <div
    id="container"
    class="flex flex-col"
    :style="{
      gap: '1px',
    }"
  >
    <div
      v-if="payload.icon || payload.title"
      id="link"
      class="flex justify-between items-center"
      :style="{
        padding: '8px 16px',
        cursor: payload.path ? 'pointer' : 'default',
        pointerEvents: payload.path || payload.children ? 'default' : 'none',
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
          v-if="indent < 2"
          :src="'/icons' + payload.path + '.svg'"
          :style="{
            width: '18px',
            height: '18px',
          }"
        />
        <span v-if="payload.title" id="title" class="min-w-0 truncate">
          {{ payload.title }}
        </span>
      </div>
      <div
        v-if="payload.children"
        id="arrow"
        class="flex items-center"
        :style="{
          padding: '4px',
          transform: payload.isOpen ? 'rotate(90deg)' : undefined,
        }"
      >
        <img
          src="/icons/arrow.svg"
          :style="{
            width: '18px',
            height: '18px',
          }"
        />
      </div>
    </div>
    <template v-if="payload.children && payload.isOpen">
      <DoraemonTree
        v-for="(child, index) in payload.children"
        :key="index"
        :payload="child"
        :indent="indent + 1"
        @select="(node) => $emit('select', node)"
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
  methods: {
    click() {
      if (this.payload.children) {
        this.payload.isOpen = !this.payload.isOpen;
      } else {
        this.$emit("select", this.payload);
      }
    },
  },
};
</script>
