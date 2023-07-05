const {
  createUser,
  loginUser,
  listAppData,
  uploadAudioForClassification,
  listGenreClassificationTask,
  updateGenreClassificationTask,
} = require('../use-cases');

const makePostUser = require('./post-user');
const makePostLogin = require('./post-login');
const makePostApp = require('./post-app');
const makeGetApp = require('./get-app');
const makeGetGenreClassificationTask = require('./get-genre-classification-task');
const makePatchGenreClassificationTask = require('./patch-genre-classification-task');

const postUser = makePostUser({ createUser });
const postLogin = makePostLogin({ loginUser });
const postApp = makePostApp({ uploadAudioForClassification });
const getApp = makeGetApp({ listAppData });
const getGenreClassificationTask = makeGetGenreClassificationTask({ listGenreClassificationTask });
const patchGenreClassificationTask = makePatchGenreClassificationTask(
  { updateGenreClassificationTask },
);

module.exports = {
  postUser,
  postLogin,
  postApp,
  getApp,
  getGenreClassificationTask,
  patchGenreClassificationTask,
};
