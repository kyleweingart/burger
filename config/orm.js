var connection = require("./connection.js");



// Helper function for generating MySQL syntax
function printQuestionMarks(num) {
	var arr = [];

	for (var i = 0; i < num; i++) {
		arr.push("?");
	}

	return arr.toString();
}

// Helper function for generating My SQL syntax
function objToSql(ob) {
	var arr = [];

	for (var key in ob) {
		arr.push(key + "=" + ob[key]);
	}

	return arr.toString();
}



// Methods that will execute the necessary MySQL commands in the controllers. 
// These are the methods that retrieve and store data in the database.
// ==========================================================================================



var orm = {

  selectAll: function(tableInput,callback) {
    var queryString = "SELECT * FROM " + tableInput + ";";
    connection.query(queryString, function(err, result) {
      if (err) throw err;
      callback(result);
    });
  }, 
  
  insertOne: function(table, cols, vals, callback) {
    // Construct query string that inserts one row into the target table
    var queryString = "INSERT INTO " + table;

		queryString += " (";
		queryString += cols.toString();
		queryString += ") ";
		queryString += "VALUES (";
		queryString += printQuestionMarks(vals.length);
		queryString += ") ";

		console.log("Insert Query String: " + queryString);

		// Perform the database query
		connection.query(queryString, vals, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			callback(result);
		});

  },

  updateOne: function(table, objColVals, condition, callback) {
		// Construct a query string that updates a single value in the target table
		var queryString = "UPDATE " + table;

		queryString += " SET ";
		queryString += objToSql(objColVals);
		queryString += " WHERE ";
		queryString += condition;

		console.log("Update Query String: " + queryString);

		// Perform the database query
		connection.query(queryString, function(err, result) {
			if (err) {
				throw err;
			}

			// Return results in callback
			callback(result);
		});
	}


  
  

};

// Export the orm object for use in other modules
module.exports = orm;
