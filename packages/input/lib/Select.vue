<template>
  <div v-if="preview" class="flex truncate items-center min-w-0">
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ parseSelect(payload?.options, value) }}
      </template>
      {{ parseSelect(payload?.options, value) }}
    </a-tooltip>
  </div>
  <a-select
    v-else
    class="w-32"
    :value="value"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled="disabled"
    @change="(option) => $emit('update', option)"
  >
    <a-select-option
      v-for="(option, index) in payload?.options"
      :key="index"
      :value="option.value"
    >
      <span>
        {{ option.label }}
      </span>
    </a-select-option>
  </a-select>
</template>

<script>
import parseSelect from '../functions/parseSelect.js'
import _interface from '../mixin/input.js'
export default {
  mixins: [_interface],
  methods: {
    parseSelect,
  },
}
</script>
