import React, { useEffect, useState } from "react";
import { getComics, deleteComic } from "../services/api";
import "./ComicStyles.css";

const ComicList = ({ onEdit, onFetchComics }) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    const response = await getComics();
    setComics(response.data);
    if (onFetchComics) onFetchComics(fetchComics); // Pasar la función hacia arriba
  };

  const handleDelete = async (id) => {
    try {
      await deleteComic(id);
      fetchComics(); // Refrescar el listado después de eliminar
    } catch (error) {
      console.error("Error al eliminar el cómic:", error);
    }
  };

  return (
    <div>
      <h2>Lista de Cómics</h2>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            {comic.title} - {comic.author} (${comic.price}) ({comic.stock})
            <button onClick={() => onEdit(comic)}>Editar</button>
            <button onClick={() => handleDelete(comic.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicList;