<template>
  <div v-if="preview" class="flex truncate items-center min-w-0 h-8">
    <Tooltip class="min-w-0 truncate">
      <template #title>
        {{ value }}
      </template>
      {{ value }}
    </Tooltip>
  </div>
  <a-textarea
    v-else
    class="h-20"
    :value="value"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
    :allow-clear="true"
    :rows="payload.rows ?? 4"
    @change="(event) => $emit('update', event.target.value)"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
};
</script>
