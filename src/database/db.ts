import { Sequelize } from "sequelize-typescript";
import * as dotenv from 'dotenv';
import { UserModel } from '../accessManagement/user/infraestructure/models/userModel';

dotenv.config();

class Database {
  public sequelize: Sequelize | undefined;

  private POSTGRES_DB = process.env.DB_NAME|| "";
  private POSTGRES_HOST = process.env.DB_HOST|| "";
  private POSTGRES_PORT = 5432;
  private POSTGRES_USER = process.env.DB_USER|| "";
  private POSTGRES_PASSWORD = process.env.DB_PASSWORD|| "";

  constructor() {
    this.connectToPostgreSQL();
  }

  private async waitForConnection(options: { retries: number; delay: number }) {
    let retries = 0;
    while (retries < options.retries) {
      try {
        await this.sequelize?.authenticate();
        console.log("✅ PostgreSQL Connection has been established successfully.");
        return;
      } catch (error) {
        console.error("❌ Connection attempt failed:", error);
      }

      // Espera antes de realizar el próximo intento
      await new Promise((resolve) => setTimeout(resolve, options.delay));
      retries++;
    }

    console.error(`Failed to connect to the PostgreSQL database after ${options.retries} retries.`);
    process.exit(1);
  }

  private async connectToPostgreSQL() {
    console.log(this.POSTGRES_DB)
    this.sequelize = new Sequelize({
      database: this.POSTGRES_DB,
      username: this.POSTGRES_USER,
      password: this.POSTGRES_PASSWORD,
      host: this.POSTGRES_HOST,
      port: this.POSTGRES_PORT,
      dialect: "postgres",
      models: [UserModel],
    });

    try {
      await this.waitForConnection({ retries: 30, delay: 5000 });
      // Realiza otras operaciones necesarias después de la conexión exitosa
    } catch (error) {
      console.error("❌ Database connection failed:", error);
    }
  }
}

export default Database;