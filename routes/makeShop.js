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
                console.log(err);
				return;
            }
            console.log("Shop add Success.");
            res.end();
        });
    } else {
		console.log('Database Connect Fail');
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
                console.log(err);
				return;
            }
			if (results) {
                res.send(results);
			}else{
                res.end();
            }
		});

	} else {
		console.log('Database Connect Fail');
		res.end();
	}
};

module.exports.addShop = addShop;
module.exports.shopList = shopList;