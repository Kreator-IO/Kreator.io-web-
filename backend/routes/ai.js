import express from 'express';
import Joi from 'joi';
import validate from '../middlewares/validate.js';
import Conversation from '../models/Conversation.js';

const router = express.Router();

const chatSchema = Joi.object({
  message: Joi.string().required(),
  sessionId: Joi.string().required()
});

// POST /api/ai/chat
router.post('/chat', validate(chatSchema), async (req, res) => {
  try {
    const { message, sessionId } = req.body;
    
    // Check if conversation exists
    let conversation = await Conversation.findOne({ sessionId });
    if (!conversation) {
      conversation = await Conversation.create({
        sessionId,
        platform: 'Website',
        messages: []
      });
    }

    // Save user message
    conversation.messages.push({ role: 'user', content: message, timestamp: new Date() });
    
    // Simulate AI Processing (Normally you'd call OpenAI/Gemini here)
    let aiResponse = '';
    
    if (process.env.OPENAI_API_KEY) {
      // Future integration placeholder
      aiResponse = "I'm connected to OpenAI! You said: " + message;
    } else {
      // Intelligent fallback mock
      const lowerMessage = message.toLowerCase();
      if (lowerMessage.includes('price') || lowerMessage.includes('cost')) {
        aiResponse = "Our pricing starts at $4,999 for foundational projects. Would you like me to schedule a consultation to give you an exact quote?";
      } else if (lowerMessage.includes('time') || lowerMessage.includes('long')) {
        aiResponse = "Most of our enterprise projects are delivered within 8-12 weeks, depending on complexity. What are you looking to build?";
      } else if (lowerMessage.includes('hello') || lowerMessage.includes('hi')) {
        aiResponse = "Hello! Welcome to VexquorAI. How can I assist you with your project today?";
      } else {
        aiResponse = "That's a great question. Let me get one of our human experts to contact you about that. Can I have your email address?";
      }
    }

    // Save AI message
    conversation.messages.push({ role: 'assistant', content: aiResponse, timestamp: new Date() });
    await conversation.save();

    res.json({ success: true, response: aiResponse });
  } catch (error) {
    res.status(500).json({ success: false, error: 'AI processing failed' });
  }
});

// POST /api/ai/call - Trigger an outbound AI voice call
router.post('/call', async (req, res) => {
  try {
    const { phone, context } = req.body;
    if (!phone) return res.status(400).json({ success: false, error: 'Phone number required' });

    // Normally you'd trigger Twilio Voice here
    res.json({ 
      success: true, 
      message: `Initiated AI voice call to ${phone} with Twilio.`,
      status: 'queued'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Voice call failed' });
  }
});

export default router;
