/* eslint-disable react/prop-types */
import { BellDot, CircleUser, Settings } from "lucide-react";
import { NavLink } from "react-router-dom";
// import {
//   Accordion,
//   AccordionContent,
//   AccordionItem,
//   AccordionTrigger,
// } from "@/components/ui/accordion";

// import { cn } from "@/lib/utils";

// const NavItems = [
//   {
//     icon: <BellDot size={16} />,
//     text: "All Notices",
//   },
//   {
//     icon: <Send size={16} />,
//     text: "Sent",
//   },
//   {
//     icon: <Star size={16} />,
//     text: "Starred",
//   },
//   {
//     icon: <Settings size={16} />,
//     text: "Settings",
//   },
// ];
const NavItems = [
  {
    Icon: BellDot,
    text: "All Notices",
    to: "/student/dashboard",
  },
  // {
  //   Icon: Send,
  //   text: "Sent",
  //   to: "/student/sent",
  // },
  // {
  //   Icon: Star,
  //   text: "Starred",
  //   to: "/student/starred",
  // },
  {
    Icon: CircleUser,
    text: "My Profile",
    to: "/student/profile",
  },
];

function Nav() {
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
      </ul>
    </nav>
  );
}

export default Nav;
