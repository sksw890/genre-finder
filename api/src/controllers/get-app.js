function makeGetApp({ listAppData }) {
  return async function getApp(req, res) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const userID = req.user.id;
      const user = await listAppData(userID);
      res.set(headers);
      res.type('json');
      return res.status(201).send(user);
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

module.exports = makeGetApp;
