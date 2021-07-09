const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require("../config/dbConnections")
const Snapshot = require("../models/snapshot");

const SnapshotGroup = sequelize.define('Snapshot_Group', {
    // Model attributes are defined here
    groupId: {
        type: DataTypes.UUID,
        unique: true
    },
    weather: {
        type: DataTypes.JSON
    },
    createdAt: {
        type: DataTypes.DATE
    }
});

SnapshotGroup.hasMany(Snapshot, { foreignKey: 'snapshotGroupId', sourceKey: 'groupId' });
Snapshot.belongsTo(SnapshotGroup, { foreignKey: 'snapshotGroupId', targetKey: "groupId" });


module.exports = SnapshotGroup;
