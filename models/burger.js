// Model Setup  
// =====================================================================================

  // Import the ORM.
  var orm = require("../config/orm.js");

  // Database functions

  var burgers = {
    // Select all items in database
    selectAll: function(cb) {
      orm.selectAll("burgers", function(res) {
        cb(res);
      });
    },
    // Insert item into database
    insertOne: function(cols, vals, cb) {
      orm.insertOne("burgers", cols, vals, function(res) {
        cb(res);
      });
    },
    // Update item in database
    updateOne: function(objColVals, condition, cb) {
    orm.updateOne("burgers", objColVals, condition, function(res) {
      cb(res);
      });
    }
  };

  // Export the database functions for the controller (burgerController.js).
  module.exports = burgers;
