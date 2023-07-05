const { makeGenreClassificationTaskEntity } = require('../entities');

function makeUploadAudioForClassification({
  genreClassificationTasksDB,
  genreClassificationTaskQueue,
  fileSystemHandler,
}) {
  return async function uploadAudioForClassification(audioFile, user) {
    const genreClassificationTaskEntity = makeGenreClassificationTaskEntity({
      userID: user.id,
      fileName: audioFile.name,
      status: 'UPLOADING_AUDIO',
    });
    const directory = genreClassificationTaskEntity.getAudioUploadDirectory();
    const filePath = genreClassificationTaskEntity.getAudioUploadFilePath();

    const genreClassificationTaskFromDB = await genreClassificationTasksDB.create({
      userId: genreClassificationTaskEntity.getUserID(),
      fileName: genreClassificationTaskEntity.getFileName(),
      audioUploadFilePath: filePath,
      status: genreClassificationTaskEntity.getStatus(),
    });

    if (!fileSystemHandler.directoryExists({ directory })) {
      fileSystemHandler.createDirectory({ directory });
    }

    audioFile.mv(filePath, (err) => {
      if (err) {
        throw new Error('Problem uploading file.');
      }
      genreClassificationTaskQueue.create({
        genreClassificationTaskID: genreClassificationTaskFromDB.id,
      });
    });

    return genreClassificationTaskFromDB;
  };
}

module.exports = makeUploadAudioForClassification;
