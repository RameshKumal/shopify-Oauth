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

/*models */
db.store = require("../models/store")(sequelize, Sequelize);
db.customer = require("../models/customer")(sequelize, Sequelize);
db.customer_address = require("../models/customer.address")(sequelize, Sequelize);
db.product = require("../models/product")(sequelize, Sequelize);
db.productVariant = require("../models/product.variant")(sequelize, Sequelize);
db.productOption = require("../models/product.option")(sequelize, Sequelize);
db.order = require("../models/order/order")(sequelize, Sequelize);

/*models associations */
db.customer.hasOne(db.customer_address);

db.product.hasMany(db.productVariant);
db.productVariant.belongsTo(db.product);

db.product.hasMany(db.productOption);
db.productOption.belongsTo(db.product);

//without syncing the the database table wont create.
db.sequelize.sync({ force: false }).then(() => {
  console.log("re-sync done");
});

module.exports = db;
