<template>
  <div v-if="preview" class="flex truncate items-center min-w-0">
    <span class="truncate">{{ value }}</span>
  </div>
  <a-input-search
    v-else
    :value="value"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
    @change="(value) => $emit('update', value)"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
};
</script>
