import express from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import roleMiddleware from '../middlewares/roleMiddleware.js';

const router = express.Router();
router.use(authMiddleware);

// GET /api/billing/invoices
router.get('/invoices', async (req, res) => {
  try {
    // Mock invoices since we don't have a Stripe or Invoice schema yet
    const invoices = [
      { id: 'INV-001', amount: 4999, status: 'Paid', date: new Date(Date.now() - 864000000) },
      { id: 'INV-002', amount: 2500, status: 'Pending', date: new Date() }
    ];
    res.json({ success: true, data: invoices });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Server Error' });
  }
});

// POST /api/billing/pay
router.post('/pay', async (req, res) => {
  res.json({ success: true, url: 'https://checkout.stripe.com/mock-session' });
});

export default router;
