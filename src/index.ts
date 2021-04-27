import * as express from 'express';
import * as cors from 'cors';
import * as cookieParser from 'cookie-parser';
import * as ngrok from 'ngrok';
import * as path from 'path';
import logger from './tools/logger';

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;
let ngrokUrl = '';

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
 * Set the cookie value by IMG
 */
app.get('/setImg', (req: express.Request, res: express.Response) => {
  const { value } = req.query;
  res.cookie('currentValue', value, { maxAge: 900000, sameSite: 'none', secure: true });
  res.sendFile(path.join(__dirname, '/../img/cookie.jpg'));
});

/**
 * Get the cookie value
 */
app.get('/get', (req: express.Request, res: express.Response) => {
  const value = req.cookies.currentValue;
  res.send(`The cookie value is ${value}`);
});

const clientApp = express();
clientApp.use(cors());

app.listen(
  port,
  async (): Promise<void> => {
    logger.info(`Example app listening at http://localhost:${port}`);
    ngrokUrl = await ngrok.connect(port);
    logger.info(`Available on ngrok URL: ${ngrokUrl}`);
  },
);

/**
 * Get a Test Page
 */
clientApp.get('/', (_: express.Request, res: express.Response) => {
  res.type('.html');
  res.send(`
  <html>
    <body>
      <h1>Test</h1>
      <img src="${ngrokUrl}/setImg?value=sample" />
      <a href="${ngrokUrl}/get">Check Cookie</a>
    </body>
  </html>
`);
});

clientApp.listen(
  4000,
  async (): Promise<void> => {
    const ngrokFrontUrl = await ngrok.connect(4000);
    logger.info(`Client app listening at ${ngrokFrontUrl}`);
  },
);
