module.exports = (sequelize, Sequelize) => {
  const order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.BIGINT,
        primaryKey: true,
      },
      app_id: Sequelize.BIGINT,
      email: Sequelize.STRING,
      fulfillment_status: Sequelize.STRING,
      ordered_item: Sequelize.STRING,
      item_price: Sequelize.STRING,
      item_weight: Sequelize.STRING,
      item_Quantity: Sequelize.INTEGER,
      total_tax: Sequelize.INTEGER,
      total_amount: Sequelize.INTEGER,
    },
    {
      createdAt: "created_at",
      updated_at: "updated_at",
    }
  );
  return order;
};
