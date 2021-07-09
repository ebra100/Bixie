var express = require('express');
var router = express.Router();
const stationsController = require("../controllers/stationsController")

router.get("/", stationsController.getStationSnapshotsByDate)
router.get("/:id", stationsController.getSpecifcStationSnapshotsByDate)

module.exports = router;
