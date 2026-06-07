import mongoose from 'mongoose';

const AutomationRuleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  trigger: { 
    type: String, 
    enum: ['new_lead', 'status_change', 'time_based', 'form_submit'],
    required: true
  },
  conditions: [{
    field: String,
    operator: { type: String, enum: ['equals', 'not_equals', 'contains', 'greater_than', 'less_than'] },
    value: mongoose.Schema.Types.Mixed
  }],
  actions: [{
    type: { type: String, enum: ['send_email', 'send_whatsapp', 'create_task', 'assign_lead', 'ai_call'] },
    config: mongoose.Schema.Types.Mixed
  }],
  isActive: { type: Boolean, default: true },
  runCount: { type: Number, default: 0 },
  lastRunAt: { type: Date },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { 
  timestamps: true 
});

export default mongoose.model('AutomationRule', AutomationRuleSchema);
