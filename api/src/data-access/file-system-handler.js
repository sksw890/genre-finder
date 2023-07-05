function makeFileSystemHandler({ fileSystemHandler }) {
  function directoryExists({ directory }) {
    return fileSystemHandler.existsSync(directory);
  }

  function createDirectory({ directory }) {
    fileSystemHandler.mkdirSync(directory, { recursive: true });
  }

  return Object.freeze({
    directoryExists,
    createDirectory,
  });
}

module.exports = makeFileSystemHandler;
