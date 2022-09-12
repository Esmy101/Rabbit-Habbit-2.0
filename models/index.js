const User = require("./User");
const Posts = require("./Posts");
const Comments = require("./Comments");
// https://sebhastian.com/sequelize-foreign-key/#:~:text=When%20you%20add%20a%20foreign%20key%20constrain%20using,will%20be%20the%20User%20%2B%20Id%20%3D%20UserId.

Posts.belongsTo(User, {
  foreignKey: "userid",
});
/*
Posts.hasMany(Comments, {
  foreignKey: 'userid',
});
Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
});
*/
module.exports = { User, Posts, Comments };
