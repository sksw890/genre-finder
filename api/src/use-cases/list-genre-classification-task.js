function makeListGenreClassificationTask({ genreClassificationTasksDB }) {
  return async function listGenreClassificationTask(taskID) {
    const genreClassificationTaskFromDB = await genreClassificationTasksDB.findTaskByID({ taskID });

    return genreClassificationTaskFromDB;
  };
}

module.exports = makeListGenreClassificationTask;
