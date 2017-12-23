// Routing Setup  
// =====================================================================================

  // Dependencies
  var express = require("express");
  var db = require("../models");
  
  // Initialize Router
  var router = express.Router();

  // Routes
  router.get("/", function(req, res) {
    // Select all items in database
    db.Burger.findAll({})
      .then(function(dbBurger) {
        // Create Handlebars object
        var hbsObject = {
            burgers: dbBurger
        };
        res.render("index", hbsObject);
      });
  });


  router.post("/api/burgers", function(req, res) {
    db.Burger.create({
      burger_name: req.body.burger_name,
      devoured: false
    })
    .then(function(dbBurger) {
      res.redirect('/');
    })
  });

  router.put("/api/burgers/:id", function(req, res) {
    // Get parameter 
    var burgerID = req.params.id;
    // Add customer's name to Customer table
    db.Customer.create({
        customer_name: req.body.customer_name, 
        burger_id: parseInt(burgerID)
    })
    .then(function(dbBurger) {
      // Find burger with same ID
      db.Burger.findOne({
        where:
          {
            id: burgerID
          }
      })
      .then(function(burgerEaten) {
        // Update item in Burger table
        burgerEaten.update({
          devoured: true,
        },{
          where: {
            id: burgerID
          }
        })
        .then(function(dbBurger) {
          res.redirect('/');
        })
      });
    });
  });

  // Export routes to server.js 
  module.exports = router;
