const restfulServices = require("../../../general/rest-controller");
const SchoolModel = require("./School.mongoModel");

class School {
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
    this.httpExposed = [
      "create",
      "put=update",
      "delete=delete",
      "get=get",
      "list=get",
    ];
  }

  restServices = restfulServices(SchoolModel);

  async create({ name, address, website }) {
    const school = await this.restServices.create({
      name,
      address,
      website,
      students: [],
    });
    return school;
  }

  async update() {}

  async delete() {}

  async get() {}

  async list() {
    return [];
  }
}
