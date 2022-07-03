<template>
  <div ref="container" class="absolute inset-0 flex">
    <slot name="left" />
    <div class="seperator" ref="seperator" />
    <slot name="right" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      startX: undefined,
      startY: undefined,
      startWidth: undefined,
      startHeight: undefined,
    };
  },
  mounted() {
    this.$refs.seperator?.addEventListener("mousedown", this.initDrag, false);
  },
  unmounted() {
    this.$refs.seperator?.removeEventListener("mousedown", this.initDrag);
  },
  methods: {
    initDrag(e) {
      console.log(this);
      this.startX = e.clientX;
      this.startY = e.clientY;
      const left = this.$slots.left[0].elm;
      this.startWidth = parseInt(
        document.defaultView.getComputedStyle(left).width
      );
      this.startHeight = parseInt(
        document.defaultView.getComputedStyle(left).height
      );
      document.documentElement.addEventListener(
        "mousemove",
        this.doDrag,
        false
      );
      document.documentElement.addEventListener(
        "mouseup",
        this.stopDrag,
        false
      );
    },
    doDrag(e) {
      const left = this.$slots.left[0].elm;
      left.style.width = this.startWidth + e.clientX - this.startX + "px";
    },
    stopDrag() {
      document.documentElement.removeEventListener("mousemove", this.doDrag);
      document.documentElement.removeEventListener("mouseup", this.stopDrag);
    },
  },
};
</script>

<style scoped>
.seperator {
  cursor: col-resize;
  width: 4px;
  height: 100%;
}
.seperator:hover {
  background-color: #eee;
}
</style>
