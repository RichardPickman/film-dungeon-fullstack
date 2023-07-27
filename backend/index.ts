import express from "express";
import { createServer } from "http";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./router";
import { configs } from "./config";
import { appLogger } from "./middlewares";
import { errorHandler } from "./middlewares/ErrorHandler";

const { PORT } = configs;
const app = express();
const httpServer = createServer(app);

app.use(bodyParser.json());
app.use(
    cors({
        origin: "http://localhost:3000",
    })
);
app.use(appLogger);
app.use(router);
app.use(errorHandler)

httpServer.listen(PORT, () => console.log(`Server started on port ${PORT}`));
