const mongoose = require("mongoose");

const shopSchema = mongoose.Schema({
	shopname: { type: String, required: true, 'default': '' },
	address: { type: String, required: true, 'default': ''},
	created_at: { type: Date, index: { unique: false }, 'default': Date.now },
	updated_at: { type: Date, index: { unique: false }, 'default': Date.now }
});

module.exports = mongoose.model("Shop", shopSchema);

