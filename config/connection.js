// MySQL Setup  
// =====================================================================================

  // Set up variables
  var mysql = require("mysql");
  var connection;

  // Heroku Setup
  if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
  // Local Setup
  } else { 
    connection = mysql.createConnection({
      port: 3306,
      host: "localhost",
      user: "root",
      password: "",
      database: "burgers_db"
    });
  }

  // Make connection.
  connection.connect(function(err) {
    if (err) {
      console.error("error connecting: " + err.stack);
      return;
    }
    console.log("connected as id " + connection.threadId);
  });

  // Export connection for our ORM to use.
  module.exports = connection;
