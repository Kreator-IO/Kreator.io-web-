import mongoose from 'mongoose';

const AppointmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  leadId: { type: mongoose.Schema.Types.ObjectId, ref: 'Lead' },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  timezone: { type: String, default: 'UTC' },
  status: { 
    type: String, 
    enum: ['Scheduled', 'Confirmed', 'Completed', 'Cancelled', 'Rescheduled'],
    default: 'Scheduled'
  },
  googleCalendarEventId: { type: String },
  meetingLink: { type: String },
  notes: { type: String },
  reminders: [{
    type: { type: String, enum: ['email', 'sms', 'whatsapp'] },
    sentAt: { type: Date }
  }]
}, { 
  timestamps: true 
});

export default mongoose.model('Appointment', AppointmentSchema);
