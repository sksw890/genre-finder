const jwt = require('jsonwebtoken');

const { JWT_SECRET } = require('../config');
const makeCreateUser = require('./create-user');
const makeLoginUser = require('./login-user');
const makeListAppData = require('./list-app-data');
const makeUploadAudioForClassification = require('./upload-audio-for-classification');
const makeListGenreClassificationTask = require('./list-genre-classification-task');
const makeUpdateGenreClassificationTask = require('./update-genre-classification-task');
const {
  usersDB,
  genreClassificationTasksDB,
  genreClassificationTaskQueue,
  fileSystemHandler,
} = require('../data-access');

function jwtFactory(payload) {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: 1000000,
    },
  );
}

const createUser = makeCreateUser({ usersDB, jwtFactory });
const loginUser = makeLoginUser({ usersDB, jwtFactory });
const listAppData = makeListAppData({ usersDB });
const uploadAudioForClassification = makeUploadAudioForClassification({
  genreClassificationTasksDB,
  genreClassificationTaskQueue,
  fileSystemHandler,
});
const listGenreClassificationTask = makeListGenreClassificationTask({ genreClassificationTasksDB });
const updateGenreClassificationTask = makeUpdateGenreClassificationTask(
  { genreClassificationTasksDB },
);

module.exports = {
  createUser,
  loginUser,
  listAppData,
  listGenreClassificationTask,
  uploadAudioForClassification,
  updateGenreClassificationTask,
};
