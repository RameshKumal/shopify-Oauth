module.exports = (sequelize, Sequelize) => {
  const productOption = sequelize.define(
    "product_option",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      product_id: {
        type: Sequelize.BIGINT,
        references: {
          model: "products",
          key: "id",
        },
      },
      name: Sequelize.STRING,
      position: Sequelize.BIGINT,
      values: [],
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return productOption;
};
