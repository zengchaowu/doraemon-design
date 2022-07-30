<template>
  <div ref="container">
    <template v-if="payload">
      <template v-if="context === 'load'">
        <template v-if="state.load === 'success'">
          <template v-if="isArrayLike(data.load) || isNil(data.load)">
            <template v-if="data.load?.length > 0">
              <slot
                name="load"
                v-bind:context="{ state: state.load, data: data.load }"
              ></slot>
            </template>
            <template v-else>
              <component :is="payload.components[context]?.empty" />
            </template>
          </template>
          <slot
            v-else
            name="load"
            v-bind:context="{ state: state.load, data: data.load }"
          ></slot>
        </template>
        <template v-else-if="state.load === 'reloading'">
          <component :is="payload.components[context]?.reloading" />
        </template>
        <template v-else-if="state.load === 'reloadError'">
          <component :is="payload.components[context]?.reloadError" />
        </template>
      </template>
      <template v-else-if="context === 'search'">
        <slot
          name="search"
          v-bind:context="{ state: state.search, data: data.search }"
        ></slot>
      </template>
      <template v-else>
        <slot v-bind:context="{ state, data }"></slot>
      </template>
    </template>
  </div>
</template>

<script>
import isArrayLike from "lodash.isarraylike";
import isNil from "lodash.isnil";
export default {
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      context: null, // null load search
      request: {
        load: {
          reloadData: async () => {
            try {
              this.context = "load";
              this.state.load = "reloading";
              const result = await this.payload.request.requestData();
              this.data.load = result;
              this.state.load = "success";
            } catch (error) {
              this.payload?.request?.handleError &&
                this.payload.request.handleError(error);
            }
          },
          appendData: async () => {
            try {
              this.context = "load";
              this.state.load = "appending";
              const result = await this.payload.request.requestData();
              this.data.load = this.data.load.concat(result);
              this.state.load = "success";
            } catch (error) {
              this.payload?.request?.handleError &&
                this.payload.request.handleError(error);
            }
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
    };
  },
  methods: {
    isArrayLike,
    isNil
  },
};
</script>
