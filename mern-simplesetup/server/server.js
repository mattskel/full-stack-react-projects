import express from 'express';
import devBundle form './devBundle'
import path from 'path'
import template from '../../template'
import {MongoClient} from 'mongodb'

const url = process.env.MONGODB_URI || 'mongodb://localhost:27017/mernSimpleSetup'
MongoClient.connect(url, (err, db) => {
  console.log("Connected successfully to mongodb server")
  db.close()
})

const app = express();

app.get('/', (req, res) => {
  res.status(200).send(template())
})

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist') // Serve static files from the dist folder. Make files available on requests from the client
devBundle.compile(app); // Only run this line in dev. Comment in prod

let port = process.env.PORT || 3000;
app.listen(port, function onStart(err) {
  if (err) {
    console.log(err)
  }
  console.info('Server started on port %s.', port)
}

