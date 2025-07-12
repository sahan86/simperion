const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const referralSchema = new Schema({
  job: { type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true },
  referrer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  candidate_name: { type: String, required: true },
  candidate_email: { type: String, required: true },
  status: { type: String, required: true, enum: ['pending', 'accepted', 'rejected'], default: 'pending' },
}, {
  timestamps: true,
});

const Referral = mongoose.model('Referral', referralSchema);

module.exports = Referral;
