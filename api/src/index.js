const express = require('express');
const fileUpload = require('express-fileupload');
const bodyParser = require('body-parser');
const cors = require('cors');

const apiKeyAuthentication = require('./middleware/api-key-authentication');
const jwtAuthentication = require('./middleware/jwt-authentication');

const {
  postUser,
  postLogin,
  postApp,
  getApp,
  getGenreClassificationTask,
  patchGenreClassificationTask,
} = require('./controllers');

const app = express();

app.use(fileUpload());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.post('/register', postUser);
app.post('/login', postLogin);

app.get('/app', jwtAuthentication, getApp);
app.post('/app/classify_genre', jwtAuthentication, postApp);

app.get('/genre_classification_task/:id', apiKeyAuthentication, getGenreClassificationTask);
app.patch('/genre_classification_task/:id', apiKeyAuthentication, patchGenreClassificationTask);

app.listen(3001);
