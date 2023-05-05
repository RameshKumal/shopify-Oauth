module.exports=(sequelize, Sequelize) =>{
    const store = sequelize.define('store',{
        store_id: {
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement: true,
        },
        store_owner:Sequelize.STRING,
        owner_email:Sequelize.STRING,
        store_name:Sequelize.STRING,
        address:Sequelize.STRING,
        phone:Sequelize.STRING,
        access_token:Sequelize.STRING,

    },{
        createdAt:"created_at",
        updatedAt:"updated_at",
    });
    return store;
}