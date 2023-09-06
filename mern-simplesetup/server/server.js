import express from 'express';
import path from 'path'
import template from './../template'
import { MongoClient } from 'mongodb'

// Comment out before building for production
import devBundle from './devBundle'

const app = express();

// Comment out before building for production
devBundle.compile(app);

const url = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/mernSimpleSetup'
MongoClient.connect(url, (err, db) => {
  if (err) throw err;
  console.log("Connected successfully to mongodb server")
  db.close()
})


app.get('/', (req, res) => {
  res.status(200).send(template())
})

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist'))) // Serve static files from the dist folder. Make files available on requests from the client

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
})
