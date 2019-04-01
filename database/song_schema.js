var SchemaSong = {};

SchemaSong.createSchema = function (mongoose) {

    var SongSchema = mongoose.Schema({
        shopid: { type: String, 'default': '' },
        title: { type: String, 'default': '' },
        artist: { type: String, 'default': '' },
        img: { type: String, 'default': '' },
        created_at: { type: Date, index: { unique: false }, 'default': Date.now },
        updated_at: { type: Date, index: { unique: false }, 'default': Date.now }
    });

    SongSchema.path('shopid').required(true);
    SongSchema.path('title').required(true);
    SongSchema.path('artist').required(true);

    SongSchema.methods = {
        savesong: function (callback) {
            var self = this;
            this.validate(function (err) {
                if (err) return callback(err);
                self.save(callback);
            });
        }
    }

    SongSchema.statics = {
        load: function (id, callback) {
            this.findOne({ _id: id })
                .exec(callback);
        },
        list: function (id, callback) {
            this.find({ 'shopid': id })
                .exec(callback);
        },
        removesong: function (id, title, artist, img, callback) {
            this.findOneAndRemove({ 'shopid': id, 'title': title, 'artist': artist, 'img': img })
                .exec(callback);
        }
    }

    return SongSchema;
};

module.exports = SchemaSong;

