import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";
import logo from "../assets/map.svg";

const NavBar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <nav className=" py-3 shadow-[rgba(0,0,0 /0.1)_0px_10px_0px_0px] flex justify-between">
        <Link to="/">
          {/* <img src={logo} alt="logo" className="w-20"  /> */}
          <div className="bg-transparent dark:bg-transparent h-12 ml-5 rounded-lg flex ">
            <div className="flex justify-center items-center">
              <img
                src={logo}
                alt=""
                className="w-12 flex justify-center items-center"
              />
            </div>
            <h1 className="text-2xl font-extrabold  text-black white mt-2 dark:text-white hidden xl:block md:block ">
              Navi-Tourism
            </h1>
          </div>
        </Link>

        <div className="relative flex items-center cursor-pointer px-5">
          <input
            type="checkbox"
            id="darkModeSwitch"
            checked={darkMode}
            onChange={toggleDarkMode}
            className="hidden cursor-pointer"
          />
          <label
            htmlFor="darkModeSwitch"
            className={`bg-white dark:bg-transparent w-14 h-8 rounded-full p-1 flex items-center transition duration-300  border border-black dark:border-white  cursor-pointer`}
          >
            <div
              className={`bg-black dark:bg-white w-6 h-6 rounded-full cursor-pointer shadow-lg transform ${
                darkMode ? "translate-x-6" : ""
              } transition-transform `}
            ></div>
          </label>
          {darkMode ? (
            <CiLight className="text-4xl ml-2 text-white" />
          ) : (
            <MdDarkMode className="text-3xl ml-2 " />
          )}
        </div>
      </nav>
    </>
  );
};

export default NavBar;
