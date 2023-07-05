const { PrismaClient } = require('@prisma/client');
const celery = require('celery-node');
const fs = require('fs');

const { REDIS_URI } = require('../config');
const makeUsersDb = require('./users-db');
const makeGenreClassificationTasksDB = require('./genre-classification-tasks-db');
const makeGenreClassificationTaskQueue = require('./genre-classification-task-queue');
const makeFileSystemHandler = require('./file-system-handler');

const clientDB = new PrismaClient();
const usersDB = makeUsersDb({ clientDB });
const genreClassificationTasksDB = makeGenreClassificationTasksDB({ clientDB });
const fileSystemHandler = makeFileSystemHandler({ fileSystemHandler: fs });

const taskQueue = celery.createClient(
  REDIS_URI,
  REDIS_URI,
);
const genreClassificationTaskQueue = makeGenreClassificationTaskQueue({ taskQueue });

module.exports = {
  usersDB,
  genreClassificationTasksDB,
  genreClassificationTaskQueue,
  fileSystemHandler,
};
