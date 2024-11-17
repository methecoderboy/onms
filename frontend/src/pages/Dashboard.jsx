import { useEffect } from "react";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import Nav from "./Nav";
import NoticeList from "./NoticeList";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllNotices } from "../app/slices/notice";
import DisplayNotice from "./DisplayNotice";
import { Navigate } from "react-router-dom";

function Dashboard() {
  const dispatch = useDispatch();
  const { selectedNotice } = useSelector((state) => state.notice);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    document.title = "Dashboard";
    dispatch(fetchAllNotices());
  }, [dispatch]);

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return (
    <div className="h-full w-full">
      <ResizablePanelGroup direction="horizontal" className={"h-full w-full"}>
        <div
          // defaultSize={20}
          // minSize={15}
          // maxSize={20}
          // collapsible={true}
          // collapsedSize={5}
          // onCollapse={() => setIsCollapsed(true)}
          // onResize={() => setIsCollapsed(false)}
          className={`max-w-[320px] lg:w-[320px] w-20 transition-all duration-100 ease-in-out ${
            selectedNotice && "show"
          } `}
        >
          <Nav />
        </div>
        <ResizableHandle withHandle />
        <ResizablePanel
          minSize={50}
          className={`w-[560px] max-w-full ${selectedNotice && "show"}`}
        >
          <div className={"h-full flex-grow bg-white"}>
            <NoticeList />
          </div>
        </ResizablePanel>
        {selectedNotice && (
          <>
            <ResizableHandle withHandle />
            <div
              // defaultSize={50}
              // minSize={40}
              // collapsible={false}
              // collapsedSize={0}
              className="w-[560px] max-w-full m h-full transition-all duration-100 ease-in-out "
            >
              <DisplayNotice />
            </div>
          </>
        )}
      </ResizablePanelGroup>
    </div>
  );
}

export default Dashboard;
