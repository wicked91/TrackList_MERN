module.exports = {
    server_port: 5000,
    db_schemas: [
        { file: './shopSchema', collection: 'shops', schemaName: 'shop_Schema', modelName: 'shopModel' },
        { file: './songSchema', collection: 'songs', schemaName: 'song_Schema', modelName: 'songModel' }
    ],
    route_info: [
        { file: './shop', path: '/process/addShop/:shopname', method: 'addShop', type: 'get' },
        { file: './shop', path: '/process/shopList/:shopname', method: 'shopList', type: 'get' },
        { file: './song', path: '/process/addSong', method: 'addSong', type: 'post' },
        { file: './song', path: '/process/removeSong/:shopId/:songId', method: 'removeSong', type: 'delete' },
        { file: './song', path: '/process/trackList/:paramId', method: 'trackList', type: 'get' },
        { file: './search', path: '/process/search/:keyword', method: 'search', type: 'get' }
    ]
}