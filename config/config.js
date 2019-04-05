module.exports = {
    server_port: 5000,
    db_schemas: [
        { file: './shop_schema', collection: 'shops', schemaName: 'shopSchema', modelName: 'shopModel' },
        { file: './song_schema', collection: 'songs', schemaName: 'songSchema', modelName: 'songModel' }
    ],
    route_info: [
        { file: './makeShop', path: '/process/addShop/:shopname', method: 'addShop', type: 'get' },
        { file: './makeShop', path: '/process/shopList/:shopname', method: 'shopList', type: 'get' },
        { file: './makeSong', path: '/process/addSong', method: 'addSong', type: 'post' },
        { file: './makeSong', path: '/process/removeSong', method: 'removeSong', type: 'post' },
        { file: './makeSong', path: '/process/showList/:paramId', method: 'showList', type: 'get' }
    ]
}