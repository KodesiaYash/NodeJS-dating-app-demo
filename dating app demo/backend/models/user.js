'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    id :{
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true
    },
    dateOfBirth :{
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type:DataTypes.STRING ,
      allowNull : false
    },
    email:{ 
      type:DataTypes.STRING ,
      allowNull : false
    },
    
    password:{
      type : DataTypes.STRING , 
      allowNull : false 
    },
    sex:{
      type : DataTypes.STRING ,
      allowNull : false 
    },
    imgPath:{
      type : DataTypes.STRING ,
      allowNull : true 
    },
  });
  user.associate = function(models) {
  };
  return user;
};