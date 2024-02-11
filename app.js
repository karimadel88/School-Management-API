const config = require("./config/index.config.js");
const Cortex = require("ion-cortex");
const ManagersLoader = require("./loaders/ManagersLoader.js");

// Instance of mongoDB
const mongoDB = config.dotEnv.MONGO_URI
  ? require("./connect/mongo")({
      uri: config.dotEnv.MONGO_URI,
    })
  : null;

// Instance of cache
const cache = require("./cache/cache.dbh")({
  prefix: config.dotEnv.CORTEX_PREFIX,
  url: config.dotEnv.CACHE_REDIS,
});

// Instance of Cortex
const cortex = new Cortex({
  prefix: config.dotEnv.CORTEX_PREFIX,
  url: config.dotEnv.CORTEX_REDIS,
  type: config.dotEnv.CORTEX_TYPE,
  state: () => {
    return {};
  },
  activeDelay: "50ms",
  idlDelay: "200ms",
});

// Add mongoDB to the ManagersLoader
const managersLoader = new ManagersLoader({ config, cache, cortex, mongoDB });

// Load managers
const managers = managersLoader.load();

// Start user server
managers.userServer.run();
