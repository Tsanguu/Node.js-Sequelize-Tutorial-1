'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate({User}) {
      // define association here
      this.belongsTo(User, {foreignKey: 'userId', as: 'users' })
    }
  };
  Post.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    userId: {
        allowNull: false,
        type: DataTypes.INTEGER
    },
    content: {
      allowNull: false,
      type: DataTypes.STRING
    },
  },{
    sequelize,
    //define table name
    tableName: 'posts',
    modelName: 'Post',
  });
  return Post;
};