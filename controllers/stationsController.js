const Snapshot = require("../models/snapshot");
const Station = require("../models/station");
const SnapshotGroup = require("../models/snapshot_group")
const { Op } = require("sequelize");
const stationService = require("../services/stationService")
const errorService = require("../services/errorService");

module.exports = {

    getStationSnapshotsByDate: async (req, res) => {

        try {

            let date = req.query.at;

            let response = await stationService.getSnapshotsByDate(date)
            res.send({ status: "OK", result: response.result })

        } catch (error) {

            console.log(error);
            
            let formattedError = errorService.errorHandler(error);
            return res.status(formattedError.status).send({ message: formattedError.message })

        }

    },

    getSpecifcStationSnapshotsByDate: async (req, res) => {

        try {

            let date = req.query.at;
            let id = req.params.id
            let from = req.query.from;
            let to = req.query.to;
            let response

            if (from && to) {

                response = await stationService.getSnapShotByDateRange({ from, to }, id)
            }

            if (date) {

                response = await stationService.getSnapShotByDate(date, id)
            }

            res.send({ status: "OK", result: response.result })

        } catch (error) {

            console.log(error);

            let formattedError = errorService.errorHandler(error);

            return res.status(formattedError.status).send({ message: formattedError.message })
        }

    }
}