/**
 * Middleware to check if superAdmin
 */
module.exports = ({ meta, config, managers }) => {
  return ({ req, res, next }) => {
    console.log("newUser middleware");
    console.log(req.decoded);
    next();
  };
};
