// Import the configured express app
import app from './app';
import config from './utils/config';

// Start express listening on the above port
app.listen(config.app.port, () => {
  /* eslint-disable no-console */
  console.log(`Listening: http://localhost:${config.app.port}`);
  /* eslint-enable no-console */
});
