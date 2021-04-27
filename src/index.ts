import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as ngrok from 'ngrok';
import logger from './tools/logger';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(cors());
app.use(cookieParser());

/**
 * Ping test method
 */
app.get('/ping', (_: express.Request, res: express.Response) => {
  res.send('pong');
});

/**
 * Set the cookie value
 */
app.get('/set', (req: express.Request, res: express.Response) => {
  const { value } = req.query;
  res.cookie('currentValue', value, { maxAge: 900000 });
  res.send(`The cookie is set to ${value}`);
});

/**
 * Get the cookie value
 */
app.get('/get', (req: express.Request, res: express.Response) => {
  const value = req.cookies.currentValue;
  res.send(`The cookie value is ${value}`);
});

app.listen(
  port,
  async (): Promise<void> => {
    logger.info(`Example app listening at http://localhost:${port}`);
    const url = await ngrok.connect(port);
    logger.info(`Available on ngrok URL: ${url}`);
  },
);
