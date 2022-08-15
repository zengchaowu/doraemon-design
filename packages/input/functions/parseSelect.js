import { find } from "lodash";
export default (options, value, placeholder = "") => {
  const option = find(options, (item) => {
    if (item.value) {
      return item.value === value;
    } else {
      return item === value;
    }
  });
  if (option) {
    return option.label;
  }
  return placeholder;
};
