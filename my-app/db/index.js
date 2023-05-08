require("dotenv").config();
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  process.env.DB,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DIALECT,
    logging: false,
    pool: {
      max: 4,
      min: 0,
      idle: 3000,
      acquire: 10000,
    },
  }
);

sequelize
  .authenticate()
  .then(() => {
    console.log("Connection Established Successfully.");
  })
  .catch((err) => {
    console.log(err);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.store = require("../models/store")(sequelize, Sequelize);
db.customer = require("../models/customer")(sequelize, Sequelize);
db.customer_address = require("../models/customer.address")(sequelize, Sequelize);

db.customer.hasOne(db.customer_address);

// db.product.belongsTo(db.store, { foreignKey: "store_id" });

// db.store.hasMany(db.orderInfo, { foreignKey: "storeId" });
// db.orderInfo.belongsTo(db.store, { foreignKey: "storeIid" });

// db.product.hasMany(db.variant, { foreignKey: "product_id" });
// db.variant.belongsTo(db.product, { foreignKey: "product_id" });

//without syncing the the database table wont create.
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;
