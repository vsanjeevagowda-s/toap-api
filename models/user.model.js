const mongoose = require('mongoose');
const { ACCOUNT_STATUS } = require('../config/constants');

const { Schema } = mongoose;

const uesrSchema = new Schema({
  email: {
    type: String, unique: true, required: true, lowercase: true,
  },
  user_role: { type: String, required: true },
  password: { type: String, required: false },
  created_date: { type: Date, default: Date.now },
  otp : {type: String}
});

uesrSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('User', uesrSchema);
