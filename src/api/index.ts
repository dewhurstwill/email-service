// Node Modules
import express from 'express';

// Importing the sendgrid route
import sendgrid from './sendgrid';

const router = express.Router();

// GET - /api/v1/
router.get('/', (req, res) => {
  res.json({
    message: 'API - 👋🌎🌍🌏'
  });
});

// Consuming the sendgrid route
router.use('/sendgrid', sendgrid);

export default router;
