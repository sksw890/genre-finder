const { makeUserEntity } = require('../entities');

function makeCreateUser({ usersDB, jwtFactory }) {
  return async function createUser(userInfo) {
    const userEntity = makeUserEntity(userInfo);

    const exists = await usersDB.findByUsername({ username: userEntity.getUsername() });

    if (exists) {
      throw new Error('Username already exists.');
    }

    const userFromDB = await usersDB.create({
      username: userEntity.getUsername(),
      hashedPassword: userEntity.getHashedPassword(),
    });

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

module.exports = makeCreateUser;
