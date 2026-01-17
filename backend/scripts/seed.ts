import fs from "fs/promises";
import { App } from "../src/App";

const runSeed = async () => {
  try {
    const connection = await App.getDBInstance();

    const sqlQuery = await fs.readFile("./seeds/amenities.sql", "utf8");
    const response = await connection.execute(sqlQuery);
    console.log("Seeded successfully response: ", response);
    await connection.end();
  } catch (error) {
    console.error(error);
  }
};

runSeed();
