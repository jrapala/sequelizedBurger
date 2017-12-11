// Routing Setup  
// =====================================================================================

  // Dependencies
  var express = require("express");
  
  // Initialize Router
  var router = express.Router();

  // Import the model to use it's database functions
  var burger = require("../models/burger.js");

  // Routes
  router.get("/", function(req, res) {
    // Select all items in database
    burger.selectAll(function(data) {
      // Create Handlebars object
      var hbsObject = {
        burgers: data
      };
      // Debug
      // console.log(hbsObject);
      // Send object and template
      res.render("index", hbsObject);
    });
  });

  router.post("/api/burgers", function(req, res) {
    // Insert item into database
    burger.insertOne("burger_name", req.body.burger_name, function(result) {
        res.redirect('/');
    });
  });

  router.put("/api/burgers/:id", function(req, res) {
    // Get parameter 
    var burgerID = req.params.id;
    // Update item in database
    burger.updateOne(1, burgerID, function(data) {
      res.redirect('/');
    });
  });

  // Export routes to server.js 
  module.exports = router;
