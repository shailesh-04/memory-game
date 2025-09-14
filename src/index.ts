import SocketServer from "#config/socket.js";

const PORT = process.env.PORT || 3000;
try {
    async function run() {
        try {
            const app = new SocketServer();
            app.httpServer.listen(PORT, () => {
                console.log(`Server running at http://localhost:${PORT}`);
            });
        } catch (error) {
            console.log(error);
        }
    }
    run();
} catch (error) {
    console.log(error)
}
