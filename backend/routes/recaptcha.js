import express from 'express';
import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';
import config from '../config/index.js';

const router = express.Router();
const client = new RecaptchaEnterpriseServiceClient();

router.post('/verify', async (req, res, next) => {
  try {
    const { token, action } = req.body;

    if (!token || !action) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA token and action are required.',
      });
    }

    const projectPath = client.projectPath(config.recaptcha.projectId);
    const [assessment] = await client.createAssessment({
      parent: projectPath,
      assessment: {
        event: {
          token,
          siteKey: config.recaptcha.siteKey,
        },
      },
    });

    if (!assessment.tokenProperties?.valid) {
      return res.status(400).json({
        success: false,
        error: 'Invalid reCAPTCHA token.',
        invalidReason: assessment.tokenProperties?.invalidReason,
      });
    }

    if (assessment.tokenProperties.action !== action) {
      return res.status(400).json({
        success: false,
        error: 'reCAPTCHA action mismatch.',
      });
    }

    const score = assessment.riskAnalysis?.score ?? 0;
    const reasons = assessment.riskAnalysis?.reasons || [];

    if (score < config.recaptcha.minScore) {
      return res.status(403).json({
        success: false,
        error: 'reCAPTCHA risk score is too low.',
        score,
        reasons,
      });
    }

    return res.json({
      success: true,
      score,
      reasons,
    });
  } catch (error) {
    return next(error);
  }
});

export default router;
