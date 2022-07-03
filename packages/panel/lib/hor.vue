<template>
  <div class="relative">
    <slot name="left" ref="left" class="flex-grow" />
    <div ref="seperator" class="w-5px" style="cursor: col-resize" />
    <slot name="right" ref="right" class="flex-grow" />
  </div>
</template>

<script>
export default {
  data() {
    return {
      container: undefined,
      seperator: undefined,
      startX: undefined,
      startY: undefined,
      startWidth: undefined,
      startHeight: undefined,
    };
  },
  mounted() {
    this.container = this.$refs.left;
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
        document.defaultView.getComputedStyle(this.container).width
      );
      this.startHeight = parseInt(
        document.defaultView.getComputedStyle(this.container).height
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
      this.container.style.width =
        this.startWidth + e.clientX - this.startX + "px";
    },
    stopDrag() {
      document.documentElement.removeEventListener("mousemove", this.doDrag);
      document.documentElement.removeEventListener("mouseup", this.stopDrag);
    },
  },
};
</script>
