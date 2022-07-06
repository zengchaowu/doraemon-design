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
import Text from "./Text.vue";
import File from "./File.vue";
export default {
  mixins: [_interface],
  data() {
    return {
      component: undefined,
    };
  },
  created() {
    const name = camelcase(this.payload.type, { pascalCase: true });
    console.log(name);
    this.component = File;
  },
};
</script>
