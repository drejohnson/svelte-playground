import { readable } from "svelte/store";

export function observable(observable) {
  return readable(null, set => {
    const subscription = observable.subscribe(set);
    return () => void subscription.unsubscribe();
  });
}
