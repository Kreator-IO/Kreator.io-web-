import express from 'express';
import Joi from 'joi';
import Task from '../models/Task.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';
import validate from '../middlewares/validate.js';

const router = express.Router();

router.use(authMiddleware);

const taskSchema = Joi.object({
  title: Joi.string().required(),
  description: Joi.string().allow('', null),
  project: Joi.string().allow('', null),
  assignedTo: Joi.string().allow('', null),
  status: Joi.string().valid('Todo', 'InProgress', 'Review', 'Done'),
  priority: Joi.string().valid('Low', 'Medium', 'High', 'Critical'),
  dueDate: Joi.date().allow('', null)
});

// GET /api/tasks - List tasks (filtered by user if Team role)
router.get('/', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const filters = {};
    if (req.query.status) filters.status = req.query.status;
    if (req.query.project) filters.project = req.query.project;
    
    // If the user is just a Team member, only show their tasks
    if (req.user.role === 'Team') {
      filters.assignedTo = req.user._id;
    } else if (req.query.assignedTo) {
      filters.assignedTo = req.query.assignedTo;
    }

    const tasks = await Task.find(filters)
      .populate('project', 'name')
      .populate('assignedTo', 'name email')
      .populate('createdBy', 'name')
      .sort({ dueDate: 1, createdAt: -1 });

    res.json({ success: true, count: tasks.length, data: tasks });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// GET /api/tasks/stats
router.get('/stats', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const filters = {};
    if (req.user.role === 'Team') {
      filters.assignedTo = req.user._id;
    }

    const totalTasks = await Task.countDocuments(filters);
    const completedTasks = await Task.countDocuments({ ...filters, status: 'Done' });
    const inProgressTasks = await Task.countDocuments({ ...filters, status: 'InProgress' });
    const todoTasks = await Task.countDocuments({ ...filters, status: 'Todo' });
    const reviewTasks = await Task.countDocuments({ ...filters, status: 'Review' });
    
    // Count overdue tasks (dueDate in past, not done)
    const overdueTasks = await Task.countDocuments({
      ...filters,
      status: { $ne: 'Done' },
      dueDate: { $lt: new Date() }
    });

    res.json({
      success: true,
      data: {
        total: totalTasks,
        todo: todoTasks,
        inProgress: inProgressTasks,
        review: reviewTasks,
        completed: completedTasks,
        overdue: overdueTasks
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/tasks
router.post('/', roleMiddleware('Admin', 'Manager'), validate(taskSchema), async (req, res) => {
  try {
    const taskData = { ...req.body, createdBy: req.user._id };
    const task = await Task.create(taskData);
    
    const populatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    res.status(201).json({ success: true, data: populatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// PUT /api/tasks/:id
router.put('/:id', roleMiddleware('Admin', 'Manager', 'Team'), async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });

    // Team members can only update status of their own tasks
    if (req.user.role === 'Team') {
      if (task.assignedTo.toString() !== req.user._id.toString()) {
        return res.status(403).json({ success: false, error: 'Not authorized' });
      }
      // They can only update the status
      task.status = req.body.status || task.status;
      await task.save();
    } else {
      // Admins/Managers can update anything
      Object.assign(task, req.body);
      await task.save();
    }

    const updatedTask = await Task.findById(task._id)
      .populate('project', 'name')
      .populate('assignedTo', 'name email');

    res.json({ success: true, data: updatedTask });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// DELETE /api/tasks/:id
router.delete('/:id', roleMiddleware('Admin', 'Manager'), async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) return res.status(404).json({ success: false, error: 'Task not found' });
    res.json({ success: true, data: {} });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

export default router;
