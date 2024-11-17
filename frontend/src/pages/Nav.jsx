/* eslint-disable react/prop-types */
import { BellDot, CircleUser, Power } from "lucide-react";
import { useDispatch } from "react-redux";
import { NavLink } from "react-router-dom";
import { Logout } from "../app/slices/auth";

const NavItems = [
  {
    Icon: BellDot,
    text: "All Notices",
    to: "/student/dashboard",
  },
  {
    Icon: CircleUser,
    text: "My Profile",
    to: "/student/profile",
  },
];

function Nav() {
  const dispatch = useDispatch();
  return (
    <nav className="navbar h-full w-full flex flex-col gap-4">
      <header className="lg:pl-6 py-2 flex items-center lg:justify-start justify-center gap-2 border-b-2">
        <h1 className="font-medium text-lg">ONMS</h1>
      </header>
      <ul className={`nav-list px-4  flex flex-col items-center gap-2`}>
        {NavItems.map(({ Icon, text, to }) => (
          <li className="h-9 w-10 lg:w-full " key={text}>
            <NavLink
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "flex items-center gap-3 h-full w-full rounded-sm bg-black text-white lg:justify-start justify-center lg:px-2"
                  : "flex items-center gap-3 h-full w-full rounded-sm bg-white text-black hover:bg-slate-200 lg:justify-start justify-center lg:px-2"
              }
            >
              <Icon size={18} />

              <span className="text-sm font-medium lg:block hidden">
                {text}
              </span>
            </NavLink>
          </li>
        ))}
        <li className="h-9 w-10 lg:w-full ">
          <div
            className={
              "flex items-center gap-3 h-full w-full rounded-sm bg-white  lg:justify-start justify-center lg:px-2 cursor-pointer"
            }
            onClick={() => {
              dispatch(Logout());
            }}
          >
            <Power size={18} color="red" />

            <span className="text-sm font-medium lg:block hidden">Logout</span>
          </div>
        </li>
      </ul>
    </nav>
  );
}

export default Nav;
