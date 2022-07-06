export default {
  model: {
    prop: 'value',
    event: 'update',
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
    disabled: {
      type: Boolean,
      default: false,
    },
    preview: {
      type: Boolean,
      default: false,
    },
  },
}
