import { useEffect } from "react";
import Card from "../components/Card";
import Navbar from "../components/Navbar";
import RateLimit from "../components/RateLimit";
import { noteStore } from "../store/noteStore";

export default function Home() {
  const { getNotes, notes, rateLimit, loading } = noteStore();

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <main>
      <Navbar />

      <div className="px-5 sm:px-10 pt-12">
        {rateLimit && <RateLimit />}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
          {loading ? (
            <p className="text-center text-white block w-full col-span-full">
              Loading...
            </p>
          ) : notes.length > 0 && !rateLimit ? (
            notes.map((note, index) => (
              <Card key={note?._id || index} note={note || {}} />
            ))
          ) : (
            <span className="text-center text-white block w-full col-span-full">
              No notes available or too many request.
            </span>
          )}
        </div>
      </div>
    </main>
  );
}
