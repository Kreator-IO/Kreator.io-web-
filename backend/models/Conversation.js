import mongoose from 'mongoose';

const ConversationSchema = new mongoose.Schema({
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead', required: true },
  channel: { 
    type: String, 
    enum: ['email', 'whatsapp', 'sms', 'call', 'chat'],
    required: true
  },
  messages: [{
    sender: { type: String, enum: ['system', 'user', 'lead', 'ai'] },
    content: { type: String },
    timestamp: { type: Date, default: Date.now },
    read: { type: Boolean, default: false },
    metadata: { type: mongoose.Schema.Types.Mixed } // For channel-specific IDs, attachments, etc.
  }],
  status: { 
    type: String, 
    enum: ['active', 'closed'],
    default: 'active'
  },
  assignedAgent: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  timestamps: true 
});

export default mongoose.model('Conversation', ConversationSchema);
