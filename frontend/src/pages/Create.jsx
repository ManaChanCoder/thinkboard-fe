import { FaArrowLeft } from "react-icons/fa";
import { noteStore } from "../store/noteStore";
import { themeStore } from "../store/themeStore";

import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { minText } from "../utils/formatter";
export default function Create() {
  const isDark = themeStore((state) => state.isDark);
  const { createNote, loading } = noteStore();
  const navigate = useNavigate();

  const [formInput, setFormInput] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!minText(formInput.title, 10)) {
      toast.error("Title must have at least 10 characters!");
      return;
    }
    if (!minText(formInput.content, 30)) {
      toast.error("Content must have at least 30 characters!");
      return;
    }
    const success = await createNote(formInput);
    if (success) {
      setFormInput({
        title: "",
        content: "",
      });
    }
  };

  return (
    <main
      className={`px-5 py-5 sm:px-10 ${isDark ? "text-white" : "text-gray-800"}`}
    >
      <div
        onClick={() => navigate("/")}
        className="flex gap-3 items-center mb-10 cursor-pointer"
      >
        <FaArrowLeft size={20} />
        <span className="block">Back to Notes</span>
      </div>

      <div
        className={`p-5 rounded-md ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
      >
        <h1 className="text-xl mb-5">Create New Note</h1>

        <form action="" className="leading-5" onSubmit={handleSubmit}>
          <div className="mb-3 leading-8">
            <label htmlFor="">Title</label>
            <input
              type="text"
              name="title"
              value={formInput.title}
              onChange={handleChange}
              placeholder="Note title"
              className={`w-full border bg-transparent rounded-md px-2 py-1 outline-none ring-2 ring-transparent border-gray-400 ${isDark ? "focus:ring-green-500" : "focus:ring-blue-500"}`}
            />
          </div>
          <div className="leading-8 mb-5">
            <label htmlFor="">Content</label>
            <textarea
              name="content"
              value={formInput.content}
              id=""
              rows={4}
              onChange={handleChange}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
              placeholder="Note content [shift+enter to make new line]"
              className={`w-full border bg-transparent rounded-md px-2 py-1 outline-none ring-2 ring-transparent border-gray-400 ${isDark ? "focus:ring-green-500" : "focus:ring-blue-500"}`}
            ></textarea>
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? "Creating..." : "Create Note"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
