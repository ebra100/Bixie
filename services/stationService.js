const Snapshot = require("../models/snapshot");
const Station = require("../models/station");
const SnapshotGroup = require("../models/snapshot_group")
const { Op } = require("sequelize");
var _ = require('lodash');

module.exports = {

    getSnapshotsByDate: async (date) => {

        let formattedResponse = {};

        let snapshot = await SnapshotGroup.findOne({
            where: {
                createdAt: {
                    [Op.gte]: new Date(date)
                },
            },
            include: [{
                model: Snapshot,
                include: [{
                    model: Station
                }]

            }],
        })

        if (!snapshot) {
            throw { status: "NOT_FOUND" }
        }

        snapshot = JSON.parse(JSON.stringify(snapshot));

        formattedResponse['at'] = snapshot.createdAt;
        formattedResponse['weather'] = snapshot.weather;
        formattedResponse['stations'] = [];

        for (let index = 0; index < snapshot.Snapshots.length; index++) {

            const element = snapshot.Snapshots[index];

            let station = element.Station;
            delete element.Station;

            formattedResponse['stations'].push({
                ...element,
                ...station
            })
        }

        if (!snapshot) {
            throw { status: "NOT_FOUND" }
        }

        return { status: 'OK', result: formattedResponse };

    },

    getSnapShotByDateRange: async (dateRange, id) => {

        let formattedResponse = []
        let snapshots = await SnapshotGroup.findAll({
            where: {
                createdAt: {
                    [Op.between]: [new Date(dateRange.from), new Date(dateRange.to)]
                },
            },
            include: [{
                model: Snapshot,
                where: {
                    kioskId: id
                },
                include: [{
                    model: Station
                }]

            }]
        })

        snapshots = JSON.parse(JSON.stringify(snapshots));

        if (!snapshots || !snapshots.length) {
            throw { status: "NOT_FOUND" }
        }

        for (let index = 0; index < snapshots.length; index++) {

            let formattedResponseObject = {};

            const element = snapshots[index];

            formattedResponseObject['at'] = element.createdAt;
            formattedResponseObject['weather'] = element.weather;
            formattedResponseObject['stations'] = {};

            let snapshot = element.Snapshots[0]
            let station = element.Snapshots[0].Station;

            delete element.Snapshots;

            formattedResponseObject['station'] = {
                ...snapshot,
                ...station
            }

            formattedResponse.push(formattedResponseObject)
        }

        return { status: 'OK', result: formattedResponse };
    },

    getSnapShotByDate: async (date, id) => {

        let formattedResponse = {};

        let snapshot = await SnapshotGroup.findOne({
            where: {
                createdAt: {
                    [Op.gte]: new Date(date)
                },
            },
            include: [{
                model: Snapshot,
                where: {
                    kioskId: id
                },
                include: [{
                    model: Station
                }]

            }]
        })

        if (!snapshot) {
            throw { status: "NOT_FOUND" }
        }

        snapshot = JSON.parse(JSON.stringify(snapshot));

        formattedResponse['at'] = snapshot.createdAt;
        formattedResponse['weather'] = snapshot.weather;
        formattedResponse['stations'] = {};


        for (let index = 0; index < snapshot.Snapshots.length; index++) {

            const element = snapshot.Snapshots[index];

            let station = element.Station;
            delete element.Station;

            formattedResponse['stations'] = ({
                ...element,
                ...station
            })
        }

        return { status: 'OK', result: formattedResponse };
    }

}