// Routing Setup  
// =====================================================================================

  // Dependencies
  var express = require("express");
  var db = require("../models/index");
  
  // Initialize Router
  var router = express.Router();

  // Extracts the sequelize connection from the models object
  var sequelizeConnection = db.sequelize;

  // Sync the tables
  sequelizeConnection.sync();

  // Routes
  // ======================================

  // Display all burgers in the database
  router.get("/", function(req, res) {
    // Select all items in database
    db.Burger.findAll({
      include: [db.Customer]
    })
    .then(function(dbBurger) {
      // Create Handlebars object
      var hbsObject = {
          burgers: dbBurger
      };
      res.render("index", hbsObject);
    });
  });

  // Add a new burger to the database
  router.post("/api/burgers", function(req, res) {
    var customerName = "TBD";
    db.Customer.create({
      customer_name: customerName
    })
    .then(function(data) {
      var customerId = data.dataValues.id;
      db.Burger.create({
        burger_name: req.body.burger_name,
        CustomerId: customerId
      })
    })
    .then(function(dbBurger) {
      res.redirect('/');
    })
  });

  // Eat a burger
  router.put("/api/burgers/:id", function(req, res) {
    // Get parameters and form data
    var customerName = req.body.customer_name;
    var burgerID = req.params.id;

    // Update state of burger
    db.Burger.update({
      devoured: true
    }, {
      where: {
        id: burgerID
      }
    })
    .then(function(data) {
      // Find burger that was just updated
      db.Burger.findOne({
        where: {
          id: burgerID
        }
      })
      .then(function(dbBurger) {
        // Get customer ID of that burger and update the name of the associated custmer
        var customerId = dbBurger.dataValues.CustomerId;   
        db.Customer.update({      
          customer_name: customerName
        }, {
          where: {
            id: customerId
          }
        })
        .then(function() {
          res.redirect("/");
        })
    })
  })
  });

  // Export routes to server.js 
  module.exports = router;
