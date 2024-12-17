import React, { useEffect, useState } from "react";
import { getComics, deleteComic } from "../services/api";

const ComicList = ({ onEdit }) => {
  const [comics, setComics] = useState([]);

  useEffect(() => {
    fetchComics();
  }, []);

  const fetchComics = async () => {
    const response = await getComics();
    setComics(response.data);
  };

  const handleDelete = async (id) => {
    await deleteComic(id);
    fetchComics();
  };

  return (
    <div>
      <h2>Lista de Cómics</h2>
      <ul>
        {comics.map((comic) => (
          <li key={comic.id}>
            {comic.title} - {comic.author} (${comic.price})
            <button onClick={() => onEdit(comic)}>Editar</button>
            <button onClick={() => handleDelete(comic.id)}>Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ComicList;