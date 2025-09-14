# 🎮 Memory Game

A fun and interactive multiplayer memory card game built with **Node.js**, **Socket.IO**, and **Vanilla JavaScript**.  
Players can join a game, flip cards, and compete to match pairs. The game updates in real-time using WebSockets.

---

## 🚀 Features

- 🔥 **Real-Time Gameplay** – Players see updates instantly with Socket.IO.  
- 👥 **Multiplayer Support** – Two players can compete in the same room.  
- 🃏 **Customizable Board Size** – Choose different grid sizes for varied difficulty.  
- 🔐 **Unique Game IDs** – Shareable game links for easy joining.  
- 🔄 **Dynamic Game State** – Server manages all game logic and syncing.  
- 🎨 **Clean UI** – Simple and user-friendly interface with animations.  

---

## 🛠️ Tech Stack

| Technology      | Purpose                          |
|-----------------|---------------------------------|
| Node.js         | Backend server                  |
| Express.js      | Web server and routing          |
| Socket.IO       | Real-time communication         |
| TypeScript      | Type safety for backend code    |
| HTML/CSS/JS     | Frontend                        |

---

## 📂 Project Structure

```plaintext
memory-game/
├── public/                # Static frontend files
│   ├── index.html         # Home screen
│   ├── game.html          # Game screen
│   ├── styles.css         # Styles
│   └── client.js          # Client-side JS
├── src/
│   ├── server.ts          # Express server setup
│   ├── socketManager.ts   # Socket.IO event handling
│   ├── gameManager.ts     # Game logic and state
│   └── utils/             # Helper functions
├── package.json
└── README.md
