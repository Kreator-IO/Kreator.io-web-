import express from 'express';
import Joi from 'joi';
import Lead from '../models/Lead.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

// Apply authentication to all lead routes
router.use(authMiddleware);

// Validation schemas
const leadSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().allow('', null),
  company: Joi.string().allow('', null),
  source: Joi.string().valid('Website', 'LinkedIn', 'Referral', 'Direct', 'WhatsApp', 'AI Call', 'Other'),
  status: Joi.string().valid('New', 'Contacted', 'Qualified', 'Negotiation', 'Won', 'Lost'),
  value: Joi.number().min(0),
  priority: Joi.string().valid('Hot', 'Warm', 'Cold'),
  assignedTo: Joi.string().allow('', null)
});

// GET /api/leads - List all leads
router.get('/', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.source) filters.source = req.query.source;
    if (req.query.priority) filters.priority = req.query.priority;

    const leads = await Lead.find(filters)
      .populate('assignedTo', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: leads.length, data: leads });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET /api/leads/pipeline - Group leads by status for Kanban board
router.get('/pipeline', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const leads = await Lead.find({}).sort({ updatedAt: -1 });
    
    const pipeline = {
      New: leads.filter(l => l.status === 'New'),
      Contacted: leads.filter(l => l.status === 'Contacted'),
      Qualified: leads.filter(l => l.status === 'Qualified'),
      Negotiation: leads.filter(l => l.status === 'Negotiation'),
      Won: leads.filter(l => l.status === 'Won'),
      Lost: leads.filter(l => l.status === 'Lost')
    };

    res.json({ success: true, data: pipeline });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET /api/leads/stats - Summary statistics
router.get('/stats', roleMiddleware('Admin', 'Manager'), async (req, res) => {
  try {
    const totalLeads = await Lead.countDocuments();
    const wonLeads = await Lead.countDocuments({ status: 'Won' });
    
    const pipelineValueAgg = await Lead.aggregate([
      { $match: { status: { $in: ['New', 'Contacted', 'Qualified', 'Negotiation'] } } },
      { $group: { _id: null, totalValue: { $sum: '$value' } } }
    ]);
    
    const pipelineValue = pipelineValueAgg.length > 0 ? pipelineValueAgg[0].totalValue : 0;
    const conversionRate = totalLeads === 0 ? 0 : ((wonLeads / totalLeads) * 100).toFixed(1);

    res.json({
      success: true,
      data: {
        totalLeads,
        activeLeads: totalLeads - wonLeads - await Lead.countDocuments({ status: 'Lost' }),
        pipelineValue,
        conversionRate
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET /api/leads/:id - Get single lead
router.get('/:id', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const lead = await Lead.findById(req.params.id)
      .populate('assignedTo', 'name email')
      .populate('notes.createdBy', 'name');
    
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/leads - Create lead
router.post('/', roleMiddleware('Admin', 'Manager', 'Team'), validate(leadSchema), async (req, res) => {
  try {
    const lead = await Lead.create({
      ...req.body,
      activities: [{ type: 'created', description: 'Lead created', createdAt: new Date() }]
    });
    
    res.status(201).json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// PUT /api/leads/:id - Update lead
router.put('/:id', roleMiddleware('Admin', 'Manager', 'Team'), validate(leadSchema), async (req, res) => {
  try {
    const oldLead = await Lead.findById(req.params.id);
    if (!oldLead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }

    // Track status change activity
    let newActivity = null;
    if (oldLead.status !== req.body.status) {
      newActivity = {
        type: 'status_change',
        description: `Status changed from ${oldLead.status} to ${req.body.status}`,
        createdAt: new Date()
      };
      
      if (req.body.status === 'Won') req.body.convertedAt = new Date();
    }

    const updateData = { ...req.body };
    if (newActivity) {
      updateData.$push = { activities: newActivity };
    }

    const lead = await Lead.findByIdAndUpdate(req.params.id, updateData, { new: true, runValidators: true });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/leads/:id/notes - Add note
router.post('/:id/notes', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const { text } = req.body;
    if (!text) return res.status(400).json({ success: false, error: 'Note text is required' });

    const lead = await Lead.findByIdAndUpdate(
      req.params.id,
      { 
        $push: { 
          notes: { text, createdBy: req.user._id, createdAt: new Date() }
        } 
      },
      { new: true }
    ).populate('notes.createdBy', 'name');

    if (!lead) return res.status(404).json({ success: false, error: 'Lead not found' });
    res.json({ success: true, data: lead });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// DELETE /api/leads/:id - Delete lead
router.delete('/:id', roleMiddleware('Admin', 'Manager'), async (req, res) => {
  try {
    const lead = await Lead.findByIdAndDelete(req.params.id);
    if (!lead) {
      return res.status(404).json({ success: false, error: 'Lead not found' });
    }
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
