import express from "express";
import mainConfig from "../config/main.config";
import { eventEmitter } from "../events/main.event";

function startServer() {
  const app = express();

  app.get("/auth", (req, res) => {
    const code = req.query.code;

    if (code) {
      res.send("Success! You can now close this window.");

      eventEmitter.emit("auth", code);
    }

    res.send("Error. Please try again.");
  });

  app.listen(mainConfig.PORT);
}

export { startServer };
