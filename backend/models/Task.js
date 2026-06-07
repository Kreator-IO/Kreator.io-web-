import mongoose from 'mongoose';

const TaskSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  project: { type: mongoose.Schema.Types.ObjectId, ref: 'Project' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  status: { 
    type: String, 
    enum: ['Todo', 'InProgress', 'Review', 'Done'],
    default: 'Todo'
  },
  priority: { 
    type: String, 
    enum: ['Low', 'Medium', 'High', 'Critical'],
    default: 'Medium'
  },
  dueDate: { type: Date },
  reminder: {
    enabled: { type: Boolean, default: false },
    reminderDate: { type: Date }
  },
  tags: [String],
  attachments: [{
    name: String,
    url: String
  }],
  comments: [{
    text: String,
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    createdAt: { type: Date, default: Date.now }
  }],
  completedAt: { type: Date }
}, { 
  timestamps: true 
});

export default mongoose.model('Task', TaskSchema);
