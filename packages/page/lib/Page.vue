<template>
  <div :class="appearance.container">
    <component
      v-for="(item, index) in items"
      :key="index"
      :is="item.module"
      :class="item.class"
      :state="state"
    />
  </div>
</template>

<script>
import { computed } from "vue";
export default {
  data() {
    return {
      version: Date.now(),
      state: undefined,
      dirname: undefined,
      components: undefined,
      items: undefined,
      appearance: {
        container: ["flex-grow", "flex", "flex-col"],
      },
    };
  },
  provide() {
    return {
      version: computed(() => this.version),
    };
  },
  created() {
    this.items = [];
    for (const component of this.components) {
      this.items.push({
        module: () =>
          import(`~/components/${this.dirname}/${component.name}.vue`),
        class: component.class,
      });
    }
  },
  beforeRouteUpdate(to, from, next) {
    this.version = Date.now();
    next();
  },
};
</script>
