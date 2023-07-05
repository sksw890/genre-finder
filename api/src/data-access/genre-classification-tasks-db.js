function makeGenreClassificationTasksDB({ clientDB }) {
  async function create({ ...taskData }) {
    const genreClassificationTasksFromDB = await clientDB.genreClassificationTask.create({
      data: {
        ...taskData,
      },
    });
    return genreClassificationTasksFromDB;
  }

  async function update({
    id, status, result, completedAt,
  }) {
    const genreClassificationTasksFromDB = await clientDB.genreClassificationTask.update({
      where: {
        id,
      },
      data: {
        status,
        result,
        completedAt,
      },
    });
    return genreClassificationTasksFromDB;
  }

  async function findTaskByID({ taskID }) {
    const genreClassificationTasksFromDB = await clientDB.genreClassificationTask.findFirst({
      where: {
        id: taskID,
      },
    });
    return genreClassificationTasksFromDB;
  }

  return Object.freeze({
    create,
    update,
    findTaskByID,
  });
}

module.exports = makeGenreClassificationTasksDB;
