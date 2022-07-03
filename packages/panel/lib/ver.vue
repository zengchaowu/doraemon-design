<template>
  <div ref="container" class="absolute inset-0 flex flex-col">
    <slot name="top" />
    <div class="seperator" ref="seperator" />
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
    this.$refs.seperator?.addEventListener("mousedown", this.initDrag, false);
  },
  unmounted() {
    this.$refs.seperator?.removeEventListener("mousedown", this.initDrag);
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
    },
    doDrag(e) {
      e.preventDefault();
      e.stopImmediatePropagation();
      const top = this.$slots.top[0].elm;
      top.style.height = this.startHeight - (e.clientY - this.startY) + "px";
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
  cursor: row-resize;
  width: 100%;
  height: 4px;
}
.seperator:hover {
  background-color: #eee;
}
</style>
