import { useState } from "react";
import { useNavigate } from "react-router-dom";
import header_image from "../assets/header_image.jpg";
import cutt_logo from "../assets/CUTT_LOGO.png";
import { Icon } from "@iconify/react";
import Leo from "../assets/leo.jpg";
import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Header = () => {
  const navigate = useNavigate();
  const [dropdownActive, setDropdownActive] = useState(false);
  const { auth } = useAuth();

  const signout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="relative h-32 my-4 bg-white-50 rounded-lg">
      <div className="absolute z-30 flex w-full h-full">
        <div className="relative z-30 w-5/6 px-6 py-8 text-white md:py-10 md:w-1/2">
          <Link to="/app">
            <img
              alt="Backoffice header"
              className="object-cover h-6"
              src={cutt_logo}
            />
          </Link>
          <span></span>
        </div>
        <div className="absolute top-0 right-0 flex w-full h-full">
          <div className="w-1/3 h-full bg-white-50"></div>
          <div className="relative w-1/3">
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-20 h-full text-white-50"
            >
              <polygon id="diagonal" points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
            <svg
              fill="currentColor"
              viewBox="0 0 100 100"
              className="absolute inset-y-0 z-10 h-full ml-6 text-white opacity-50"
            >
              <polygon points="0,0 100,0 50,100 0,100"></polygon>
            </svg>
          </div>
        </div>
      </div>
      <div className="absolute top-0 right-0 block w-9/12 h-full">
        <img
          alt="Backoffice header"
          className="object-cover h-full min-w-full"
          src={header_image}
        />
      </div>
      <div className="absolute top-1 right-1 z-50">
        <img
          className="w-16 h-16 rounded-full cursor-pointer"
          src={Leo}
          alt="Rounded avatar"
          onClick={() => setDropdownActive(!dropdownActive)}
          onMouseOver={() => setDropdownActive(!dropdownActive)}
        />
      </div>
      <div
        className={`${
          dropdownActive ? "block" : "hidden"
        } absolute top-20 right-10 bg-white-100`}
      >
        <div>
          <div className="font-bold text-black-50 border-3 border-b border-gray-500 p-3">
            <p>
              Hello, <span className="text-orange-500">{auth.name}</span>
            </p>
          </div>

          <div
            className="font-bold text-black-50 border-3 border-b border-gray-800 p-3 flex items-center cursor-pointer"
            onClick={signout}
          >
            <Icon icon="bx:log-out" />
            <p className="ml-2">Sign Out</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
