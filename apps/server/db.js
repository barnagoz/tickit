const useMySQL = require('./dbConnection');

module.exports = {
  query(query) {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      const connection = useMySQL.getPool();
      try {
        connection.query(query, (err, results) => {
          if (err) {
            reject(err);
          }

          resolve(results);
        });
      } catch (err) {
        // Handle error if any, log, etc, and eventually
        reject(err);
      }
    });
  },
};
