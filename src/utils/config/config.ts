import path from 'path';
import { REQUIRED_VARS as requiredVars } from '../constants';

requiredVars.forEach((variable) => {
  if (!process.env[variable]) {
    console.error(`[Startup Error] ${variable} is a required environment variable`);
    process.exit(1);
  }
});

const config = {
  app: {
    port: parseInt(process.env.PORT) || 5000,
  },
  templateDirectory: path.normalize(path.join(path.dirname(__filename), '..','..', 'templates')),
  templates: {
    sample: {
      fileName: "sample.html",
      config: {
        paragraph1: "", 
        paragraph2: "",
        paragraph3: "",
        paragraph4: "",
        callToActionText: "Go to google",
        callToActionLink: "https://google.com",
      },
    },
    passwordreset: {
      fileName: "passwordreset.html",
      subject: "Password reset",
      config: {
        name: "",
        passwordResetLink: "",
        preheaderText: "Password Reset."
      }
    },
    activate: {
      fileName: "activate.html",
      subject: "Verify your account",
      config: {
        name: "",
        activationLink: "",
        preheaderText: "Activate your account."
      }
    }
  },
  sendGrid: {
    apiKey: process.env.SENDGRID_API_KEY || '',
    fromAddress: process.env.SENDGRID_FROM_ADDRESS || '',
  },
};

export default config;
