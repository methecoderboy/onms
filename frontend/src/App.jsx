import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";

import MainLayout from "./pages/MainLayout";
import Dashboard from "./pages/Dashboard";
import NoticeForm from "./pages/NoticeForm";

import AdminDashboard from "./pages/AdminDashboard";
import TeacherDashboard from "./pages/TeacherDashboard";
import SentNoticeList from "./pages/SentNoticeList";
import EditNoticeForm from "./pages/EditNoticeForm";
import AdminView from "./pages/AdminView";
import Profile from "./pages/Profile";

import RootLayout from "./pages/RootLayout";

function App() {
  const router = createBrowserRouter(
    [
      {
        index: true,
        element: <MainLayout />,
      },
      {
        path: "/",
        element: <RootLayout />,
        children: [
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
        ],
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
