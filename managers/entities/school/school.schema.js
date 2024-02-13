module.exports = {
  create: [
    {
      label: "name",
      model: "name",
      type: "String",
      required: true,
    },
    {
      label: "address",
      model: "address",
      type: "String",
      required: true,
    },
    {
      label: "website",
      model: "website",
      type: "String",
      required: true,
    },
    {
      model: "schoolManager",
      type: "Number",
      required: true,
    },
  ],
};
