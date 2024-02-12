const { has } = require("lodash");
const bcrypt = require("bcrypt");
const restfulServices = require("../../../general/rest-controller");
const UserModel = require("./User.mongoModel");

module.exports = class User {
  constructor({
    utils,
    cache,
    config,
    cortex,
    managers,
    validators,
    mongomodels,
  } = {}) {
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers.token;
    this.usersCollection = "users";
    this.httpExposed = ["create", "login"];
  }

  restServices = restfulServices(UserModel);

  /**
   * Create a new user
   */
  async create({ username, email, password }) {
    const payload = { username, email, password };

    // Data validation
    let result = await this.validators.user.createUser(payload);

    // Validation Error
    if (result)
      return {
        errors: result,
        code: 400,
        message: "Validation Error",
        ok: false,
      };

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(payload.password, salt);
    payload.password = hash;

    const user = await this.restServices.create(payload);

    console.log(user);

    // Creation Logic
    let longToken = this.tokenManager.genLongToken({
      userId: user._id,
      userKey: user.key,
    });

    // Response
    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        key: user.key,
      },
      longToken,
    };
  }

  /**
   * Login
   */
  async login({ email, password }) {
    const payload = { email, password };

    // Data validation
    let result = await this.validators.user.loginUser(payload);

    // Validation Error
    if (result)
      return {
        errors: result,
        code: 400,
        message: "Validation Error",
        ok: false,
      };

    // Find user
    const user = await this.restServices.get({ email });

    if (!user) {
      return {
        code: 404,
        message: "User not found",
        ok: false,
      };
    }

    // Compare password
    const isMatch = await bcrypt.compare(payload.password, user.password);
    if (!isMatch) {
      return {
        code: 400,
        message: "Invalid credentials",
        ok: false,
      };
    }

    // Creation Logic
    let longToken = this.tokenManager.genLongToken({
      userId: user._id,
      userKey: user.key,
    });

    // Response
    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        key: user.key,
      },
      longToken,
    };

    // Continue with the rest of the code...
  }
};
