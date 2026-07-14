import express from "express";
import http from "http";
import bodyParser from "body-parser";
import cors from "cors";
// import { createRoom, getRoom } from "./model/roomStore";
import { compileAndRun } from "./controllers/CompileAndRun";
import { healthChecks } from "./controllers/HealthCheck";
import { Server as SocketIOServer } from "socket.io";
import {
  addUserToRoom,
  removeUserFromRoom,
  getRoom,
  updateRoomCode,
  createRoom,
  getUsersInRoom,
} from "./model/roomStore";
const app = express();
const port = Number(process.env.PORT) || 3300;
import path from "path";

app.use(
  cors({
    origin: true, // Reflects the request origin
    credentials: true,
  }),
);

app.use(bodyParser.json());

app.get("/healthCheck", healthChecks);

app.post("/compileAndRun", compileAndRun);

app.post("/createRoom", (req, res) => {
  const { name, password, description, language } = req.body;
  if (!name || !password) {
    return res.status(400).json({ error: "Name and password required" });
  }
  const existing = getRoom(name);
  if (existing) return res.status(409).json({ error: "Room already exists" });

  const room = createRoom(name, password, language, description);
  res.json({
    success: true,
    room: {
      name: room?.name,
      description: room?.description,
      language: room?.language,
    },
  });
});

app.post("/joinRoom", (req, res) => {
  const { name, password, userName } = req.body;
  if (!name || !password || !userName) {
    return res
      .status(400)
      .json({ error: "Name, password, and userName are required" });
  }
  const room = getRoom(name);
  if (!room) return res.status(404).json({ error: "Room not found" });
  if (room.password !== password)
    return res.status(403).json({ error: "Wrong password" });

  res.json({
    success: true,
    room: {
      name: room.name,
      description: room.description,
      code: room.code,
      userName: userName,
    },
  });
});

const server = http.createServer(app);

// websocket api ------------------------------------------------
const io = new SocketIOServer(server, {
  cors: { origin: "*" }, // adjust for production
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  // Join a room after successful REST validation
  socket.on("join-room", ({ roomName, userName }) => {
    const room = getRoom(roomName);
    if (!room) return socket.emit("error", "Room not found");

    // Optional: Re‑verify password? For simplicity, trust the previous REST.
    socket.join(roomName);
    addUserToRoom(roomName, socket.id, userName);

    // Send current code to the new user
    socket.emit("room-joined", {
      code: room.code,
      language: room.language,
      users: getUsersInRoom(roomName),
    });

    // Tell everyone else that a new user joined
    socket.to(roomName).emit("user-joined", { userName, userId: socket.id });
  });

  // Handle code changes from a client
  socket.on("code-change", ({ roomName, code }) => {
    updateRoomCode(roomName, code);
    // Broadcast to all OTHER clients in the same room
    socket.to(roomName).emit("code-update", { code });
  });

  // Handle cursor/selection events (optional)
  socket.on("cursor-move", ({ roomName, position }) => {
    socket.to(roomName).emit("cursor-move", { userId: socket.id, position });
  });

  // Leave room manually or on disconnect
  socket.on("leave-room", ({ roomName }) => {
    const userName = getRoom(roomName)?.users.get(socket.id);
    socket.leave(roomName);
    removeUserFromRoom(roomName, socket.id);
    socket.to(roomName).emit("user-left", { userName, userId: socket.id });
  });

  socket.on("disconnect", () => {});
});
// /------------------------------------------------------------------------

app.use(express.static(path.join(__dirname, "../../dist")));

app.use((req, res, next) => {
  if (req.url.endsWith(".css")) {
    res.type("text/css");
  }
  next();
});

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../dist/index.html"));
});

server.listen(port, `0.0.0.0`, () => {
  console.log("Running on Port: ", port);
});
