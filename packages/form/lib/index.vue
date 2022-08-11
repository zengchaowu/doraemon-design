<template>
  <div :class="appearance.container">
    <div v-for="(section, i) in sections" :key="i" :class="appearance.section">
      <span class="flex items-center gap-2">
        <div class="w-2 h-5 rounded-sm bg-primary" />
        <span class="text-lg">{{ section.title }}</span>
      </span>
      <div :class="section.class">
        <div v-for="(row, j) in section.rows" :class="appearance.row">
          <template v-for="input in row.inputs">
            <template v-if="input.visible !== false">
              <InputFormItem :payload="input">
                <template v-if="input.computedValue">
                  <DoraemonInput
                    ref="input"
                    :key="input.value ?? input.label"
                    :value="input.computedValue()"
                    :class="input.class ?? appearance.input"
                    :preview="input.preview || preview"
                    :payload="input"
                  />
                </template>
                <template v-else-if="input.value.split('.').length === 1">
                  <DoraemonInput
                    ref="input"
                    :key="input.value ?? input.label"
                    v-model="models[input.value]"
                    :class="input.class ?? appearance.input"
                    :preview="input.preview || preview"
                    :payload="input"
                  />
                </template>
                <template v-else-if="input.value.split('.').length === 2">
                  <DoraemonInput
                    ref="input"
                    :key="input.value ?? input.label"
                    v-model="
                      models[input.value.split('.')[0]][
                        input.value.split('.')[1]
                      ]
                    "
                    :class="input.class ?? appearance.input"
                    :preview="input.preview || preview"
                    :payload="input"
                  />
                </template>
                <template v-else-if="input.value.split('.').length === 3">
                  <DoraemonInput
                    ref="input"
                    :key="input.value ?? input.label"
                    v-model="
                      models[input.value.split('.')[0]][
                        input.value.split('.')[1]
                      ][input.value.split('.')[2]]
                    "
                    :class="input.class ?? appearance.input"
                    :preview="input.preview || preview"
                    :payload="input"
                  />
                </template>
              </InputFormItem>
            </template>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import DoraemonInput from "@doraemon-design/input/lib/index.vue";
export default {
  components: { DoraemonInput },
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
      appearance: {
        container: ["flex", "flex-col", "gap-4"],
        section: ["flex", "flex-col", "gap-4"],
        row: ["flex", "gap-4"],
        input: ["flex-grow", "w-0"],
      },
      models: {},
    };
  },
};
</script>
