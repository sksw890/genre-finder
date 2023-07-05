function makeGenreClassificationTaskQueue({ taskQueue }) {
  function create({ genreClassificationTaskID }) {
    const task = taskQueue.createTask('tasks.classify_genre');
    task.applyAsync([genreClassificationTaskID]);
  }

  return Object.freeze({
    create,
  });
}

module.exports = makeGenreClassificationTaskQueue;
