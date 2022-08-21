export default {
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    value: {
      type: [Object, Number, String, Array, undefined],
      default: undefined,
    },
    payload: {
      type: Object,
      default: undefined,
    },
    editable: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      isEditing: false,
      localValue: undefined,
    };
  },
  watch: {
    value: {
      handler() {
        this.localValue = this.value;
      },
      immediate: true,
    },
  },
  methods: {
    onDbclick() {
      if (
        this.editable === true &&
        this.preview === true &&
        this.disabled !== true
      ) {
        this.isEditing = true;
      }
    },
    delayBlur() {
      setTimeout(() => {
        this.onBlur();
      }, 100);
    },
    onBlur() {
      if (this.isEditing === true) {
        this.isEditing = false;
      }
    },
  },
};
