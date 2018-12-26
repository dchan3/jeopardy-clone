const mongoose = require('mongoose'), Schema = mongoose.Schema,
  QACardSchema = require('./QACard'),
  u = require('underscore');

const CategorySchema = new Schema({
  cards: {
    type: [QACardSchema],
    required: true,
    validate: {
      validator: function (val) {
        return u.uniq(u.pluck(val, 'difficulty')).length === 5;
      },
      message: 'Category must contain at least one of each difficulty level.'
    }
  },
  name: {
    type: String,
    required: true
  }
});

module.exports = CategorySchema;
