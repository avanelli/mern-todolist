const dbo = require("../config/conn");

function find() {
  return new Promise((resolve, reject) => {
    const db = dbo.getDb();
    db.collection("todo_objects")
      .find({})
      .toArray(function (err, result) {
        if (err) reject(err);
        resolve(result);
      });
  });
}

module.exports = {
  find,
};
