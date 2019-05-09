const axios = require('axios');
const urlencode = require('urlencode');
const Song = require("../../models/song");

exports.register = (req, res) => {
    const song = new Song({
        shopid: req.body.shopid,
        title: req.body.title,
        artist: req.body.artist,
        img: req.body.img
    });
    song.save()
        .then(() => {
            Song.find({ shopid: req.body.shopid })
            .select("shopid title artist img")
            .then(docs => {
                const response = {
                    count: docs.length,
                    songs: docs.map(doc => {
                        return {
                            _id: doc._id,
                            shop: doc.shopid,
                            title: doc.title,
                            artist: doc.artist,
                            img: doc.img,
                            request: {
                                type: "GET",
                                url: "http://" + req.headers.host + "/songs/detail/" + doc._id
                            }
                        }
                    })
                };
                res.status(200).json(response);
            })
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.song_get_all = (req, res) => {
    Song.find({ shopid: req.params.shopid })
        .select("shopid title artist img")
        .then(docs => {
            const response = {
                count: docs.length,
                songs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        shop: doc.shopid,
                        title: doc.title,
                        artist: doc.artist,
                        img: doc.img,
                        request: {
                            type: "GET",
                            url: "http://" + req.headers.host + "/songs/detail/" + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.song_get = (req, res) => {
    Song.findById({ _id: req.params.songid })
        .then(doc => {
            res.status(200).json({
                song: doc,
                request: {
                    type: "GET",
                    url: "http://" + req.headers.host + "/songs/" + doc.shopid
                }
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.song_delete = (req, res) => {
    Song.remove({ _id: req.params.songid })
    .then(() => {
        Song.find({ shopid: req.params.shopid })
        .select("shopid title artist img")
        .then(docs => {
            const response = {
                count: docs.length,
                songs: docs.map(doc => {
                    return {
                        _id: doc._id,
                        shop: doc.shopid,
                        title: doc.title,
                        artist: doc.artist,
                        img: doc.img,
                        request: {
                            type: "GET",
                            url: "http://" + req.headers.host + "/songs/detail/" + doc._id
                        }
                    }
                })
            };
            res.status(200).json(response);
        })
    })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.song_search = (req, res) => {
    const keyword = urlencode(req.params.keyword);
    axios.get(`https://itunes.apple.com/search?term=${keyword}&limit=25&entity=song`)
        .then(docs => {
            res.status(200).json(docs.data);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}