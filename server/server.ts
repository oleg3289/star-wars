import 'zone.js/dist/zone-node';

import { ngExpressEngine } from '@nguniversal/express-engine';
import * as express from 'express';
import { join } from 'path';

import { AppServerModule } from '../src/main.server';
import { APP_BASE_HREF } from '@angular/common';
import { existsSync } from 'fs';
import { IServerEnvironments, IServerEnvironment } from './interfaces/environment';
const bodyParser = require('body-parser');
const cors = require('cors')

const mongoose = require('mongoose')
const router = express.Router();
const mongo_l = `oleg3289`;
const mongo_pw = `arxipelag4`;
const mongo_dbn = `main`;

// The Express app is exported so that it can be used by serverless Functions.
export function app() {
  const server = express();
  const distFolder = join(process.cwd(), 'dist/rare-lyrix/browser');
  const indexHtml = existsSync(join(distFolder, 'index.original.html')) ? 'index.original.html' : 'index';

  server.use(bodyParser.json());
  server.use(bodyParser.urlencoded({extended: true}) );


  const program = require('commander')
    .option('--production', 'production')
    .parse(process.argv);
  // Environments
  function isProd(): boolean {return !!program.production;};

  const ENV: IServerEnvironments = require('./environments');
  const ENVC: IServerEnvironment = ENV[isProd() ? `production` : `dev`];


  const corsOptions = {
    origin: ENVC.targerOrigin,
    optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204 
  }

  server.use(cors(corsOptions))

  const uri = `mongodb+srv://${mongo_l}:${mongo_pw}@rarelyrix-lltgv.mongodb.net/${mongo_dbn}?retryWrites=true&w=majority`;
  const db = mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('connected'))
    .catch((err) => console.log(err))

  const SongsSchema = new mongoose.Schema({
    artist: {
      type: String,
      required: true
    },
    songName: {
      type: String,
      required: true
    }
  })

  const Songs = mongoose.model('songs', SongsSchema)
  
  server.get("/api/songs", function(request, response){
    Songs.find()
      .then((users) => response.send(users))
      .catch((err) => console.log(err))
  })

  // Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
  server.engine('html', ngExpressEngine({
    bootstrap: AppServerModule,
  }));

  server.set('view engine', 'html');
  server.set('views', distFolder);

  // Example Express Rest API endpoints
  // app.get('/api/**', (req, res) => { });
  // Serve static files from /browser
  server.get('*.*', express.static(distFolder));

  // All regular routes use the Universal engine
  server.get('*', (req, res) => {
    res.render(indexHtml, { req, providers: [{ provide: APP_BASE_HREF, useValue: req.baseUrl }] });
  });

  return server;
}

function run() {
  const port = process.env.PORT || 4000;

  // Start up the Node server
  const server = app();
  server.listen(port, () => {
    console.log(`Node Express server listening on http://localhost:${port}`);
  });
}

// Webpack will replace 'require' with '__webpack_require__'
// '__non_webpack_require__' is a proxy to Node 'require'
// The below code is to ensure that the server is run only when not requiring the bundle.
declare const __non_webpack_require__: NodeRequire;
const mainModule = __non_webpack_require__.main;
const moduleFilename = mainModule && mainModule.filename || '';
if (moduleFilename === __filename || moduleFilename.includes('iisnode')) {
  run();
}

export * from '../src/main.server';