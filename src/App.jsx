import React, { useState, useRef } from "react";
import ComicList from "./components/ComicList";
import ComicForm from "./components/ComicForm";
import "./components/ComicStyles.css"

function App() {
  const [comicToEdit, setComicToEdit] = useState(null);
  const fetchComicsRef = useRef(null);

  const handleEdit = (comic) => {
    setComicToEdit(comic);
  };

  const handleSave = () => {
    setComicToEdit(null);
    if (fetchComicsRef.current) {
      fetchComicsRef.current(); // Llamar a fetchComics después de guardar
    }
  };

  return (
    <div>
      <h1>Gestión de Cómics</h1>
      <ComicForm comicToEdit={comicToEdit} onSave={handleSave} />
      <ComicList onEdit={handleEdit} onFetchComics={(fetchComics) => (fetchComicsRef.current = fetchComics)} />
    </div>
  );
}

export default App;
