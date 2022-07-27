<template>
  <div class="flex flex-col">
    <div v-for="(section, index) in sections" :key="index">
      <span class="flex items-center gap-2">
        <div class="w-2 h-4 bg-primary" />
        <span>{{ section.title }}</span>
      </span>
      <div v-if="section.inputs" :class="['grid', 'grid-cols-2', 'gap-4']">
        <template v-for="input in section.inputs">
          <InputFormItem
            v-if="input.display !== false"
            :key="input.value"
            v-model="models[input.value]"
            :disabled="input.disabled"
            :preview="input.preview || preview"
            :payload="{
              type: input.type,
              ...input.payload,
            }"
          />
        </template>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    preview: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    value: {
      type: [Object, Number, String, Array],
      default: undefined,
    },
    payload: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      models: {},
    };
  },
};
</script>
