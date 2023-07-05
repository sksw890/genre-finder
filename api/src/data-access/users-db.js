function makeUsersDb({ clientDB }) {
  async function create({ ...userInfo }) {
    const user = await clientDB.user.create({
      data: {
        ...userInfo,
      },
    });
    return user;
  }

  async function findByUsername({ username }) {
    const user = await clientDB.user.findFirst(
      {
        where: {
          username,
        },
      },
    );
    return user;
  }

  async function findByCredential({ username, hashedPassword }) {
    const user = await clientDB.user.findFirst(
      {
        where: {
          username,
          hashedPassword,
        },
      },
    );
    return user;
  }

  async function findByIdWithGenreClassfictiationTasks({ userID }) {
    const user = await clientDB.user.findFirst(
      {
        where: {
          id: userID,
        },
        include: {
          genreClassificationTasks: {
            orderBy: {
              id: 'desc',
            },
          },
        },
      },
    );
    return user;
  }

  return Object.freeze({
    create,
    findByUsername,
    findByCredential,
    findByIdWithGenreClassfictiationTasks,
  });
}

module.exports = makeUsersDb;
