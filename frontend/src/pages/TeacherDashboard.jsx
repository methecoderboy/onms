import { Power } from "lucide-react";
import img7 from "../assets/img7.png";
import img8 from "../assets/img8.png";
import img9 from "../assets/img9.png";
import img10 from "../assets/img10.png";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";

function TeacherDashboard() {
  const { user } = useSelector((state) => state.auth);
  const { isLoggedIn } = useSelector((state) => state.auth);

  const navigate = useNavigate();

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }
  return (
    <div className="h-full w-ful bg-slate-300">
      <header className="py-4 px-4 flex items-center justify-between ">
        <h1 className="font-Poppins text-3xl">TMSL | Dashboard</h1>
        <div className="flex items-center gap-3 pr-10">
          <span className="text-md   font-medium cursor-pointer text-black">
            {user.name}
          </span>
          <Power size={20} color="red" className="cursor-pointer" />
        </div>
      </header>
      <main className="px-12 py-14 flex justify-evenly flex-wrap gap-8">
        <div
          onClick={() => {
            navigate("/notice/create");
          }}
          className="h-[240px] w-[330px] p-2 bg-blue-300 flex items-center  justify-center gap-4 cursor-pointer rounded-lg hover:shadow-md active:scale-95 transition-all ease-in-out duration-200 border-white border-4"
        >
          <div className="rounded-lg overflow-hidden h-[140px] w-[140px]">
            <img src={img7} alt="img" className="h-[140px]" />
          </div>
          <span className="text-2xl font-Poppins font-medium ">
            Post New Notice
          </span>
        </div>
        <div
          onClick={() => navigate("/notice/list")}
          className="h-[240px] w-[330px] bg-blue-300 flex items-center  justify-center gap-1 cursor-pointer rounded-lg hover:shadow-md active:scale-95 transition-all ease-in-out duration-200 border-white border-4"
        >
          <div className="rounded-lg flex items-center justify-center overflow-hidden h-[140px] w-[140px]">
            <img src={img10} alt="img" className="h-[140px]" />
          </div>
          <span className="text-2xl font-Poppins font-medium ">
            View Notices
          </span>
        </div>
        <div
          onClick={() => navigate("/notice/sent-notices")}
          className="h-[240px] w-[330px] bg-blue-300 flex items-center p-4  justify-center gap-1 cursor-pointer rounded-lg hover:shadow-md active:scale-95 transition-all ease-in-out duration-200 border-white border-4"
        >
          <div className="rounded-lg flex items-center justify-center overflow-hidden h-[140px] w-[140px]">
            <img src={img8} alt="img" className="h-[140px]" />
          </div>
          <span className="text-2xl font-Poppins font-medium ">
            All Sent Notices
          </span>
        </div>
        <div className="h-[240px] w-[330px] bg-blue-300 flex items-center  justify-center gap-4 cursor-pointer rounded-lg hover:shadow-md active:scale-95 transition-all ease-in-out duration-200 border-white border-4">
          <div className="rounded-lg flex items-center justify-center overflow-hidden h-[140px] w-[140px]">
            <img src={img9} alt="img" className="h-[140px]" />
          </div>
          <span className="text-2xl font-Poppins font-medium ">Settings</span>
        </div>
      </main>
    </div>
  );
}

export default TeacherDashboard;
