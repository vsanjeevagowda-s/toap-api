const mongoose = require('mongoose');

const { Schema } = mongoose;

const questionOptionSchema = new Schema({
  title: {
    type: String,
  }
});

questionOptionSchema.set('toJSON', { virtuals: true });

const questionSchema = new Schema({
  title: { type: String },
  description: { type: String },
  time_to_complete: { type: String },
  options: [questionOptionSchema],
  answer: { type: String }
});

questionSchema.set('toJSON', { virtuals: true });

const testSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  creator_id: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  created_date: { type: Date, default: Date.now },
  questions: [questionSchema]
});

testSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('Test', testSchema);
