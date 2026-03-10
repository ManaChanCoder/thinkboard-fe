import { themeStore } from "../store/themeStore";
import { IoClose } from "react-icons/io5";

export default function EditModal({ open, onClose, children }) {
  const isDark = themeStore((state) => state.isDark);

  if (!open) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
      <div
        className={`rounded-lg shadow-lg w-[400px] p-6 relative text-white ${isDark ? "bg-gray-800" : "bg-green-800"}`}
      >
        {/* Close Button */}
        <IoClose
          onClick={onClose}
          size={25}
          className="absolute top-3 right-3 hover:scale-110"
        />

        {children}
      </div>
    </div>
  );
}
