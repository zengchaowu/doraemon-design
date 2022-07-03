<template>
  <div class="absolute inset-0 flex">
    <div ref="left">
      <slot name="left" />
    </div>
    <div id="seperator" ref="seperator" />
    <div ref="right">
      <slot name="right" />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      left: undefined,
      seperator: undefined,
      startX: undefined,
      startY: undefined,
      startWidth: undefined,
      startHeight: undefined,
    };
  },
  mounted() {
    this.left = this.$refs.left;
    this.seperator = this.$refs.seperator;
    this.seperator?.addEventListener("mousedown", this.initDrag, false);
  },
  unmounted() {
    this.seperator?.removeEventListener("mousedown", this.initDrag);
  },
  methods: {
    initDrag(e) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      this.startWidth = parseInt(
        document.defaultView.getComputedStyle(this.left).width
      );
      this.startHeight = parseInt(
        document.defaultView.getComputedStyle(this.left).height
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
      this.left.style.width = this.startWidth + e.clientX - this.startX + "px";
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
