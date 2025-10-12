import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink
} from "flowbite-react";
import { useLocation } from "react-router-dom";
import {
  MapIcon,
  ChartBarIcon,
  ClipboardListIcon
} from "@heroicons/react/outline";
import logo from "../assets/maps.svg";

export const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar
      fluid
      rounded
      className="py-5 bg-gray-100 border-b-1 border-indigo-200 rounded-none"
    >
      <NavbarBrand href="/" className="flex items-center">
        <img
          src={logo}
          className="h-8 sm:h-10"
          alt="Maps Logo"
        />
      </NavbarBrand>
      <div className="flex flex-grow ml-15">
        <NavbarCollapse>
          <NavbarLink
            href="/"
            className={`flex items-center${
              location.pathname === "/" ? " text-blue-500" : ""
            }`}
          >
            <MapIcon className="mr-2 h-5" />
            Maps
          </NavbarLink>
          <NavbarLink
            href="/statistics"
            className={`flex items-center${
              location.pathname === "/statistics" ? " text-blue-500" : ""
            }`}
          >
            <ChartBarIcon className="mr-2 h-5" />
            Statistics
          </NavbarLink>
          <NavbarLink
            href="/todos"
            className={`flex items-center${
              location.pathname === "/todos" ? " text-blue-500" : ""
            }`}
          >
            <ClipboardListIcon className="mr-2 h-5" />
            ToDos
          </NavbarLink>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
};
