const mongoose = require("mongoose");
const restfulServices = require("../../../general/rest-controller");
const Keys = require("../user/utils");
const SchoolModel = require("./School.mongoModel");
const UserModel = require("../user/User.mongoModel");

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
    this.usersCollection = "schools";
    this.httpExposed = [
      "get=getAll",
      "create",
      "put=update",
      "delete=delete",
      "get=get",
    ];
  }

  schoolServices = restfulServices(SchoolModel);
  userServices = restfulServices(UserModel);

  /**
   * Create new school
   */
  async create({ __longToken, schoolManager, name, address, website }) {
    // Check if can create school
    if (!(await this.canManageSchoolModel(__longToken))) {
      return {
        errors: ["Unauthorized"],
        code: 401,
        message: "Unauthorized",
        ok: false,
      };
    }

    // Validate payload
    let result = await this.validators.school.create({
      name,
      address,
      website,
      schoolManager,
    });

    // Validation Error
    if (result)
      return {
        errors: result,
        code: 400,
        message: "Validation Error",
        ok: false,
      };

    // Make sure school manager exist
    if (!(await this.mangerExists(schoolManager))) {
      return {
        errors: ["School Manager does not exist"],
        code: 400,
        message: "School Manager does not exist",
        ok: false,
      };
    }

    const school = await this.schoolServices.create({
      name,
      address,
      website,
      schoolManager,
    });

    return school;
  }

  /**
   * Update school
   */
  async update({ __longToken, id, name, address, website, schoolManager }) {
    // Check if can update school
    if (!(await this.canManageSchoolModel(__longToken))) {
      return {
        errors: ["Unauthorized"],
        code: 401,
        message: "Unauthorized",
        ok: false,
      };
    }

    // Validate payload
    let result = await this.validators.school.update({
      name,
      address,
      website,
      schoolManager,
    });

    // Validation Error
    if (result)
      return {
        errors: result,
        code: 400,
        message: "Validation Error",
        ok: false,
      };

    // Make sure school manager exist
    if (!(await this.mangerExists(schoolManager))) {
      return {
        errors: ["School Manager does not exist"],
        code: 400,
        message: "School Manager does not exist",
        ok: false,
      };
    }

    const school = await this.schoolServices.update(
      { id: id },
      { name, address, website, schoolManager }
    );

    return school;
  }

  /**
   * Delete school by id
   */
  async delete({ __longToken, id }) {
    // Check if can delete school
    if (!(await this.canManageSchoolModel(__longToken))) {
      return {
        errors: ["Unauthorized"],
        code: 401,
        message: "Unauthorized",
        ok: false,
      };
    }

    const school = await this.schoolServices.delete({ id: id });
    return school;
  }

  /**
   * Get school by id
   */
  async get({ __longToken, id }) {
    // Check if can get school
    if (!(await this.canManageSchoolModel(__longToken))) {
      return {
        errors: ["Unauthorized"],
        code: 401,
        message: "Unauthorized",
        ok: false,
      };
    }

    const school = await this.schoolServices.get({ id: id });

    if (!school) {
      return {
        errors: ["School not found"],
        code: 404,
        message: "School not found",
        ok: false,
      };
    }

    return school;
  }

  /**
   * Get all schools
   * @param {*} param0
   * @returns
   */
  async getAll({ __longToken }) {
    // Check if can get school
    if (!(await this.canManageSchoolModel(__longToken))) {
      return {
        errors: ["Unauthorized"],
        code: 401,
        message: "Unauthorized",
        ok: false,
      };
    }

    const schools = await this.schoolServices.getAll();
    return schools;
  }

  /**
   * Check if user can manage school
   * @param {*} __longToken
   * @returns
   */
  async canManageSchoolModel(__longToken) {
    console.log(__longToken);
    const { userKey, userId } = __longToken;

    const user = await this.userServices.get({
      id: userId,
    });

    if (userKey !== Keys.SUPER_ADMIN) return false;

    if (user && user.key === Keys.SUPER_ADMIN) return true;

    return false;
  }

  /**
   * Check manager of school exist
   */
  async mangerExists(id) {
    const schoolManager = await this.userServices.get({
      id: id,
      key: Keys.MANAGER,
    });

    if (schoolManager) {
      return schoolManager;
    }
    return null;
  }
}

module.exports = School;
