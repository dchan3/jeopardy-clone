const mongoose = require('mongoose'), Schema = mongoose.Schema,
  CategorySchema = require('./Category');

const BoardSchema = new Schema({
  categories: {
    type: [CategorySchema],
    required: true,
    validate: {
      validator: (val) => val.length === 5
    }
  }
});

module.exports = mongoose.model('Board', BoardSchema);
