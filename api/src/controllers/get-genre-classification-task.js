function makeGetGenreClassificationTask({ listGenreClassificationTask }) {
  return async function getGenreClassificationTask(req, res) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const taskID = req.param.id;
      const genreClassificationTask = await listGenreClassificationTask(taskID);
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

module.exports = makeGetGenreClassificationTask;
