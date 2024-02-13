const bcrypt = require("bcrypt");
const restfulServices = require("../../../general/rest-controller");
const UserModel = require("./User.mongoModel");
const Keys = require("./utils");

class User {
  constructor({ config, cortex, validators, mongomodels, managers } = {}) {
    // Initialize class properties with provided dependencies
    this.config = config;
    this.cortex = cortex;
    this.validators = validators;
    this.mongomodels = mongomodels;
    this.tokenManager = managers.token;
    this.usersCollection = "users";
    this.httpExposed = ["create", "login", "createAdmin"];
    this.restServices = restfulServices(UserModel);
    this.managers = managers;
  }

  // Create super admin
  async createAdmin({ username, email, password, key = Keys.SUPER_ADMIN }) {
    const payload = { username, email, password, key };

    // Validate user data
    const validationResult = await this.validateUser(payload);

    if (validationResult) {
      return this.errorResponse(400, "Validation Error", validationResult);
    }

    // Check if the user already exists
    if (await this.userExists(email)) {
      return this.errorResponse(400, "User already exists", [
        "User already exists",
      ]);
    }

    // Hash password before storing
    const hashedPassword = await this.hashPassword(password);
    payload.password = hashedPassword;

    // Create user
    const user = await this.restServices.create(payload);

    // Generate long token for user session
    const longToken = this.tokenManager.genLongToken({
      userId: user.id,
      userKey: user.key,
    });

    return this.successResponse(user, longToken);
  }

  // Create a new user
  async create({ username, email, password, key }) {
    const payload = { username, email, password };

    // Validate user data
    const validationResult = await this.validateUser(payload);

    if (validationResult) {
      return this.errorResponse(400, "Validation Error", validationResult);
    }

    // Check if the user already exists
    if (await this.userExists(email)) {
      return this.errorResponse(400, "User already exists", [
        "User already exists",
      ]);
    }

    // Hash password before storing
    const hashedPassword = await this.hashPassword(password);
    payload.password = hashedPassword;

    // Create user
    const user = await this.restServices.create(payload);

    // Generate long token for user session
    const longToken = this.tokenManager.genLongToken({
      userId: user.id,
      userKey: user.key,
    });

    return this.successResponse(user, longToken);
  }

  // User login
  async login({ email, password }) {
    const validationResult = await this.validateLogin({ email, password });

    if (validationResult) {
      return this.errorResponse(400, "Validation Error", validationResult);
    }

    // Find user by email
    const user = await this.restServices.get({ email });

    if (!user) {
      return this.errorResponse(404, "User not found");
    }

    // Compare provided password with stored hashed password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return this.errorResponse(400, "Invalid credentials");
    }

    // Generate long token for user session
    const longToken = this.tokenManager.genLongToken({
      userId: user.id,
      userKey: user.key,
    });

    return this.successResponse(user, longToken);
  }

  // Validate user data
  async validateUser(payload) {
    return await this.validators.user.createUser(payload);
  }

  // Validate login data
  async validateLogin(payload) {
    return await this.validators.user.loginUser(payload);
  }

  // Check if user already exists
  async userExists(email) {
    const user = await this.restServices.get({ email });
    return user !== null;
  }

  // Hash password using bcrypt
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  }

  // Prepare success response object
  successResponse(user, longToken) {
    return {
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
        key: user.key,
        id: user.id,
      },
      longToken,
    };
  }

  // Prepare error response object
  errorResponse(code, message, errors = []) {
    return { code, message, ok: false, errors };
  }
}

module.exports = User;
