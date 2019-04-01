var Schema = {};

Schema.createSchema = function (mongoose) {

	var ShopSchema = mongoose.Schema({
		shopname: { type: String, 'default': '' },
		created_at: { type: Date, index: { unique: false }, 'default': Date.now },
		updated_at: { type: Date, index: { unique: false }, 'default': Date.now }
	});

	ShopSchema.path('shopname').required(true);

	ShopSchema.methods = {
		saveshop: function (callback) {
			var self = this;
			this.validate(function (err) {
				if (err) return callback(err);
				self.save(callback);
			});
		}
	}

	ShopSchema.statics = {
		load: function (id, callback) {
			this.findOne({ _id: id })
				.exec(callback);
		},
		list: function (options, callback) {
			var criteria = {'shopname' : {$regex: options}} || {};

			this.find(criteria)
				.sort({ 'created_at': -1 })
				.exec(callback);
		}
	}

	return ShopSchema;
};

module.exports = Schema;

