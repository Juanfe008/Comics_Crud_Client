import React, { useState } from "react";
import ComicList from "./components/ComicList";
import ComicForm from "./components/ComicForm";

function App() {
  const [comicToEdit, setComicToEdit] = useState(null);

  const handleEdit = (comic) => {
    setComicToEdit(comic);
  };

  const handleSave = () => {
    setComicToEdit(null);
  };

  return (
    <div>
      <h1>Gestión de Cómics</h1>
      <ComicForm comicToEdit={comicToEdit} onSave={handleSave} />
      <ComicList onEdit={handleEdit} />
    </div>
  );
}

export default App;
