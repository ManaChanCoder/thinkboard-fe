import { FaArrowLeft } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";
import { MdDeleteOutline } from "react-icons/md";
import EditModal from "../components/EditModal";

import { Link, useLocation, useNavigate } from "react-router-dom";

import { themeStore } from "../store/themeStore";
import { noteStore } from "../store/noteStore";
import { useEffect, useState } from "react";
import { minText } from "../utils/formatter";
import toast from "react-hot-toast";
export default function NoteDetail() {
  const isDark = themeStore((state) => state.isDark);
  const { getNoteById, updateNoteById, deleteNoteById, notes, loading } =
    noteStore();
  const location = useLocation();
  const navigate = useNavigate();
  const noteId = location.state?.note;

  const [modalOpen, setModalOpen] = useState(false);
  const [formInput, setFormInput] = useState({
    title: "",
    content: "",
  });

  useEffect(() => {
    if (!noteId) return;

    getNoteById(noteId);
  }, [noteId]);

  const handleDelete = async (id) => {
    navigate("/");
    await deleteNoteById(id);
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setFormInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const currentNote = notes.find((n) => n._id === noteId);

  const handleOpenModal = (note) => {
    setModalOpen(true);
    setFormInput({
      title: note.title,
      content: note.content,
    });
  };

  const handleUpdateSubmit = async (e) => {
    e.preventDefault();

    if (!minText(formInput.title, 10)) {
      toast.error("Title must have at least 10 characters!");
      return;
    }
    if (!minText(formInput.content, 30)) {
      toast.error("Content must have at least 30 characters!");
      return;
    }

    const success = await updateNoteById(noteId, formInput);
    if (success) setModalOpen(false);
  };

  return (
    <div
      className={`px-5 py-5 sm:px-10 h-full ${isDark ? "text-white" : "text-gray-800"}`}
    >
      <Link to={"/"}>
        <div className="flex gap-3 items-center mb-5 cursor-pointer">
          <FaArrowLeft size={20} />
          <span className="block">Back to Notes</span>
        </div>
      </Link>

      <div
        className={`p-5 my-16 leading-5 ${isDark ? "bg-gray-800" : "bg-gray-200"}`}
      >
        {loading ? (
          <p>Loading...</p>
        ) : (
          currentNote && (
            <div key={currentNote._id}>
              <h1 className="text-3xl font-bold capitalize mb-10">
                {currentNote.title}
              </h1>
              <p className="whitespace-pre-wrap mb-10">{currentNote.content}</p>

              <div className="flex justify-end">
                <div className="flex gap-3 items-center">
                  <div
                    onClick={() => handleOpenModal(currentNote)}
                    className="btn btn-success h-14 w-14"
                  >
                    <FiEdit size={20} className="text-white" />
                  </div>
                  <div
                    onClick={() => handleDelete(noteId)}
                    className="btn btn-danger h-14 w-14"
                  >
                    <MdDeleteOutline size={20} className="text-red-400" />
                  </div>
                </div>
              </div>
            </div>
          )
        )}

        {modalOpen && (
          <EditModal open={modalOpen} onClose={() => setModalOpen(!open)}>
            <form action="" onSubmit={handleUpdateSubmit}>
              <div className="flex flex-col gap-2 mb-4">
                <label htmlFor="">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formInput.title}
                  onChange={handleOnChange}
                  placeholder="Type your title"
                  className={`w-full h-10 border bg-transparent rounded-md px-2 py-1 outline-none ring-2 ring-transparent border-gray-400 ${isDark ? "focus:ring-green-500" : "focus:ring-blue-500"}`}
                />
              </div>
              <div className="flex flex-col gap-2 mb-8">
                <label htmlFor="">Content</label>
                <textarea
                  name="content"
                  value={formInput.content}
                  onChange={handleOnChange}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleUpdateSubmit(e);
                    }
                  }}
                  rows={5}
                  id=""
                  placeholder="Type your content"
                  className={`w-full border bg-transparent rounded-md px-2 py-1 outline-none ring-2 ring-transparent border-gray-400 ${isDark ? "focus:ring-green-500" : "focus:ring-blue-500"}`}
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 items-center">
                <button
                  onClick={() => setModalOpen(false)}
                  className="btn btn-danger"
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-success">
                  Edit
                </button>
              </div>
            </form>
          </EditModal>
        )}
      </div>
    </div>
  );
}
