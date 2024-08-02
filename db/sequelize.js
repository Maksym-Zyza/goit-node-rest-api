import "dotenv/config";
import { Sequelize } from "sequelize";

const {
  DATABASE_NAME,
  DATABASE_DIALECT,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

const sequelize = new Sequelize({
  database: DATABASE_NAME,
  dialect: DATABASE_DIALECT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
});

export default sequelize;
