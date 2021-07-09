var cron = require('node-cron');
const Snapshot = require("../models/snapshot");
const SnapshotGroup = require("../models/snapshot_group");
const { Op } = require("sequelize");
const Station = require("../models/station");

const axios = require("axios");
const { v4: uuidv4 } = require('uuid');

cron.schedule('0 * * * *', async () => {

    console.log('running a task every hour');

    try {

        let uuid = uuidv4();
        let stationsMap = {};
        let allStationsIdsMap = {};
        let notCreatedStations = [];
        
        let updatedSanpShot = await axios.get("https://www.rideindego.com/stations/json/");
        let weatherSnapshot = await axios.get("http://api.openweathermap.org/data/2.5/weather?q=Philadelphia&appid=51ac57d1eebd4930c338b8b732e32e91")
        updatedSanpShot = updatedSanpShot.data;

        let stations = updatedSanpShot.features;

        for (let index = 0; index < stations.length; index++) {

            const element = stations[index];
            stationsMap[element.properties.kioskId] = element.properties

        }

        let stationsSnapshotData = stations.map(item => ({
            totalDocks: item.properties.totalDocks,
            docksAvailable: item.properties.docksAvailable,
            bikesAvailable: item.properties.bikesAvailable,
            classicBikesAvailable: item.properties.classicBikesAvailable,
            smartBikesAvailable: item.properties.smartBikesAvailable,
            electricBikesAvailable: item.properties.electricBikesAvailable,
            rewardBikesAvailable: item.properties.rewardBikesAvailable,
            rewardDocksAvailable: item.properties.rewardDocksAvailable,
            kioskId: item.properties.kioskId,
            bikes: item.properties.bikes,
            snapshotGroupId: uuid

        }))

        let allStations = await Station.findAll({ attributes: ['id'] });

        for (let index = 0; index < allStations.length; index++) {

            const element = allStations[index];
            allStationsIdsMap[element.id] = 1;

        }

        for (let index = 0; index < stationsSnapshotData.length; index++) {

            const element = stationsSnapshotData[index];

            if (!allStationsIdsMap[element.kioskId]) {

                notCreatedStations.push(stationsMap[element.kioskId])
            }
        }

        Station.bulkCreate(notCreatedStations).then(data => {

            SnapshotGroup.create({
                groupId: uuid,
                weather: weatherSnapshot.data,

            }).then(data => {

                Snapshot.bulkCreate(stationsSnapshotData).then(data => {
                    console.log(data);

                });
            })


        })



    } catch (error) {

        console.log(error);

    }

});