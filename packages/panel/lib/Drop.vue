<template>
  <div
    @drop.prevent="onDrop"
    @dragenter.prevent="onDragenter"
    @dragover.prevent="onDragover"
    @dragleave.prevent="onDragleave"
    style="position: relative"
  >
    <slot />
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
      counter: 0,
      dragover: false,
    };
  },
  methods: {
    onDragenter() {
      console.log("dragenter");
      this.counter++;
      this.dragover = true;
    },
    onDragover() {
      console.log("dragover");
    },
    onDragleave() {
      console.log("dragleave");
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
