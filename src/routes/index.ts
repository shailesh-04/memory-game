import game from "#views/game.js";
import { Router } from "express";

const router = Router();
const card = 2,
    size = 0;
router.get("/game", (req, res) => {
    res.send(game(card, size));
});

export default router;