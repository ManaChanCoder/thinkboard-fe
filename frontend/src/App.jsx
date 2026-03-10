import { Route, Routes } from "react-router-dom";
import Create from "./pages/Create";
import Home from "./pages/Home";
import NoteDetail from "./pages/NoteDetail";
import { themeStore } from "./store/themeStore";

const App = () => {
  const isDark = themeStore((state) => state.isDark);
  const themeClass = isDark ? "forest" : "light";
  return (
    <div className="h-screen w-full" data-theme={themeClass}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Create />} />
        <Route path="/note/:id" element={<NoteDetail />} />
      </Routes>
    </div>
  );
};

export default App;
