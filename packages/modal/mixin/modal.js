import pick from "lodash.pick";
import keys from "lodash.keys";
export default {
  props: {
    payload: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      models: {},
    };
  },
  created() {
    Object.assign(this.models, pick(this.payload.data, keys(this.models)));
  },
  methods: {
    dismiss() {
      this.$modal.hide(this.payload.name);
    },
  },
};
