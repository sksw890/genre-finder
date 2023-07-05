function buildMakeGenreClassificationTaskEntity(
  { getAudioUploadDirectory, getAudioUploadFilePath },
) {
  return function makeGenreClassficationTaskEntity({
    userID,
    fileName,
    status,
  }) {
    if (!userID) {
      throw new Error('GenreClassificationTaskEntity must have an userID');
    }
    if (!fileName) {
      throw new Error('GenreClassificationTaskEntity must have a fileName');
    }
    if (!status) {
      throw new Error('GenreClassificationTaskEntity must have a status');
    }

    const audioUploadDirectory = getAudioUploadDirectory(userID);
    const audioUploadFilePath = getAudioUploadFilePath(audioUploadDirectory, fileName);

    return Object.freeze({
      getUserID: () => userID,
      getFileName: () => fileName,
      getStatus: () => status,
      getAudioUploadDirectory: () => audioUploadDirectory,
      getAudioUploadFilePath: () => audioUploadFilePath,
    });
  };
}

module.exports = buildMakeGenreClassificationTaskEntity;
