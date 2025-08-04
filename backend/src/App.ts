import dotenv from "dotenv";
import express, { Application, Request, Response } from "express";
import { UserRoutes } from "./routes/userRoutes";

export class App {
  public app: Application;
  private userRoutes: UserRoutes;
  // TODO 1: Initialize Routes
  constructor() {
    this.app = express();
    this.userRoutes = new UserRoutes();
    this.initializeMiddleware();
    this.initalizeRoutes();
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

  public listen(port: number) {
    this.app.listen(port, () => {
      console.log(`Server running on http://localhost:${port}`);
    });
  }
}
