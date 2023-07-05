function makePostApp({ uploadAudioForClassification }) {
  return async function postApp(req, res) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const { user } = req;
      const { audioFile } = req.files;
      const genreClassificationTask = await uploadAudioForClassification(audioFile, user);
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

module.exports = makePostApp;
