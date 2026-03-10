import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import { themeStore } from "../store/themeStore";
import { dateFormatter } from "../utils/formatter";

export default function Card({ note, onDelete }) {
  const isDark = themeStore((state) => state.isDark);
  return (
    <main
      className={`p-5 rounded-lg border-t-8 leading-5 shadow-md text-white ${isDark ? "bg-gray-800 border-green-800" : "bg-green-800 border-gray-800"}`}
    >
      <h3 className="text-xl font-bold capitalize">{note.title}</h3>
      <p className="opacity-75 capitalize">{note.content}</p>

      <div className="flex justify-between items-center mt-4">
        <span className="block text-xs">{dateFormatter(note.createdAt)}</span>

        <div className="flex gap-3">
          <FiEdit size={20} className="text-green-600" />
          <MdDeleteOutline
            size={20}
            className="text-red-400"
            onClick={onDelete}
          />
        </div>
      </div>
    </main>
  );
}
