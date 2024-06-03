import { Link } from "react-router-dom";
import { useDarkMode } from "../DarkModeContext";
import { CiLight } from "react-icons/ci";
import { MdDarkMode } from "react-icons/md";

const NavBar = () => {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <>
      <nav className=" py-3 shadow-[rgba(0,0,0 /0.1)_0px_10px_0px_0px] flex justify-between">
        <Link to="/">
          <img src="" alt="logo" className="p-3" />
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
