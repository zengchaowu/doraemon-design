<template>
  <div
    v-if="preview && isEditing === false"
    class="flex truncate items-center min-w-0 h-8"
    @click="onDbclick"
  >
    <a target="_blank" :href="value">下载</a>
  </div>
  <button
    v-else
    :disabled="disabled"
    type="button"
    class="truncate"
    @click="click"
    v-clickoutside="onClickoutside"
  >
    <span class="truncate">{{ localValue ? "已上传" : "选择文件" }}</span>
    <input ref="input" type="file" class="hidden" @input="input" />
  </button>
</template>

<script>
import first from "lodash.first";
import _interface from "../mixin/input.js";
export default {
  mixins: [_interface],
  data() {
    return {
      status: "wait", // wait uploading done fail
    };
  },
  methods: {
    click() {
      if (this.status === "uploading") {
        return;
      }
      this.$refs.input.click();
    },
    input(event) {
      const { files } = event.target;
      const file = first(files);
      if (this.beforeUpload(file)) {
        this.upload(file);
      }
    },
    beforeUpload() {
      return true;
    },
    upload(file) {
      this.status = "uploading";
      const formData = new FormData();
      formData.append("file", file);
      console.log(this.$axios);
      this.$axios({
        method: "post",
        url: "/api/oss/upload",
        headers: {},
        data: formData,
      }).then((res) => {
        const { code, data, msg } = res.data || {};
        if (code === 0) {
          this.status = "done";
          this.$emit("update", data.url);
        } else {
          this.$message.error(msg);
          this.status = "fail";
        }
      });
    },
  },
};
</script>
