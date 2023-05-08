module.exports = (sequelize, Sequelize) => {
  const product = sequelize.define(
    "product",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      title: Sequelize.STRING,
      body_html: Sequelize.STRING,
      vendor: Sequelize.STRING,
      product_type: Sequelize.STRING,
      handle: Sequelize.STRING,
      status: Sequelize.STRING,
    },
    {
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return product;
};
