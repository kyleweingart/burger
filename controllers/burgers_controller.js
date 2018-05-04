var express = require("express");

var router = express.Router();

// Import the model (cat.js) to use its database functions.
var burger = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
router.get("/", function(req, res) {
  burger.selectAll(function(data) {
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});

router.post("/api/burgers", function(req, res) {
  burger.create(["burger_name"],req.body.burger_name, function(result) {
    // Send back the ID of the new quote
    // res.json({ id: result.insertId });
    res.json({id: result.insertID});
  });
});

router.put("/burger/eat/:id", function(req, res) {
  

  burger.updateOne(req.params.id,function(){
      res.redirect('/index');
  });
   
});


module.exports = router;
