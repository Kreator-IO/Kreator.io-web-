import express from 'express';
import Joi from 'joi';
import Project from '../models/Project.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

// Apply authentication to all project routes
router.use(authMiddleware);

const projectSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().allow('', null),
  client: Joi.string().allow('', null),
  manager: Joi.string().allow('', null),
  status: Joi.string().valid('Planning', 'Active', 'OnHold', 'Completed'),
  startDate: Joi.date().allow('', null),
  endDate: Joi.date().allow('', null),
  budget: Joi.number().min(0).allow('', null),
  progress: Joi.number().min(0).max(100)
});

// GET /api/projects
router.get('/', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const projects = await Project.find({})
      .populate('client', 'name email')
      .populate('manager', 'name email')
      .sort({ createdAt: -1 });

    res.json({ success: true, count: projects.length, data: projects });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/projects
router.post('/', roleMiddleware('Admin', 'Manager'), validate(projectSchema), async (req, res) => {
  try {
    const project = await Project.create(req.body);
    res.status(201).json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET /api/projects/:id
router.get('/:id', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
      .populate('client', 'name email')
      .populate('manager', 'name email')
      .populate('team', 'name email');
      
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// PUT /api/projects/:id
router.put('/:id', roleMiddleware('Admin', 'Manager'), validate(projectSchema), async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: project });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// DELETE /api/projects/:id
router.delete('/:id', roleMiddleware('Admin'), async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id);
    if (!project) return res.status(404).json({ success: false, error: 'Project not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
