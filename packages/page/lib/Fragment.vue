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
          reload: {
            url: undefined,
            params: undefined,
            headers: undefined,
          },
          append: {
            url: undefined,
            params: undefined,
            headers: undefined,
          },
        },
        search: {
          reload: {
            url: undefined,
            params: undefined,
            headers: undefined,
          },
          append: {
            url: undefined,
            params: undefined,
            headers: undefined,
          },
        },
      },
      state: {
        load: {
          reload: undefined,
          append: undefined,
        },
        search: {
          reload: undefined,
          append: undefined,
        },
      },
      data: {
        load: {
          reload: undefined,
          append: undefined,
        },
        search: {
          reload: undefined,
          append: undefined,
        },
      },
    };
  },
  methods: {
    reloadData() {},
    appendData() {},
  },
};
</script>
