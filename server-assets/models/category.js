import { models } from '../config/constants'
import store from './store'

let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Relations
  storeId: { type: ObjectId, ref: models.store, required: true },
  products: [{ type: ObjectId, ref: models.product }]
});

schema.pre('save', function (next) {
  console.log(this)
  store.findById(this._doc.storeId)
    .then(store => {
      console.log('A VALID STORE FOUND', store)
      if(!store.categories.find(c => {c == this._doc._id})){
        store.save().then(next)
      }else{
        consle.log('CATEGORY ALREADY IN STORE')
        next()
      }
    })
    .catch(() => {
      next(new Error('ERROR: INVALID STOREID'))
    })
})

module.exports = mongoose.model(models.category, schema);
