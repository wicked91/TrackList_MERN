const addShop = (req, res) => {

    const paramShopname = req.params.shopname;
    console.log('[addShop][Request Parameter] : %s', paramShopname);

    const database = req.app.get('database');

    if (database.db) {

        database.shopModel.findOne({ shopname: paramShopname }).then(shop => {
            if (shop) {
                return res.status(400).json("Shop Name already exists");
            } else {
                const newShop = new database.shopModel({
                    shopname: paramShopname
                });

                newShop.save().then(res.json({ msg: "Shop add Success" }))
                    .catch(err => {res.json({ msg: "Shop add Fail", error: err })
                });
            }
        });
    } else {
        console.log('Database Connect Fail');
        res.end();
    }
};


const shopList = (req, res) => {
    const paramShopname = req.params.shopname;
    console.log('[shopList][Request Parameter] : %s', paramShopname);

    const database = req.app.get('database');

    if (database.db) {

        const criteria = {'shopname' : {$regex: paramShopname}} || {};
        database.shopModel.find(criteria)
            .then(results =>{res.json({results : results, msg : "Shop search Success"})});

    } else {
        console.log('Database Connect Fail');
        res.end();
    }
};

module.exports.addShop = addShop;
module.exports.shopList = shopList;