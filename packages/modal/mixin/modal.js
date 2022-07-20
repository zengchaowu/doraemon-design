import pick from "lodash.pick";
import keys from "lodash.keys";
import Modal from "@doraemon-design/modal/lib/Modal.vue";
export default {
  components: { Modal },
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
    Object.assign(this.models, pick(this.payload?.data, keys(this.models)));
  },
  methods: {
    submit() {},
    cancel() {
      this.$modal.hide(this.payload?.name);
    },
  },
};
