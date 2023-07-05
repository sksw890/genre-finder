function buildMakeUserEntity({ passwordHashAlgorithm }) {
  return function makeUserEntity({
    username,
    password,
  }) {
    if (!username) {
      throw new Error('User must have username');
    }
    if (!password) {
      throw new Error('User must have password.');
    }

    const hashedPassword = passwordHashAlgorithm(password);

    return Object.freeze({
      getUsername: () => username,
      getHashedPassword: () => hashedPassword,
    });
  };
}

module.exports = buildMakeUserEntity;
