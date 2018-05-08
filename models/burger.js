// Import the ORM to create functions that will interact with the database.
var orm = require("../config/orm.js");

var burger = {
  selectAll: function(cb) {
    orm.selectAll("burgers", function(res) {
      cb(res);
    });
  },
  
  insertOne: function(cols, vals, cb) {
    orm.insertOne("burgers", cols, vals, function(res) {
      cb(res);
    });
  },
  updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
    });
  },
  delete: function(condition, cb) {
    orm.delete("burgers", condition, function(res) {
      cb(res);
    });
  }
};
// working on delete button

// $(document).ready(function () {
  

// $("delete-button").on("click", function(event) {
//   console.log("working");
//   var id = $(this).data("id");

//   // Send the DELETE request.
//   $.ajax("/burgers/" + id, {
//     type: "DELETE"
//   }).then(
//     function() {
//       console.log("deleted cat", id);
//       // Reload the page to get the updated list
//       location.reload();
//     }
//   );
// });
// });



// Export the database functions for the controller (burgersController.js).
module.exports = burger;
