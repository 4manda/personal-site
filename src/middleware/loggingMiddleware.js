const loggingMiddleware = (store) => (next) => (action) => {
  console.log('Redux Log:', action);
  // call the next function
  let result = next(action);
  return result;
}

export default loggingMiddleware;
