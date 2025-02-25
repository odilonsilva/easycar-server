import sqlite3 from "sqlite3";

const db = new sqlite3.Database("./src/database/database.db", (err) => {
  if (err) {
    console.error("error to connected on database", err);
  } else {
    console.log("Database connected");
  }
});

function execute(command, params, method = "all") {
  return new Promise((resolve, reject) => {
    db[method](command, params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
}

export { db, execute };
