<template>
  <div ref="container" class="absolute inset-0 flex flex-col">
    <slot name="top" />
    <div class="wrapper" ref="wrapper">
      <div class="seperator" ref="seperator">
        <div class="line" ref="line"></div>
      </div>
    </div>
    <slot name="bottom" />
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
      const bottom = this.$slots.bottom[0].elm;
      this.startWidth = parseInt(
        document.defaultView.getComputedStyle(bottom).width
      );
      this.startHeight = parseInt(
        document.defaultView.getComputedStyle(bottom).height
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
      this.$refs.container.style.cursor = "row-resize";
    },
    doDrag(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const bottom = this.$slots.bottom[0].elm;

      let height = this.startHeight - (e.clientY - this.startY);
      if (this.payload?.minHeight) {
        height = Math.max(this.payload.minHeight, height);
      }
      bottom.style.height = height + "px";
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
  cursor: row-resize;
  width: 100%;
  height: 0px;
  display: flex;
  align-items: center;
}
.seperator {
  position: absolute;
  left: 0px;
  right: 0px;
  height: 10px;
  z-index: 100;
  display: flex;
  align-items: center;
}
.line {
  width: 100%;
  height: 1px;
}
</style>
