/**
 * This file contains the restful services
 */
const restfulServices = (Model) => {
  return {
    /**
     * Create a new document
     */
    create: async (data) => {
      console.log("Model", Model);

      try {
        return await new Model(data).save();
      } catch (error) {
        console.log(`Error from ${Model.modelName} on create: `, error);
        throw error;
      }
    },

    /**
     * Get a document
     */
    get: async (query) => {
      try {
        return await Model.findOne(query);
      } catch (error) {
        console.log(`Error from ${Model.modelName} on get: `, error);
        throw error;
      }
    },

    /**
     * Find a document by id
     * @param {*} id
     * @returns
     */
    findById: async (id) => {
      try {
        return await Model.findById(id);
      } catch (error) {
        console.log(`Error from ${Model.modelName} on findById: `, error);
        throw error;
      }
    },

    /**
     * Get all documents
     */
    getAll: async (query) => {
      try {
        return await Model.find(query);
      } catch (error) {
        console.log(`Error from ${Model.modelName} on getAll: `, error);
        throw error;
      }
    },

    /**
     * Update a document
     */
    update: async (query, data) => {
      try {
        return await Model.findOneAndUpdate(query, data, {
          new: true,
        });
      } catch (error) {
        console.log(`Error from ${Model.modelName} on update: `, error);
        throw error;
      }
    },

    /**
     * Delete a document
     */
    delete: async (query) => {
      try {
        return await Model.findOneAndDelete(query);
      } catch (error) {
        console.log(`Error from ${Model.modelName} on delete: `, error);
        throw error;
      }
    },
  };
};

module.exports = restfulServices;
