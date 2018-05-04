var connection = require("./connection.js");

// Methods that will execute the necessary MySQL commands in the controllers. 
// These are the methods that retrieve and store data in the database.
// ==========================================================================================

// I need to work on these- currently i just copied in code

var orm = {
  selectAll: function(tableInput, callback) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
      if (err) throw err;
      callback(result);
    });
  },
  insertOne: function(table, cols, vals, cb) {
    var queryString = "INSERT INTO " + table;

    queryString += " (";
    queryString += cols.toString();
    queryString += ") ";
    queryString += "VALUES (";
    queryString += printQuestionMarks(vals.length);
    queryString += ") ";

    console.log(queryString);

    connection.query(queryString, vals, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });

  },
  updateOne: function(table, objColVals, condition, cb) {
    var queryString = "UPDATE " + table;

    queryString += " SET ";
    queryString += objToSql(objColVals);
    queryString += " WHERE ";
    queryString += condition;

    console.log(queryString);
    connection.query(queryString, function(err, result) {
      if (err) {
        throw err;
      }

      cb(result);
    });
  },

};

module.exports = orm;
