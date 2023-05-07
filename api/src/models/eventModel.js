const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('Event', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        id_Artist: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        price: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        nameArena: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        date: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        id_eventPhoto: {
            type: DataTypes.STRING,
            allowNull: true,
        },
        eventPhoto: {
            type: DataTypes.STRING,
            defaultValue: "https://res.cloudinary.com/draxxv99e/image/upload/v1682710836/defaulr_urbanclub/profilePhoto_r6vbif.png"
        }, 
        stock: {
            type: DataTypes.INTEGER,
            allowNull: false,
            defaultValue: 0,
        }
    })
}