const addSong = function (req, res) {

    const paramTitle = req.body.title || req.query.title;
    const paramArtist = req.body.artist || req.query.artist;
    const paramImg = req.body.img || req.query.img;
    const paramId = req.body.id || req.query.id;

    console.log('[addSong][Request Parameter] : %s, %s, %s, %s', paramTitle, paramArtist, paramImg, paramId)

    const database = req.app.get('database');

    if (database.db) {

        const song = new database.songModel({
            shopid: paramId,
            title: paramTitle,
            artist: paramArtist,
            img: paramImg
        });

        song.save().then(() => {
            database.songModel.find({ 'shopid': paramId })
                .then(results => { res.json({ results: results, msg: "Song search Success" }) })
                .catch(err => { res.json({ msg: "Song search fail", error: err }) });
        })
        .catch(err => { res.json({ msg: "Song add fail", error: err }) });

    } else {
        console.log('Database Connect Fail');
        res.end();
    }
};

const removeSong = function (req, res) {

    const paramShopId = req.params.shopId;
    const paramSongId = req.params.songId;

    console.log('[removeSong][Request Parameter] : %s, %s', paramShopId, paramSongId);

    var database = req.app.get('database');

    if (database.db) {

        database.songModel.findOneAndRemove({ '_id': paramSongId })
            .then((list) => {
                database.songModel.find({ 'shopid': paramShopId })
                    .then(results => { res.json({ results: results, msg: "Song search Success" }) })
                    .catch(err => { res.json({ msg: "Song search fail", error: err }) });
            })
            .catch(err => { res.json({ msg: "Song remove fail", error: err }) });
    } else {
        console.log('Database Connect Fail');
        res.end();
    }
}

const trackList = function (req, res) {

    const paramId = req.params.paramId;
    console.log('[trackList][Request Parameter] : %s', paramId);

    const database = req.app.get('database');

    if (database.db) {
        database.songModel.find({ 'shopid': paramId })
            .then(results => { res.json({ results: results, msg: "Song search Success" }) })
            .catch(err => (console.log(err)));

    } else {
        console.log('Database Connect Fail');
        res.end();
    }
};

module.exports.addSong = addSong;
module.exports.removeSong = removeSong;
module.exports.trackList = trackList;