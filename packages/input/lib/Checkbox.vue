<template>
  <div class="flex truncate items-center min-w-0 h-8">
    <a-checkbox
      :checked="value"
      :disabled="disabled"
      @change="(event) => $emit('update', event.target.checked)"
    >
      {{ payload?.label }}
    </a-checkbox>
  </div>
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
};
</script>
