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
export default {
  data() {
    return {
      state: undefined,
      dirname: undefined,
      components: undefined,
      items: undefined,
      appearance: {
        container: ["flex-grow", "flex", "flex-col"],
      },
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
};
</script>
