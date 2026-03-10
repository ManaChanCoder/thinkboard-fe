import { FaArrowLeft } from "react-icons/fa";

import { themeStore } from "../store/themeStore";

export default function NoteDetail() {
  const isDark = themeStore((state) => state.isDark);
  return (
    <main
      className={`px-5 sm:px-10 ${isDark ? "text-white" : "text-gray-800"}`}
    >
      <div className="flex gap-3 items-center mb-5 cursor-pointer">
        <FaArrowLeft size={20} />
        <span className="block">Back to Notes</span>
      </div>

      <div
        className={`p-5 leading-5 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <h1 className="text-xl">Create New Note</h1>
      </div>
    </main>
  );
}
