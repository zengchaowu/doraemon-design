<template>
  <component
    :is="component"
    :payload="payload"
    :disabled="disabled"
    v-on="$listeners"
  />
</template>

<script>
import camelcase from "camelcase";
import _interface from "../mixin/button.js";
export default {
  mixins: [_interface],
  data() {
    return {
      component: undefined,
    };
  },
  created() {
    const name = camelcase(this.payload.type, { pascalCase: true });
    this.component = require(`./${name}.vue`).default;
  },
};
</script>
