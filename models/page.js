"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Page extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Page.init(
    {
      url: { type: DataTypes.STRING, primaryKey: true ,unique:true},
      title: DataTypes.STRING,
      text: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Page",
    }
  );
  return Page;
};
