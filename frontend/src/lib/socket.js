import io from "socket.io-client";

let socket;
const url = "https://onms.onrender.com";

const connectSocket = (user_id) => {
  socket = io(url, {
    query: `user_id=${user_id}`,
  });
};

export { socket, connectSocket };
