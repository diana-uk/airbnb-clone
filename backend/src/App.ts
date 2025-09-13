import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import mysql from "mysql2/promise";
import { UserRoutes } from "./routes/userRoutes";
import { sqlConfig } from "./database/migrations/config.database";

dotenv.config();

export class App {
  public app: Application;
  private userRoutes: UserRoutes;
  private static dbConnectionInstance: mysql.Connection;
  // TODO 1: Initialize Routes
  public constructor() {
    this.app = express();
    this.userRoutes = new UserRoutes();
    this.initializeMiddleware();
    this.initalizeRoutes();
    this.initializeDatabase();
  }

  private initializeMiddleware(): void {
    // Parse incoming requests with JSON Payload to JS object
    // Makes it available as req.body
    this.app.use(express.json());
  }

  private initalizeRoutes(): void {
    // Health check route
    this.app.get("/", (req: Request, res: Response) => {
      res.json({
        message: "API call was successful",
        timestamp: new Date().toISOString(),
      });
    });
    this.app.use("/auth", this.userRoutes.router);
  }

  private async initializeDatabase() {
    try {
      App.dbConnectionInstance = await mysql.createConnection(sqlConfig);
      console.log("sql config", sqlConfig);
      console.log("Connected to SQL Server successfully");
    } catch (error) {
      console.error("Database connection failed:", error);
      process.exit(1);
    }
  }

  public static async getDBInstance() {
    if (!this.dbConnectionInstance) {
      this.dbConnectionInstance = App.dbConnectionInstance =
        await mysql.createConnection(sqlConfig);
    }
    return this.dbConnectionInstance;
  }

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}
