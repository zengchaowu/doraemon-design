<template>
  <div class="h-full relative bg-white">
    <div class="absolute inset-0">
      <button class="absolute z-20 right-2 top-2" type="button" @click="cancel">
        <div
          class="hover:text-primary fill-current w-6 h-6 object-contain"
          v-html="require('~/assets/images/icon-clear.svg?include')"
        />
      </button>
    </div>
    <div class="h-full relative z-10 flex flex-col">
      <span
        v-if="payload?.title"
        class="truncate pl-4 pr-10 py-2 border-b-1 border-border common-text-subtitle"
      >
        {{ payload?.title }}
      </span>
      <div
        class="h-full relative flex flex-col common-panel-gap common-panel-padding"
      >
        <slot />
        <div
          v-if="payload?.submit"
          class="flex items-center justify-center common-panel-gap"
        >
          <a-button type="primary" @click="payload?.submit()">提交</a-button>
          <a-button @click="cancel">取消</a-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
  },
  methods: {
    cancel() {
      this.payload?.cancel && this.payload?.cancel()
      this.$modal.hide(this.payload?.name)
    },
  },
}
</script>
