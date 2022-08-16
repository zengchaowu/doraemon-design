export default {
  model: {
    prop: "value",
    event: "update",
  },
  props: {
    value: {
      type: [Object, Number, String, Array],
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
    };
  },
  methods: {
    onDbclick() {
      if (this.editable === true && this.preview === true) {
        this.isEditing = true;
      }
    },
    onBlur() {
      if (this.isEditing === true) {
        this.isEditing = false;
      }
    },
  },
};
