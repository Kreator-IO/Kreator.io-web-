import mongoose from 'mongoose';

const LeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  phone: { type: String, trim: true },
  company: { type: String, trim: true },
  source: { 
    type: String, 
    enum: ['Website', 'LinkedIn', 'Referral', 'Direct', 'WhatsApp', 'AI Call', 'Other'],
    default: 'Website'
  },
  status: { 
    type: String, 
    enum: ['New', 'Contacted', 'Qualified', 'Negotiation', 'Won', 'Lost'],
    default: 'New'
  },
  value: { type: Number, default: 0 },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  notes: [{
    text: String,
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  activities: [{
    type: { type: String }, // e.g., 'call', 'email', 'status_change'
    description: String,
    createdAt: { type: Date, default: Date.now }
  }],
  tags: [String],
  priority: { 
    type: String, 
    enum: ['Hot', 'Warm', 'Cold'],
    default: 'Warm'
  },
  lastContactedAt: { type: Date },
  nextFollowUp: { type: Date },
  convertedAt: { type: Date },
}, { 
  timestamps: true 
});

export default mongoose.model('Lead', LeadSchema);
