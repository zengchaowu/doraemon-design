<template>
  <component
    :is="component"
    :value="value"
    :payload="payload"
    :disabled="disabled"
    :preview="preview"
    v-on="$listeners"
  />
</template>

<script>
import camelcase from "camelcase";
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  data() {
    return {
      component: undefined,
    };
  },
  created() {
    const name = camelcase(this.payload.type, { pascalCase: true });
    if (name === "Custom") {
      this.component = this.payload.component;
    } else {
      this.component = require(`./${name}.vue`).default;
    }
  },
};
</script>
