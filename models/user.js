'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate({Post}) {
      // define association here
      this.hasMany(Post, {foreignKey: 'userId',  as: 'posts' })
    }
  };
  User.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    name:{
      type:DataTypes.STRING,
      allowNull: false,
      validate:{
        notNull: {msg: "Name is required"},
        notEmpty: {msg: "Name cannot be empty"},
      }
    },
    email:{
      type:DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate:{
        isEmail: {msg: "It must be a valid Email  address"},
      }
    },
    role:{
      type:DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    //define table name
    tableName: 'users',
    modelName: 'User',
  });
  return User;
};