const { makeUserEntity } = require('../entities');

function makeLoginUser({ usersDB, jwtFactory }) {
  return async function loginUser(userInfo) {
    const userEntity = makeUserEntity(userInfo);

    const userFromDB = await usersDB.findByUsername({
      username: userEntity.getUsername(),
      hashedPassword: userEntity.getHashedPassword(),
    });

    if (!userFromDB) {
      throw new Error('Username or password is wrong.');
    }

    const jwt = jwtFactory({
      id: userFromDB.id,
      username: userEntity.getUsername(),
    });

    return {
      id: userFromDB.id,
      username: userEntity.getUsername(),
      token: jwt,
    };
  };
}

module.exports = makeLoginUser;
