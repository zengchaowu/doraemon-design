<template>
  <div ref="container" class="absolute inset-0 flex">
    <template v-if="host">
      <template v-if="context === 'load'">
        <template v-if="state.load === 'success'">
          <template v-if="data.load.length > 0">
            <slot name="load" v-bind:context="{ state, data }"></slot>
          </template>
          <template v-else>
            <component :is="host.components[context]?.empty" />
          </template>
        </template>
        <template v-else-if="state.load === 'reloading'">
          <component :is="host.components[context]?.reloading" />
        </template>
        <template v-else-if="state.load === 'reloadError'">
          <component :is="host.components[context]?.reloadError" />
        </template>
      </template>
      <template v-else-if="context === 'search'">
        <slot name="search" v-bind:context="{ state, data }"></slot>
      </template>
      <template v-else>
        <slot v-bind:context="{ state, data }"></slot>
      </template>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    host: {
      type: Object,
      default: undefined,
    },
  },
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
        load: undefined, // undefined reloading appending success reloadError appendError
        search: undefined, // undefined reloading appending success reloadError appendError
      },
      data: {
        load: undefined,
        search: undefined,
      },
      components: {
        load: {
          empty: undefined,
          reloading: undefined,
          appending: undefined,
          reloadError: undefined,
          appendError: undefined,
        },
        search: {
          empty: undefined,
          reloading: undefined,
          appending: undefined,
          reloadError: undefined,
          appendError: undefined,
        },
      },
      methods: {
        load: {
          async reloading() {
            try {
              this.context = "load";
              this.state.load = "reloading";
              const result = await host.requestData();
              this.data.load = result;
              this.state.load = "success";
            } catch (error) {
              handleError(error);
            }
          },
          async appending() {
            try {
              this.context = "load";
              this.state.load = "appending";
              const result = await host.requestData();
              this.data.load = this.data.load.concat(result);
              this.state.load = "success";
            } catch (error) {
              handleError(error);
            }
          },
        },
        search: {
          reloading() {},
          appending() {},
        },
      },
    };
  },
};
</script>
