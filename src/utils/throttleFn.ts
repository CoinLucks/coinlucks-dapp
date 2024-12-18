export const throttleFn = (func: Function, limit: number) => {
  let inThrottle: boolean;
  return function (...args: any) {
    if (!inThrottle) {
      func.apply(args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};
