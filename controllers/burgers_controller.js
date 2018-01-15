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

  // Display all burgers in the database in alphabetical order
  router.get("/", function(req, res) {
    db.Burger.findAll({
      include: [db.Customer],
      order: [['burger_name', 'ASC']]
    })
    .then(function(dbBurger) {
      // Create Handlebars object
      var hbsObject = {
          burgers: dbBurger
      };
      res.render("index", hbsObject);
    });
  });

  // Add a new burger to the database, with placeholder customer name and burger name
  router.post("/api/burgers", function(req, res) {
    // Placeholder name
    var customerName = "TBD";
    // Create new entry in Customer table
    db.Customer.create({
      customer_name: customerName
    })
    .then(function(data) {
      var customerId = data.dataValues.id;
      // Create new entry in Burger table, with associated customer
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

    // Update burger table with devoured state
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
        // Get customer ID of that burger and update the name of the associated customer
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
