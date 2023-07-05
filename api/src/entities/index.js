const sha256 = require('sha256');
const { v4: uuidv4 } = require('uuid');

const { AUDIO_UPLOAD_DIRECTORY } = require('../config');
const buildMakeGenreClassificationTaskEntity = require('./genre-classification-task');
const buildMakeUserEntity = require('./user');

const getAudioUploadDirectory = function getAudioUploadDirectory(userID) {
  return `${AUDIO_UPLOAD_DIRECTORY}/${String(userID)}/${uuidv4()}`;
};

const getAudioUploadFilePath = function getAudioUploadFilePath(directory, fileName) {
  return `${directory}/${fileName}`;
};

const makeUserEntity = buildMakeUserEntity({ passwordHashAlgorithm: sha256 });
const makeGenreClassificationTaskEntity = buildMakeGenreClassificationTaskEntity({
  getAudioUploadDirectory,
  getAudioUploadFilePath,
});

module.exports = {
  makeGenreClassificationTaskEntity,
  makeUserEntity,
};
