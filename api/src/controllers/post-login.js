function makePostLogin({ loginUser }) {
  return async function postLogin(req, res) {
    const headers = {
      'Content-Type': 'application/json',
    };

    try {
      const userInfo = req.body;
      const user = await loginUser(userInfo);
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

module.exports = makePostLogin;
