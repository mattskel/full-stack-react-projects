import config from './../config/config'
import express from 'express';
import path from 'path'
import template from './../template'
import mongoose from 'mongoose'

// Comment out before building for production
import devBundle from './devBundle'

const app = express();

// Comment out before building for production
devBundle.compile(app);

// Connection URL
// mongoose.Promise = global.Promise
mongoose.connect(config.mongoUri)
mongoose.connection.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});


app.get('/', (req, res) => {
  res.status(200).send(template())
})

const CURRENT_WORKING_DIR = process.cwd()
app.use('/dist', express.static(path.join(CURRENT_WORKING_DIR, 'dist'))) // Serve static files from the dist folder. Make files available on requests from the client

app.listen(config.port, (err) => {
  if (err) {
    console.log(err)
  }
    console.info('Server started on port %s.', config.port)
 })
