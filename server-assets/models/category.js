import { models } from '../config/constants'
import store from './store'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Relations
  storeId: { type: ObjectId, ref: models.store, required: true },
  products: {
    type: Object,
    product: { type: ObjectId, ref: models.product }
  }
});

schema.pre('save', function (next) {
  store.findByIdAndUpdate(this._doc.storeId, {
    $addToSet: {
      categories: this._doc._id
    }
  })
    .then(next)
    .catch(() => {
      next(new Error('ERROR: INVALID STOREID'))
    })
})

module.exports = mongoose.model(models.category, schema);
