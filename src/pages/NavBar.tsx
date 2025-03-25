import {
  Navbar,
  NavbarBrand,
  NavbarCollapse,
  NavbarLink
} from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  MapIcon,
  ChartBarIcon,
  ClipboardListIcon
} from "@heroicons/react/outline";

export const NavBar: React.FC = () => {
  const location = useLocation();

  return (
    <Navbar
      fluid
      rounded
      className="py-5 bg-gray-100 border-b-1 border-indigo-200 rounded-none"
    >
      <NavbarBrand>
        <Link to="/" className="flex items-center">
          <img
            src="/src/assets/edgital-logo.png"
            className="mr-3 h-6 sm:h-9"
            alt="edgital Logo"
          />
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Maps
          </span>
        </Link>
      </NavbarBrand>
      <div className="flex flex-grow ml-15">
        <NavbarCollapse>
          <NavbarLink
            className={location.pathname === "/" ? " text-blue-500" : ""}
          >
            <Link to="/" className="flex items-center">
              <MapIcon className="mr-2 h-5" />
              Maps
            </Link>
          </NavbarLink>
          <NavbarLink
            className={
              location.pathname === "/statistics" ? " text-blue-500" : ""
            }
          >
            <Link to="/statistics" className="flex items-center">
              <ChartBarIcon className="mr-2 h-5" />
              Statistics
            </Link>
          </NavbarLink>
          <NavbarLink
            className={location.pathname === "/todos" ? " text-blue-500" : ""}
          >
            <Link to="/todos" className="flex items-center">
              <ClipboardListIcon className="mr-2 h-5" />
              ToDos
            </Link>
          </NavbarLink>
        </NavbarCollapse>
      </div>
    </Navbar>
  );
};
