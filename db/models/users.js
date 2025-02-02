import { DataTypes } from "sequelize";
import sequelize from "../sequelize.js";
import { emailRegexp } from "../../constants.js";

const Users = sequelize.define("users", {
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail(value) {
        if (!emailRegexp.test(value)) {
          throw new Error("Email not validate");
        }
      },
    },
  },
  subscription: {
    type: DataTypes.ENUM,
    values: ["starter", "pro", "business"],
    defaultValue: "starter",
  },
  token: {
    type: DataTypes.STRING,
    defaultValue: null,
  },
  avatarURL: DataTypes.STRING,
  verify: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  verificationToken: {
    type: DataTypes.STRING,
  },
});

export default Users;
