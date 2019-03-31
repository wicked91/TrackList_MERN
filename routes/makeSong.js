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

		song.savesong(function (err, result) {
			if (err) {
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
				return;
			}
			console.log("Song add Success.");
			res.end();
		})
		
	} else {
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>database connect failed</h2>');
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
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>응답 웹문서 생성 중 에러 발생</h2>');
				res.write('<p>' + err.stack + '</p>');
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
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<h2>ShowList Database ERROR</h2>');
				res.write('<p>' + err.stack + '</p>');
				res.end();
				return;
			}
			if (results) {
				res.send(results);
			}
		});
	} else {
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>Database Connect Fail</h2>');
		res.end();
	}
};

module.exports.addSong = addSong;
module.exports.removeSong = removeSong;
module.exports.showList = showList;