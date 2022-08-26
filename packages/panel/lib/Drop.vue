<template>
  <div
    @drop.prevent="onDrop"
    @dragenter.prevent="onDragenter"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    class="relative"
  >
    <slot />
    <div
      v-if="dragover"
      class="absolute inset-0 p-4 bg-white opacity-80 pointer-events-none"
    >
      <div
        class="rounded-xl w-full h-full border-2px border-dashed border-light3 flex justify-center items-center"
      >
        <span>{{ payload?.title }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      counter: 0,
      dragover: false,
    };
  },
  methods: {
    onDragenter() {
      this.counter++;
      this.dragover = true;
    },
    onDragover() {},
    onDragleave() {
      this.counter--;
      if (this.counter <= 0) {
        this.dragover = false;
      }
    },
    onDrop(e) {
      this.counter = 0;
      this.dragover = false;
      this.$emit("drop", e);
    },
  },
};
</script>
