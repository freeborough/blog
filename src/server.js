import "dotenv/config";
import app from "./app.js";

const port = process.env.APP_PORT || 3000;
const appName = process.env.APP_NAME || "Blog Server";

const server = app.listen(port, () => {
  console.log(`${appName} listening on port ${port}`);
});

export default server;