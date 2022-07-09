<template>
  <div ref="lottie"></div>
</template>

<script>
import lottie from "lottie-web";
export default {
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
  },
  mounted() {
    lottie.loadAnimation({
      container: this.$refs.lottie,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: this.payload.path,
    });
  },
};
</script>
