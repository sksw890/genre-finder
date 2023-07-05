function makeListAppData({ usersDB }) {
  return async function listAppData(userID) {
    const userFromDB = await usersDB.findByIdWithGenreClassfictiationTasks({
      userID,
    });

    delete userFromDB.hashedPassword;

    return userFromDB;
  };
}

module.exports = makeListAppData;
