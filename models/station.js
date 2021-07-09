const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/dbConnections")
const Snapshot = require("./snapshot");

const Station = sequelize.define('Station', {
    // Model attributes are defined here
    latitude: {
        type: DataTypes.STRING
    },
    longitude: {
        type: DataTypes.STRING
    },
    kioskStatus: {
        type: DataTypes.STRING
    },
    kioskPublicStatus: {
        type: DataTypes.STRING,
    },
    kioskConnectionStatus: {
        type: DataTypes.STRING
    },
    kioskType: {
        type: DataTypes.INTEGER
    },
    addressStreet: {
        type: DataTypes.STRING
    },
    addressCity: {
        type: DataTypes.STRING
    },
    addressState: {
        type: DataTypes.STRING
    },
    addressZipCode: {
        type: DataTypes.STRING
    },
});

Station.hasMany(Snapshot, { foreignKey: 'kioskId', sourceKey: 'id' });
Snapshot.belongsTo(Station, { foreignKey: 'kioskId', targetKey: "id" });


module.exports = Station;
