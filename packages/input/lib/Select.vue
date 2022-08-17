<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 border-1 border-transparent rounded-md"
    :class="{
      'hover:border-border': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ parseSelect(payload?.options, value) }}
      </template>
      {{ parseSelect(payload?.options, value) }}
    </a-tooltip>
  </div>
  <a-select
    v-else
    ref="input"
    :value="localValue?.split ? localValue?.split(',') : localValue"
    :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
    :disabled="disabled"
    :allow-clear="true"
    :mode="payload?.mode"
    @change="onChange"
    v-clickoutside="onClickoutside"
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
import parseSelect from "../functions/parseSelect.js";
import mixinInput from "../mixin/input.js";
export default {
  mixins: [mixinInput],
  methods: {
    parseSelect,
    onChange(option) {
      this.localValue =
        option?.length > 0 || option?.toString()?.length > 0
          ? option?.join
            ? option.join(",")
            : option
          : undefined;
    },
    onClickoutside() {
      const value = this.localValue;

      this.$emit("update", value);

      this.onBlur();
    },
  },
};
</script>
