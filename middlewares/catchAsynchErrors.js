module.exports = (anyFunction) => (req, res, next) => {
  Promise.resolve(anyFunction(req, res, next)).catch(next);
};
