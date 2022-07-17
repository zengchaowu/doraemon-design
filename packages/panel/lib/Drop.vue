<template>
  <div
    @drop.prevent="onDrop"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    style="position: relative"
    class="group"
  >
    <div class="group-hover:pointer-events-none">
      <slot />
    </div>

    <div
      v-if="dragover"
      style="
        position: absolute;
        inset: 0;
        background-color: black;
        opacity: 0.5;
        pointer-events: none;
      "
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

<style scoped></style>
