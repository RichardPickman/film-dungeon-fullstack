import e from "express";
import gameRouter from "./game";

const router = e();

router.use("/game", gameRouter);

export default router;
