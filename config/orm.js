// ORM Setup  
// =====================================================================================

  // Import MySQL connection.
  var connection = require("../config/connection.js");

  // Object for all SQL statement functions
  var orm = {
    // Select all items in database
    selectAll: function(tableInput, cb) {
      var queryString = "SELECT * FROM " + tableInput + ";";
      connection.query(queryString, function(err, result) {
        if (err) {
          throw err;
        }
        cb(result);
      });
    },
    // Insert item into database
    insertOne: function(table, cols, vals, cb) {
        var queryString = "INSERT INTO " + table + " (" + cols.toString() + ") VALUES (?)";
        // Debug
        // console.log(queryString);
        // console.log(vals);
        connection.query(queryString, vals, function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
    },
    // Update item in database
    updateOne: function(table, objColVals, condition, cb) {
        var queryString = "UPDATE ?? SET devoured = ? WHERE id = ?";
        connection.query(queryString, [table, objColVals, condition], function(err, result) {
          if (err) {
            throw err;
          }
          cb(result);
        });
      }
    };

    // Export the ORM object for the model (burger.js).
    module.exports = orm;
