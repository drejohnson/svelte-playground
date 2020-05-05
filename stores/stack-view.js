import { writable } from "svelte/store";

export function stackView(value = []) {
  const store = writable(value);

  const wrap = method => {
    return (...args) => {
      let stack;
      store.update(value => {
        stack = value[method](...args);
        return value;
      });
      return stack;
    };
  };

  return {
    ...store,
    push: wrap("push"),
    pop: wrap("pop")
  };
}
