module.exports = (sequelize, Sequelize) => {
  const store = sequelize.define(
    "store",
    {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement:true,
      },
      store_id: {
        type: Sequelize.BIGINT,
        unique: true,
      },
      store_owner: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      owner_email: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      store_domain: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      country: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      phone: Sequelize.STRING,
      access_token: {
        type: Sequelize.STRING,
        allowNull: false,
      },
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return store;
};
