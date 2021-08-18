
const buildSafeSetState = ({ isValid, setState }) => {
  // NOTE: This function basically mimics the `setState` API
  return newValueOrUpdateFn => {
    if (typeof newValueOrUpdateFn === 'function') {
      setState(prev => {
        const newValue = newValueOrUpdateFn(prev);
        return isValid(newValue) ? newValue : prev;
      });
    }
    else if (isValid(newValueOrUpdateFn)) {
      setState(newValueOrUpdateFn);
    }
  };
};

export { buildSafeSetState };
