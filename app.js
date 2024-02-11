const config = require("./config/index.config.js");
const Cortex = require("ion-cortex");
const ManagersLoader = require("./loaders/ManagersLoader.js");

const mongoDB = config.dotEnv.MONGO_URI
  ? require("./connect/mongo")({
      uri: config.dotEnv.MONGO_URI,
    })
  : null;

console.log(config.dotEnv.MONGO_URI);
const cache = require("./cache/cache.dbh")({
  prefix: "CORTEX",
  url: config.dotEnv.CACHE_REDIS,
});

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
const managers = managersLoader.load();

managers.userServer.run();
