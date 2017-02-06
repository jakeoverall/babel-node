import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Relations
  categories: [{ type: ObjectId, ref: models.category }],
  products: [{ type: ObjectId, ref: models.product }]
});


module.exports = mongoose.model(models.store, schema);
