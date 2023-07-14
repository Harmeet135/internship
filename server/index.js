const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import the body-parser module
const router = require('./routes/router');
const dotenv = require('dotenv');

const app = express();

app.use(bodyParser.json({ limit: '30mb', extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
  res.send('API is running');
});

app.use(router);

mongoose.set('strictQuery', true);

dotenv.config();

const CONNECTION_URL = process.env.DATABASE;
const PORT = process.env.PORT || 5000;

if (!CONNECTION_URL) {
  console.log('Missing DATABASE environment variable in the .env file');
  process.exit(1); 
}

mongoose
  .connect(CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(PORT, () => console.log(`Server Running on Port: ${PORT}`));
  })
  .catch((error) => {
    console.log(`Error connecting to MongoDB: ${error}`);
    process.exit(1); 
  });
