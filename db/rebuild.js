import "dotenv/config";
import Migrate from "./Migrate.js";

await Migrate.doAll();