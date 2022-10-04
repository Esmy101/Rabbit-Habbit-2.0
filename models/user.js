const { Model, DataTypes } = require("sequelize");
const bcrypt = require("bcrypt");
const sequelize = require("../config/connection");

class User extends Model {
  checkPassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.user_password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    email:{
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      beforeCreate: async (newUserData) => {
        let email_regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        let test_email_regex = /^test+[0-9]*@rabit-habit.com/
        let password_regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/

        email_valid = email_regex.test(newUserData.email)
        password_valid = true

        let test_email = false
        console.log(process.env.NODE_ENV)
        if (process.env.NODE_ENV !== 'dev') {
          test_email = test_email_regex.test(newUserData.email)
          password_valid = password_regex.test(newUserData.user_password)
        }

        if (test_email){
          throw new Error('test email used for production')
        }
        if (!email_valid){
          throw new Error('email invalid')
        }
        if (!password_valid) {
          throw new Error('password to weak')
        }

        newUserData.user_password = await bcrypt.hash(
          newUserData.user_password,
          10
        );
        return newUserData;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: "users",
  }
);

module.exports = User;
