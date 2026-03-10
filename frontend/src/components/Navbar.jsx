import { GoPlus } from "react-icons/go";
import { Link } from "react-router-dom";
import { IoMoonSharp } from "react-icons/io5";
import { IoSunnyOutline } from "react-icons/io5";
import { themeStore } from "../store/themeStore";

export default function Navbar() {
  const { isDark, toggleTheme } = themeStore();
  return (
    <header
      className={`py-4 px-5 sm:px-20 flex justify-between items-center ${isDark ? "bg-gray-900" : "bg-green-800"}`}
    >
      <h1 className="text-2xl text-green-500 font-mono tracking-tight">
        ThinkBoard
      </h1>

      <div className="flex gap-5 items-center">
        <Link to="/create">
          <button className="btn btn-success text-white">
            <GoPlus size={20} />
            Create Note
          </button>
        </Link>
        {isDark ? (
          <div onClick={toggleTheme} className="rounded-full bg-gray-100 p-2">
            <IoSunnyOutline
              size={30}
              className="text-yellow-500 cursor-pointer"
            />
          </div>
        ) : (
          <div onClick={toggleTheme} className="rounded-full bg-gray-400 p-2">
            <IoMoonSharp size={30} className="text-gray-800 cursor-pointer" />
          </div>
        )}
      </div>
    </header>
  );
}
