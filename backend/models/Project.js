import mongoose from 'mongoose';

const ProjectSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  client: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  manager: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  team: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  status: { 
    type: String, 
    enum: ['Planning', 'Active', 'OnHold', 'Completed'],
    default: 'Planning'
  },
  startDate: { type: Date },
  endDate: { type: Date },
  budget: { type: Number },
  progress: { type: Number, default: 0, min: 0, max: 100 }
}, { 
  timestamps: true 
});

export default mongoose.model('Project', ProjectSchema);
