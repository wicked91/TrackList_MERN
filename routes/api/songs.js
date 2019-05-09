const express = require("express");
const router = express.Router();
const SongController = require("../controllers/songs");

router.post("/", SongController.register);
router.get("/:shopid", SongController.song_get_all);
router.get("/detail/:songid", SongController.song_get);
router.delete("/:shopid/:songid", SongController.song_delete);
router.get("/search/:keyword", SongController.song_search);

module.exports = router;