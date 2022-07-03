<template>
  <div ref="container" class="absolute inset-0 flex flex-col">
    <slot name="top" />
    <div class="wrapper" ref="wrapper">
      <div class="seperator" ref="seperator"></div>
    </div>
    <slot name="bottom" />
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
    this.$refs.wrapper?.addEventListener("mousedown", this.initDrag, false);
  },
  unmounted() {
    this.$refs.wrapper?.removeEventListener("mousedown", this.initDrag);
  },
  methods: {
    initDrag(e) {
      this.startX = e.clientX;
      this.startY = e.clientY;
      const top = this.$slots.top[0].elm;
      this.startWidth = parseInt(
        document.defaultView.getComputedStyle(top).width
      );
      this.startHeight = parseInt(
        document.defaultView.getComputedStyle(top).height
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
      this.$refs.seperator.style.backgroundColor = "#3470ff";
    },
    doDrag(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const top = this.$slots.top[0].elm;
      top.style.height = this.startHeight + e.clientY - this.startY + "px";
    },
    stopDrag() {
      document.documentElement.removeEventListener("mousemove", this.doDrag);
      document.documentElement.removeEventListener("mouseup", this.stopDrag);
      this.$refs.seperator.style.backgroundColor = "transparent";
    },
  },
};
</script>

<style scoped>
.wrapper {
  position: relative;
  top: -1px;
  cursor: row-resize;
  width: 100%;
  height: 4px;
  display: flex;
  align-items: center;
}
.seperator {
  width: 100%;
  height: 2px;
}
</style>
