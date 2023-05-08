module.exports = (sequelize, Sequelize) => {
  const productVariant = sequelize.define(
    "product_variant",
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
      title: Sequelize.STRING,
      price: Sequelize.STRING,
      sku: Sequelize.STRING,
      fulfillment_service: Sequelize.STRING,
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return productVariant;
};
