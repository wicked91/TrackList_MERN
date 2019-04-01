var addSong = function (req, res) {
	console.log("addSong ACCESS");
	
	var paramTitle = req.body.title || req.query.title;
	var paramArtist = req.body.artist || req.query.artist;
	var paramImg = req.body.img || req.query.img;
	var paramId = req.body.id || req.query.id;

	console.log('[addSong][Request Parameter] : %s, %s, %s, %s', paramTitle, paramArtist, paramImg, paramId)

	var database = req.app.get('database');

	if (database.db) {

		var song = new database.songModel({
			shopid: paramId,
			title: paramTitle,
			artist: paramArtist,
			img: paramImg
		});

		song.savesong(function (err) {
			if (err) {
				console.log(err);
				return;
			}
			console.log("Song add Success.");
			res.end();
		})
		
	} else {
		console.log('Database Connect Fail');
		res.end();
	}
};

var removeSong = function (req, res) {
	console.log("removeSong access");

	var paramTitle = req.body.title || req.query.title;
	var paramArtist = req.body.artist || req.query.artist;
	var paramImg = req.body.img || req.query.img;
	var paramId = req.body.id || req.query.id;

	console.log('[removeSong][Request Parameter] : %s, %s, %s, %s', paramTitle, paramArtist, paramImg, paramId);

	var database = req.app.get('database');

	if (database.db) {
		database.songModel.removesong(paramId, paramTitle, paramArtist, paramImg, function (err, results) {
			if (err) {
				console.log(err);
				res.end();
				return;
			}
			console.log(paramId + " " + paramArtist + "Remove Success");
			res.end();
		});
	}
}

var showList = function (req, res) {

	console.log("showList ACCESS");

	var paramId = req.params.paramId;
	console.log('[showList][Request Parameter] : %s', paramId);
		
	var database = req.app.get('database');

	if (database.db) {
		database.songModel.list(paramId, function (err, results) {
			if (err) {
				console.log(err);
				return;
			}
			if (results) {
				res.send(results);
			}
		});
	} else {
		console.log('Database Connect Fail');
		res.end();
	}
};

module.exports.addSong = addSong;
module.exports.removeSong = removeSong;
module.exports.showList = showList;