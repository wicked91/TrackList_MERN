const SchemaSong = {};

SchemaSong.createSchema = function (mongoose) {

    const SongSchema = mongoose.Schema({
        shopid: {type: String},
        title: { type: String },
        artist: { type: String },
        img: { type: String },
        created_at: { type: Date, index: { unique: false }, 'default': Date.now },
        updated_at: { type: Date, index: { unique: false }, 'default': Date.now }
    });

    return SongSchema;
};

module.exports = SchemaSong;

