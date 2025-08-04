import dotenv from "dotenv";
import { App } from "./App";

// Load configuration variables into application
dotenv.config();

const PORT = parseInt(process.env.PORT || "3000");

// Create app instance
const app = new App();

app.listen(PORT);
