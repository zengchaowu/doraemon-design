<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
  >
    <div class="pointer-events-none">
      <slot />
    </div>
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
