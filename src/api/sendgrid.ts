// Node modules
import express from 'express';
import sgMail from '@sendgrid/mail';
import Handlebars from 'handlebars';
import fs from 'fs';
import path from 'path';

import config from '../utils/config';

sgMail.setApiKey(config.sendGrid.apiKey);

const router = express.Router();

// GET - /api/v1/sendgrid
router.get('/', (req, res) => {
  res.json(['😀', '😳', '🙄']);
});

// POSY - /api/v1/sendgrid/send-mail
router.post('/send-mail', (req, res) => {
  const from: string = config.sendGrid.fromAddress;
  const {
    to,
    subject,
    message,
    useTemplate,
    templateReplacements,
  } = req.body;

  if (useTemplate && !config.templates[useTemplate]) res.status(422).json({
    message: 'Template not found'
  })

  let email = {
    to,
    from,
    subject,
    text: message,
    html: `<strong>${message}</strong>`,
  };
  if (useTemplate) {
    const {
      fileName,
      config: replacements,
      subject: templateSubject
    } = config.templates[useTemplate];
    const buffer = fs.readFileSync(path.join(config.templateDirectory, fileName));
    const fileContent = buffer.toString();
    const template = Handlebars.compile(fileContent);
    const content = template({ ...replacements, ...templateReplacements });

    email = {
      ...email,
      subject: templateSubject ? templateSubject : subject,
      text: content,
      html: content,
    };
  }

  sgMail
    .send(email)
    .then(() => {
      res.json({
        message: "[SEND GRID]: Email Sent."
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "[SEND GRID]: Email Send Failed.",
        error,
      });
      console.error(error);
    });
});

export default router;
