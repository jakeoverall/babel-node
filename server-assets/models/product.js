import { models } from '../config/constants'
import store from './store'
import category from './category'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
	name: { type: String, required: true },
	description: { type: String },
	price: { type: Number },
	// Relations
	storeId: { type: ObjectId, ref: models.store, required: true },
	categoryId: { type: ObjectId, ref: models.category, required: true },
	similarProducts: [{ type: ObjectId, ref: models.product }]
});

schema.pre('save', function (next) {

	let errorHandler = (next) => {
		next(new Error('ERROR: AN ERROR OCCURRED'))
	}

	let product = this
	Promise.all([
		store.findByIdAndUpdate(product._doc.storeId, {
			$addToSet: {
				categories: product._doc._id
			}
		}).catch(errorHandler),
		category.findByIdAndUpdate(product._doc.categoryId, {
			$addToSet: {
				categories: product._doc._id
			}
		}).catch(errorHandler)
	])
		.then(next)
		.catch(errorHandler)

})

module.exports = mongoose.model(models.product, schema);
