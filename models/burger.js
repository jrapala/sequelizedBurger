// Model Setup  
// =====================================================================================
  
  module.exports = function(sequelize, DataTypes) {
    // Burger model requires a burger name. When a new burger is created, it's devoured status is set to false.
    var Burger = sequelize.define("Burger", {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    });

    // Connecting the Burger model to the Customer model
    Burger.associate = function(models) {
      Burger.belongsTo(models.Customer, {
        onDelete: "cascade",
        foreignKey: {
          allowNull: false
        }
      });
    };

    return Burger;
  };