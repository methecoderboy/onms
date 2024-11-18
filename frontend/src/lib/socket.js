import { io } from "socket.io-client";

let socket;

const connectSocket = (user_id) => {
  if (user_id === undefined) {
    return;
  }
  socket = io("https://onms.onrender.com", {
    query: `user_id=${user_id}`,
    withCredentials: true,
  });
};

export { socket, connectSocket };
