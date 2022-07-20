<template>
  <div v-if="preview" class="flex truncate items-center min-w-0">
    <a-tooltip class="min-w-0 truncate">
      <template #title>
        {{ parseSelect(payload?.options, value) }}
      </template>
      {{ parseSelect(payload?.options, value) }}
    </a-tooltip>
  </div>
  <div v-else class="flex relative" @click.stop="onClick">
    <a-select
      class="flex-grow"
      :value="value"
      :placeholder="payload?.placeholder ?? '请选择' + payload?.label"
      :disabled="disabled"
      @change="(option) => $emit('update', option)"
      :style="{ 'pointer-events': options ? undefined : 'none' }"
    >
      <a-select-option
        v-for="(option, index) in options"
        :key="index"
        :value="option.value"
      >
        <span>
          {{ option.label }}
        </span>
      </a-select-option>
    </a-select>
  </div>
</template>

<script>
import parseSelect from "../functions/parseSelect.js";
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  data() {
    return {
      state: undefined, // loading success fail
      options: undefined,
    };
  },
  methods: {
    parseSelect,
    async onClick() {
      if (this.state === undefined || this.state === "fail") {
        this.state = "loading";
        try {
          const result = await this.payload?.getOptions();
          this.options = result;
          this.state = "success";
        } catch (error) {
          console.log(error);
          this.state = "fail";
        }
      }
    },
  },
};
</script>

<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  user-select: none;
}
</style>
