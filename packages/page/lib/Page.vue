<template>
  <div ref="container" class="absolute inset-0 flex">
    <template v-if="context === 'load'">
      <slot name="load"></slot>
    </template>
    <template v-else-if="context === 'search'">
      <slot name="search"></slot>
    </template>
    <template v-else>
      <slot></slot>
    </template>
  </div>
</template>

<script>
export default {
  data() {
    return {
      context: null, // null load search
      request: {
        load: {
          url: undefined,
          params: undefined,
          headers: undefined,
        },
        search: {
          url: undefined,
          params: undefined,
          headers: undefined,
        },
      },
      state: {
        load: undefined,
        search: undefined,
      },
      data: {
        load: undefined,
        search: undefined,
      },
    };
  },
  methods: {
    reloadData() {},
    appendData() {},
  },
};
</script>
