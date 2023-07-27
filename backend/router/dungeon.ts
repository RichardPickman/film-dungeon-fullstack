import e from "express";
import {
    create,
    remove,
    get,
    update
} from "../controller/dungeon";

const dungeonRouter = e();

dungeonRouter.post("/new", create);
dungeonRouter.get("/:id", get);
dungeonRouter.put("/:id", update);
dungeonRouter.delete("/:id", remove);

export default dungeonRouter;
