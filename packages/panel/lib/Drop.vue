<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    class="relative"
  >
    <slot class="pointer-events-none" />
    <div
      v-if="dragover"
      class="absolute inset-0 bg-gray-900 bg-opacity-50 pointer-events-none"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
      dragover: false,
    };
  },
  methods: {
    onDragover() {
      this.dragover = true;
    },
    onDragleave() {
      this.dragover = false;
    },
    onDrop(e) {
      this.dragover = false;
      console.log(e.dataTransfer.files);
    },
  },
};
</script>
