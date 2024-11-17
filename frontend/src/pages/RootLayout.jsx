import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { connectSocket, socket } from "../lib/socket";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotices } from "../app/slices/notice";

function RootLayout() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    document.title = "ONMS";
    if (!socket) {
      connectSocket(user?._id);
    }
    socket?.on("connection", () => {
      console.log("I am connected");
    });

    socket?.on("new_notice", () => {
      dispatch(fetchAllNotices());
    });

    return () => {
      socket?.off("connection");
      socket?.off("new_notice");
    };
  }, [user, dispatch]);

  return (
    <div className="h-full w-full">
      <Outlet />
    </div>
  );
}

export default RootLayout;
