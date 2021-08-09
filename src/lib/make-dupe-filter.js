
// This returns a function for use in `Array.filter`.
// Only the first array item with a given key will be kept.
// The key is determined by the specified key function.
// NOTE: This is decent but it still feels a bit awkward. I wonder
//    if there is a better way.
function makeDupeFilter(keyFn) {
  const keyTracker = {};
  return function(item) {
    const key = keyFn(item);
    if (key in keyTracker) {
      return false;
    }
    keyTracker[key] = true;
    return true;
  };
}

export { makeDupeFilter };
