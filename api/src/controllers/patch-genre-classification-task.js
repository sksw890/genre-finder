function makePatchGenreClassificationTask({ updateGenreClassificationTask }) {
  return async function patchGenreClassificationTask(req, res) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const taskID = parseInt(req.params.id, 10);
      const taskData = req.body;
      const genreClassificationTask = await updateGenreClassificationTask({
        id: taskID,
        ...taskData,
      });
      res.set(headers);
      res.type('json');
      return res.status(201).send(genreClassificationTask);
    } catch (e) {
      const error = {
        error: e.message,
      };
      res.set(headers);
      res.type('json');
      return res.status(400).send(error);
    }
  };
}

module.exports = makePatchGenreClassificationTask;
