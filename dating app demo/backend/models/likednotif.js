'use strict';
module.exports = (sequelize, DataTypes) => {
  const likedNotif = sequelize.define('likedNotif', {
    userID: { primaryKey: true , type: DataTypes.UUID },
    likedCount: DataTypes.INTEGER
  }, {});
  likedNotif.associate = function(models) {
    // associations can be defined here
  };
  return likedNotif;
};