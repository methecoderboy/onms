const { Server } = require("socket.io");

let io;
let activeUsers = [];

const InitSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
      credentials: true,
       
    },
    allowEIO3: true,
  });

  io.on("connection", (socket) => {
    const { user_id } = socket.handshake.query;

    activeUsers.push({ user_id, socket_id: socket.id });
    socket.on("disconnect", () => {
      console.log("User disconnected");
      activeUsers = activeUsers.filter((user) => user.user_id !== user_id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io not initialized");
  }
  return io;
};

const getSocketId = (userId) => {
  return activeUsers.find((user) => user.user_id === userId)?.socket_id;
};

module.exports = { InitSocket, getIO, getSocketId };
