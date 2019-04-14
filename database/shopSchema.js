const Schema = {};

Schema.createSchema = function (mongoose) {

	const ShopSchema = mongoose.Schema({
		shopname: { type: String, required: true, 'default': '' },
		created_at: { type: Date, index: { unique: false }, 'default': Date.now },
		updated_at: { type: Date, index: { unique: false }, 'default': Date.now }
	});

	return ShopSchema;
};

module.exports = Schema;

