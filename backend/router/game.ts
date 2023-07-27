import e from "express";
import {
    create,
    remove,
    get,
    update,
    getAll,
} from "../controller/game";
import dungeonRouter from "./dungeon";

const gameRouter = e();
gameRouter.post("/new", create);
gameRouter.get("/:id", get);
gameRouter.put("/:id", update);
gameRouter.delete("/:id", remove);
gameRouter.get("/", getAll);

gameRouter.use('/dungeon', dungeonRouter);

export default gameRouter;
