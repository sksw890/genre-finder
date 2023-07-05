function makeUpdateGenreClassificationTask({ genreClassificationTasksDB }) {
  return async function updateGenreClassificationTaskData(taskInfo) {
    const genreClassificationTaskFromDB = await genreClassificationTasksDB.update({
      id: taskInfo.id,
      status: taskInfo.status,
      result: taskInfo?.result,
      completedAt: (taskInfo?.completedAt ? new Date(taskInfo?.completedAt) : null),
    });

    return genreClassificationTaskFromDB;
  };
}

module.exports = makeUpdateGenreClassificationTask;
