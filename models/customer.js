// Model Setup  
// =====================================================================================
  
  module.exports = function(sequelize, DataTypes) {
    var Customer = sequelize.define("Customer", {
      customer_name: {
        type: DataTypes.STRING,
        allowNull: false
  	},
      burger_eaten: {
      	type: DataTypes.STRING
      }
    }, {
    timestamps: false
  });
    return Customer;
  };