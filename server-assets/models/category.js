import { models } from '../config/constants'
let mongoose = require('mongoose')
let ObjectId = mongoose.Schema.ObjectId

var schema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  // Relations
  store: { type: ObjectId, ref: models.store },
  products: [{ type: ObjectId, ref: models.products }]
});

module.exports = mongoose.model(models.category, schema);
