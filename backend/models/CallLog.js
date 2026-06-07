import mongoose from 'mongoose';

const CallLogSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  direction: { type: String, enum: ['inbound', 'outbound'], required: true },
  calledBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Or null if AI
  duration: { type: Number, default: 0 }, // in seconds
  status: { 
    type: String, 
    enum: ['completed', 'missed', 'voicemail', 'failed', 'in-progress'],
    default: 'in-progress'
  },
  recording: {
    url: String,
    duration: Number
  },
  transcript: { type: String },
  sentiment: { 
    type: String, 
    enum: ['positive', 'neutral', 'negative', 'unknown'],
    default: 'unknown'
  },
  outcome: { type: String },
  twilioCallSid: { type: String, required: true, unique: true }
}, { 
  timestamps: true 
});

export default mongoose.model('CallLog', CallLogSchema);
