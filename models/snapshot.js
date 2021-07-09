const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/dbConnections")

const Snapshot = sequelize.define('Snapshot', {
    // Model attributes are defined here
    totalDocks: {
        type: DataTypes.INTEGER
    },
    docksAvailable: {
        type: DataTypes.INTEGER
    },
    bikesAvailable: {
        type: DataTypes.INTEGER
    },
    classicBikesAvailable: {
        type: DataTypes.INTEGER
    },
    smartBikesAvailable: {
        type: DataTypes.INTEGER
    },
    electricBikesAvailable: {
        type: DataTypes.INTEGER
    },
    rewardBikesAvailable: {
        type: DataTypes.INTEGER
    },
    rewardDocksAvailable: {
        type: DataTypes.INTEGER
    },
    kioskId: {
        type: DataTypes.INTEGER
    },
    bikes: {
        type: DataTypes.ARRAY(DataTypes.JSON)
    },
    snapshotGroupId: {
        type: DataTypes.UUID
    }
});


module.exports = Snapshot;
