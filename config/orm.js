var connection = require("./connection.js");


function printQuestionMarks(num) {
    var arr = [];
  
    for (var i = 0; i < num; i++) {
      arr.push("?");
    }
  
    return arr.toString();
  }
  
  // Helper function to convert object key/value pairs to SQL syntax
  function objToSql(ob) {
    var arr = [];
  
    // loop through the keys and push the key/value as a string int arr
    for (var key in ob) {
      var value = ob[key];
      // check to skip hidden properties
      if (Object.hasOwnProperty.call(ob, key)) {
        // if string with spaces, add quotations (Lana Del Grey => 'Lana Del Grey')
        if (typeof value === "string" && value.indexOf(" ") >= 0) {
          value = "'" + value + "'";
        }
        // e.g. {name: 'Lana Del Grey'} => ["name='Lana Del Grey'"]
        // e.g. {sleepy: true} => ["sleepy=true"]
        arr.push(key + "=" + value);
      }
    }
  
    // translate array of strings to a single comma-separated string
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




//   I'm stuck at this point- I can't seem to get this function working in the burgers_controller file- i might need to simplify this and see if i can get it to work. 
//   create: function(table, cols, value, callback) {
 

//     connection.query(
//       "INSERT INTO ? SET ?",
//       {
//         burger_name: burger_name,
//       },
//       function(err, result) {
//         if (err) throw err;
        

//         callback(result);
//       });

//   },

create: function(table, cols, vals, cb) {
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

  
  
  updateOne: function(burgerID, callback) {
    
   
    connection.query("UPDATE burgers SET ? WHERE", [{devoured:true}, {id: burgerID}],
     function(err, result) {
      if (err) throw err;
      

      callback(result);
    });
  },

};

module.exports = orm;
