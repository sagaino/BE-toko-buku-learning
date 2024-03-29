'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class DetailTransaction extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      DetailTransaction.belongsTo(models.Transaction, {
        foreignKey: "transaction",
      })
    }
  }
  DetailTransaction.init({
    id: {
      allowNull: false,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      type: DataTypes.UUID,
    },
    transaction: DataTypes.UUID,
    user: DataTypes.UUID,
    book: DataTypes.UUID,
    titleBook: DataTypes.STRING,
    imageBook: DataTypes.STRING,
    priceBook: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'DetailTransaction',
  });
  return DetailTransaction;
};