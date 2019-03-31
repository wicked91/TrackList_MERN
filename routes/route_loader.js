var route_loader = {};
var config = require('../config/config');

route_loader.init = function (app, router) {
    console.log('route_loader starting');
    return initRoutes(app, router);
}

function initRoutes(app, router) {

    var infoLen = config.route_info.length;

    for (var i = 0; i < infoLen; i++) {
        var curItem = config.route_info[i];
        var curModule = require(curItem.file);

        if (curItem.type == 'get') {
            router.get(curItem.path, curModule[curItem.method]);
        } else if (curItem.type == 'post') {
            router.post(curItem.path, curModule[curItem.method]);
        } else {
            router.post(curItem.path, curModule[curItem.method]);
        }
        console.log('Routing Module [%s] SET', curItem.method);
    }

    app.use('/', router);
}
module.exports = route_loader;