// Model Setup  
// =====================================================================================
  
	module.exports = function(sequelize, DataTypes) {
		// Customer model requires a customer name
		var Customer = sequelize.define("Customer", {
		    customer_name: {
		        type: DataTypes.STRING,
		        allowNull: false
		    }
		});

		// Each customer is associated with a burger
		Customer.associate = function(models) {
		    Customer.hasMany(models.Burger, {});
		}

		return Customer;
	};