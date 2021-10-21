const dotEnv = require('dotenv');

dotEnv.config({ path: `${__dirname}/config.env` });

const express = require('express');

const app = express();
const cors = require('cors');
const { createPool } = require('mysql');

const signUp = require('./controllers/signUp');
const signIn = require('./controllers/signIn');

const db = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: '',
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

app.use(express.json());
app.use(cors());

db.query(`select * from users`, (err, result) => {
  if (result) console.log('DB Connected');
});

app.post('/signup', (req, res) => {
  signUp.handleSignUp(req, res, db);
});

app.post('/signin', signIn.handleSignIn(db));

app.listen(3000, () => {
  console.log('App Started on port 3000');
});
