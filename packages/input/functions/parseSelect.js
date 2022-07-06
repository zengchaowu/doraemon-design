import { find, isNil } from "lodash";
export default (options, value, placeholder = "") => {
  const option = find(options, (item) => {
    if (!isNil(item.value)) {
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
