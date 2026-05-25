'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class service_providers extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  service_providers.init({
    name: DataTypes.STRING,
    phone: DataTypes.BIGINT,
    isAvailable: DataTypes.BOOLEAN,
    skill_type: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'service_providers',
  });
  return service_providers;
};