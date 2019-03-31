var addShop = function (req, res) {

    var paramShopname = req.params.shopname;
    console.log('[addShop][Request Parameter] : %s', paramShopname);

    var database = req.app.get('database');

    if (database.db) {

        var shop = new database.shopModel({
            shopname: paramShopname
        });

        shop.saveshop(function (err) {
            if (err) {
                res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
                res.write('<p>' + err.stack + '</p>');
                res.end();
                return;
            }

            console.log("Shop add Success.");
            res.end();
        });

    } else {
        res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
        res.write('<h2>database connect failed</h2>');
        res.end();
    }
};


var shopList = function (req, res) {
    var paramShopname = req.params.shopname;
    console.log('[shopList][Request Parameter] : %s', paramShopname);

    var database = req.app.get('database');

    if (database.db) {
		database.shopModel.list(paramShopname, function (err, results) {
			if (err) {
				res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
				res.write('<p>' + err.stack + '</p>');
				res.end();
				return;
            }
            
			if (results) {
                res.send(results);
			}else{
                res.end();
            }
		});

	} else {
		res.writeHead('200', { 'Content-Type': 'text/html;charset=utf8' });
		res.write('<h2>database connect failed</h2>');
		res.end();
	}
};

module.exports.addShop = addShop;
module.exports.shopList = shopList;