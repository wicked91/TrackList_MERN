const mongoose = require("mongoose");

const songSchema = mongoose.Schema({
    shopid: {type: mongoose.Schema.Types.ObjectId, ref: "Shop",  required: true},
    title: { type: String },
    artist: { type: String },
    img: { type: String },
    created_at: { type: Date, index: { unique: false }, 'default': Date.now },
    updated_at: { type: Date, index: { unique: false }, 'default': Date.now }
});

module.exports = mongoose.model("Song", songSchema);

