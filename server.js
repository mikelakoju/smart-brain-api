const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');
const { response } = require('express');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'mikelakoju',
    password: '',
    database: 'smart-brain',
  },
});

db.select('*')
  .from('users')
  .then((data) => {
    // console.log(data);
  });

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send(database.users);
});

// Sigin
app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt);
});

// Register
app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt);
});

app.get('/profile/:id', (req, res) => {
  profile.handleProfileGet(req, res, db);
});

app.put('/image', (req, res) => {
  image.handleImage(req, res, db);
});

app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res);
});

app.listen(3000, () => {
  console.log('app (webserver) is running on port 3000...');
});

/*
/ -- >  root -- res = this is working
/ signin  --> POST = SUccess or fail
/ register --> POST = USer 
/ on the home page  -- /profile /:userId  --> GET = user
/ since user exist an we want to capture the number of photos posted: /Image -->PUT -->User ..count


*/
