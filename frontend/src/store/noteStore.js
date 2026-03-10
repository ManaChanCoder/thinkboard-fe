import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const noteStore = create((set) => ({
  message: "",
  loading: false,
  rateLimit: false,
  notes: [],

  getNotes: async () => {
    set({ loading: true });
    try {
      const res = await axios.get(`${API_URL}/api/notes`);
      set({ notes: res.data.getNotesData, loading: false });
    } catch (error) {
      if (error.response?.status === 429) {
        set({ rateLimit: true, loading: false });
      } else {
        set({ message: error.message, loading: false });
      }
    }
  },

  createNote: async (payload) => {
    set({ loading: true, message: "" });

    const promise = axios.post(`${API_URL}/api/notes`, payload);

    toast.promise(promise, {
      loading: "Creating note...",
      success: (res) => res.data.message,
      error: (err) => err.response?.data?.message || "Failed to create note",
    });

    try {
      const res = await promise;

      set((state) => ({
        notes: [res.data.createNoteData, ...state.notes],
        loading: false,
        message: res.data.message,
      }));
      return true;
    } catch (error) {
      if (error.response?.status === 429) {
        set({ rateLimit: true, loading: false });
      } else {
        set({
          message: error.response?.data?.message || "Something went wrong",
          loading: false,
        });
      }
      console.error(error);
    }
  },

  updateNoteById: async (id, payload) => {
    set({ loading: true, message: "" });

    try {
      const res = await axios.put(`${API_URL}/api/notes/${id}`, payload);

      const updatedNote = res.data.updateNoteData;

      set((state) => ({
        notes: state.notes.map((note) =>
          note._id === id ? updatedNote : note,
        ),
        loading: false,
        message: res.data.message,
      }));
    } catch (error) {
      if (error.response?.status === 429) {
        set({ rateLimit: true, loading: false });
      } else {
        set({ message: error.message, loading: false });
      }
      console.error(error);
    }
  },

  deleteNoteById: async (id) => {
    set({ loading: true, message: "" });

    const promise = axios.delete(`${API_URL}/api/notes/${id}`);
    toast.promise(promise, {
      loading: "Deleting note...",
      success: (res) => res.data.message,
      error: (err) => err.response?.data?.message || "Failed to delete note",
    });

    try {
      const res = await promise;

      set((state) => ({
        notes: state.notes.filter((note) => note._id !== id),
        loading: false,
        message: res.data.message,
      }));
    } catch (error) {
      if (error.response?.status === 429) {
        set({ rateLimit: true, loading: false });
      } else {
        set({ message: error.message, loading: false });
      }
      console.error(error);
    }
  },
}));
