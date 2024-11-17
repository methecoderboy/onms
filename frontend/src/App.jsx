import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard";
import NoticeForm from "./pages/NoticeForm";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import SentNoticeList from "./pages/SentNoticeList";
import EditNoticeForm from "./pages/EditNoticeForm";
import AdminView from "./pages/AdminView";
import Profile from "./pages/Profile";
import { useEffect } from "react";
import { connectSocket, socket } from "./lib/socket";
import { fetchAllNotices } from "./app/slices/notice";

function App() {
  const router = createBrowserRouter(
    [
      {
        path: "/",
        index: true,
        element: <MainLayout />,
      },

      {
        path: "/student/dashboard",
        element: <Dashboard />,
      },
      {
        path: "/student/profile",
        element: <Profile />,
      },
      {
        path: "/admin/dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "/teacher/dashboard",
        element: <TeacherDashboard />,
      },
      {
        path: "/notice/create",
        element: <NoticeForm />,
      },
      {
        path: "/notice/sent-notices",
        element: <SentNoticeList />,
      },
      {
        path: "/notice/edit/:id",
        element: <EditNoticeForm />,
      },
      {
        path: "/notice/list",
        element: <AdminView />,
      },
      {
        path: "/auth/login",
        element: <Login />,
      },
    ],
    {
      future: {
        v7_normalizeFormMethod: true,
        v7_fetcherPersist: true,
        v7_partialHydration: true,
        v7_relativeSplatPath: true,
      },
    }
  );

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
    <div className="App overflow-auto">
      <RouterProvider
        router={router}
        future={{
          v7_startTransition: true,
        }}
      />
    </div>
  );
}

export default App;
