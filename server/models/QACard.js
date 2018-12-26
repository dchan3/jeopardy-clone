const mongoose = require('mongoose'), Schema = mongoose.Schema;

const QACardSchema = new Schema({
  question: {
    type: String,
    required: [true, 'Question required']
  },
  answer: {
    type: String,
    required: [true, 'Answer required.']
  },
  difficulty: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  }
});

module.exports = QACardSchema;
