import { Link } from "react-router-dom";
import { themeStore } from "../store/themeStore";
import { dateFormatter, limitText, limitWord } from "../utils/formatter";

export default function Card({ note }) {
  const isDark = themeStore((state) => state.isDark);

  return (
    <main
      className={`
        p-5 rounded-lg border-t-8 leading-5 shadow-md text-white relative
        h-auto min-h-[210px] sm:min-h-[250px] md:min-h-[250px] lg:min-h-[250px]
        max-h-[350px] overflow-hidden
        transition-all duration-300 hover:scale-105
        ${isDark ? "bg-gray-800 border-green-800 hover:border-red-500" : "bg-green-800 border-gray-800 hover:border-blue-500"}
      `}
    >
      <Link
        to={`/note/${note._id}`}
        state={{ note: note._id }}
        className="block h-full"
      >
        <h3 className="text-xl font-bold capitalize mb-2 line-clamp-2">
          {limitText(note?.title || "", 50)}
        </h3>

        <p className="opacity-75 capitalize line-clamp-5">
          {limitWord(note?.content || "", 80)}
        </p>

        <div className="mt-4 absolute bottom-5 left-5 text-xs">
          {dateFormatter(note.createdAt)}
        </div>
      </Link>
    </main>
  );
}
