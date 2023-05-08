module.exports = (sequelize, Sequelize) => {
  const customer = sequelize.define(
    "customer",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
        autoIncrement: true,
      },
      first_name: Sequelize.STRING,
      last_name: Sequelize.STRING,
      email: Sequelize.STRING,
      phone: Sequelize.BIGINT,
      currency: Sequelize.STRING,
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return customer;
};
