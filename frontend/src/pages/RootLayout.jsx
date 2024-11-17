import { useEffect } from "react";
import { connectSocket, socket } from "../lib/socket";
import { useSelector } from "react-redux";

/* eslint-disable react/prop-types */
function RootLayout({ Children }) {
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "ONMS";
    if (!socket) {
      connectSocket(user._id);
    }
    socket?.on("connection", () => {
      console.log("I am connected");
    });
  }, [user]);

  return <div className="h-full w-full">{Children}</div>;
}

export default RootLayout;
