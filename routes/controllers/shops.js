const Shop = require("../../models/shop");

exports.register = (req, res) => {
    Shop.find({ shopname: req.body.shopname })
        .then(shop => {
            if (shop.length >= 1) {
                return res.status(409).json({
                    message: "Shopname exists"
                });
            } else {
                const shop = new Shop({
                    shopname: req.body.shopname,
                    address: req.body.address
                });
                shop.save()
                    .then(result => {
                        res.status(201).json({
                            message: "Shop register success",
                            registeredShop: {
                                shopname: result.shopname,
                                address: result.address,
                                created_at: result.created_at,
                                updated_at: result.updated_at,
                                request: {
                                    type: "GET",
                                    url: "http://" + req.headers.host + "/shops/" + result._id
                                }
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
        })
}

exports.shop_get_all = (req, res) => {
    Shop.find()
        .select("shopname address")
        .then(docs => {
            const response = {
                count: docs.length,
                shops: docs.map(doc => {
                    return {
                        _id: doc._id,
                        shopname: doc.shopname,
                        address: doc.address,
                        request: {
                            type: "GET",
                            url: "http://" + req.headers.host + "/shops/" + doc._id
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

exports.shop_get_search = (req, res) => {
    const criteria = { shopname : { $regex: req.params.shopname } } || {};
    Shop.find(criteria)
    .select("_id shopname address")
    .then(docs => {
        const response = {
            count: docs.length,
            shops: docs.map(doc => {
                return {
                    _id: doc._id,
                    shopname: doc.shopname,
                    address: doc.address,
                    request: {
                        type: "GET",
                        url: "http://" + req.headers.host + "/shops/" + doc._id
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

exports.shop_get = (req, res) => {
    Shop.findById({ _id: req.params.shopId })
        .then(doc => {
            if (doc) {
                res.status(200).json({
                    shop: doc,
                    request: {
                        type: "GET",
                        url: "http://" + req.headers.host + "/shops/"
                    }
                });
            } else {
                res.status(404).json({
                    message: "No valid entry found for provided ID"
                });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}
