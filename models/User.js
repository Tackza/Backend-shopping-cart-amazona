module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        username: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        status : {
            type: DataTypes.ENUM("User","Admin"),
            
        }
    }, {
        tableName: "user"
    })
    User.associate = models => {
        User.hasOne(models.Cart, { foreignKey: "user_id" });
        User.hasOne(models.HistoryProduct, { foreignKey: "user_id" });
    }
    return User
}