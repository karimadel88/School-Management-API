module.exports = ({ meta, config, managers }) => {
  return ({ req, res, next }) => {
    console.log("query", req.query);
    next(req.query);
  };
};
