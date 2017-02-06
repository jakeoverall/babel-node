import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String }
},
  { toJSON: { virtuals: true } });

schema.virtual('categories', {
  ref: models.store,
  localField: 'name',
  foreignField: 'store'
})


module.exports = mongoose.model(models.store, schema);
