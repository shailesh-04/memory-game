import router from "#routes/index.js";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

class Server {
    public app: express.Application;
    constructor() {
        this.app = express();
        this.middleware();
        this.routes();
    }
    private middleware(): void {
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.static(path.join(__dirname, "../../public")));
    }
    private routes(): void {
        this.app.use("/",router);
        this.app.get("/", (req, res) => {
            res.send("API is running!");
        });
    }
}
export default Server;
