export function throttle(fn: Function, delay: number) {
  let isThr = true;
  return function () {
    if (isThr) {
      fn();
      isThr = false;
      setTimeout(() => (isThr = true), delay);
    }
  };
}
