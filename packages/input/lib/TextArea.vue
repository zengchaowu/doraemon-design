<template>
  <div
    v-if="preview && isEditing === false"
    class="bg-gray-100 m-2 p-2 rounded-md whitespace-pre-wrap border-1 border-transparent rounded-md"
    :class="{
      'hover:border-primary': editable && disabled !== true,
    }"
    @click="onDbclick"
  >
    <span class="px-2">
      {{ value }}
    </span>
  </div>
  <a-textarea
    v-else
    ref="input"
    :value="localValue"
    :placeholder="payload?.placeholder ?? '请输入' + (payload?.label ?? '')"
    :disabled="disabled"
    :allow-clear="true"
    :rows="payload.rows ?? 4"
    @change="onChange"
    v-clickoutside="onClickoutside"
  />
</template>

<script>
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  methods: {
    onChange(event) {
      this.localValue = event.target.value;
    },
    onClickoutside() {
      const value = this.localValue;

      this.$emit("update", value);

      this.onBlur();
    },
  },
  mounted() {
    if (
      this.localValue === undefined &&
      this.payload?.fillPlaceholder === true
    ) {
      this.localValue = this.payload?.placeholder;
    }
  },
};
</script>
