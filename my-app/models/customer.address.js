module.exports = (sequelize, Sequelize) => {
    const customerAddress = sequelize.define(
      "customer_address",
      {
        id: {
          type: Sequelize.BIGINT,
          primaryKey: true,
          autoIncrement: true,
        },
        customer_id:{
            type: Sequelize.BIGINT,
            references:{
                model:"customers",
                key:"id",
            }
        },
        company: Sequelize.STRING,
        address1: Sequelize.STRING,
        address2: Sequelize.STRING,
        city: Sequelize.STRING,
        country: Sequelize.STRING,
      },
      {
        createdAt: "created_at",
        updatedAt: "updated_at",
      }
    );
    return customerAddress;
  };
  