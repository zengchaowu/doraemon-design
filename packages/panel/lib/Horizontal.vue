<template>
  <div ref="container" class="absolute inset-0 flex">
    <slot name="left" />
    <div class="wrapper" ref="wrapper">
      <div class="seperator" ref="seperator">
        <div class="line" ref="line"></div>
      </div>
    </div>
    <slot name="right" />
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
      startX: undefined,
      startY: undefined,
      startWidth: undefined,
      startHeight: undefined,
    };
  },
  mounted() {
    this.$refs.wrapper?.addEventListener("mousedown", this.initDrag, false);
  },
  unmounted() {
    this.$refs.wrapper?.removeEventListener("mousedown", this.initDrag);
  },
  methods: {
    initDrag(e) {
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
      this.$refs.line.style.backgroundColor = "#3470ff";
      this.$refs.container.style.cursor = "col-resize";
    },
    doDrag(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const left = this.$slots.left[0].elm;
      let width = this.startWidth + e.clientX - this.startX;
      if (this.payload?.minWidth) {
        width = Math.max(this.payload.minWidth, width);
      }
      left.style.width = width + "px";
    },
    stopDrag() {
      document.documentElement.removeEventListener("mousemove", this.doDrag);
      document.documentElement.removeEventListener("mouseup", this.stopDrag);
      this.$refs.line.style.backgroundColor = "transparent";
      this.$refs.container.style.cursor = "default";
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  cursor: col-resize;
  width: 0px;
  height: 100%;
  display: flex;
  justify-content: center;
}
.seperator {
  position: absolute;
  top: 0px;
  bottom: 0px;
  width: 10px;
  z-index: 100;
  display: flex;
  justify-content: center;
}
.line {
  width: 1px;
  height: 100%;
}
</style>
