<template>
  <div :class="appearance.container">
    <component
      v-for="(item, index) in items"
      :is="item.module"
      :key="index"
      :class="item.class"
    />
  </div>
</template>

<script>
export default {
  data() {
    return {
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
