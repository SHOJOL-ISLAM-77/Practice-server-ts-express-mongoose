import app from "./app";
import config from "./config";
import DBConnect from "./DB/DB";

DBConnect();

app.listen(config.port, () => {
  console.log("Server is running on port " + config.port);
});
