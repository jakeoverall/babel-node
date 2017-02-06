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
	let product = this
	store.findById(this._doc.storeId)
		.then(store => {
			console.log('A VALID STORE FOUND', store)
			console.log('VALIDATING CATEGORY ID', this._doc.categoryId)
			category.findById(product._doc.categoryId).then(cat => {
				if (!cat.products.find(p => { return p == this._doc._id })) {
					cat.products.push(product)
				}
				cat.save().then(() => {
					if (!store.products.find(p => { return p == this._doc._id })) {
						store.products.push(product)
					}
					store.save()
					next()
				})
			}).catch(() => next(new Error('ERROR: AN ERROR OCCURRED, UNABLE TO FIND CATEGORY')))
		})
		.catch(() => {
			next(new Error('ERROR: AN ERROR OCCURRED, UNABLE TO FIND STORE'))
		})
})

module.exports = mongoose.model(models.product, schema);
