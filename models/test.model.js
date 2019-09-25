const mongoose = require('mongoose');
const { Schema } = mongoose;
const { TEST_STATUS } = require('../config/constants');
const { DRAFT } = TEST_STATUS;

const questionOptionSchema = new Schema({
  title: {
    type: String,
    required: true,
  }
});

questionOptionSchema.set('toJSON', { virtuals: true });

const questionSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  options: [questionOptionSchema],
  answer: { type: String, required: true }
});

questionSchema.set('toJSON', { virtuals: true });

const testSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  time_limit: { type: String, default: 'no limit' },
  status: { type: String, default: DRAFT },
  created_date: { type: Date, default: Date.now },
  questions: [questionSchema]
});

testSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Test', testSchema);
