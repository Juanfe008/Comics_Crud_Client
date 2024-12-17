import React, { useState, useEffect } from "react";
import { createComic, updateComic } from "../services/api";

const ComicForm = ({ comicToEdit, onSave }) => {
  const [comic, setComic] = useState({
    title: "",
    description: "",
    author: "",
    price: "",
    stock: "",
  });

  useEffect(() => {
    if (comicToEdit) {
      setComic(comicToEdit);
    }
  }, [comicToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic({ ...comic, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (comic.id) {
      await updateComic(comic.id, comic);
    } else {
      await createComic(comic);
    }
    onSave();
    setComic({ title: "", description: "", author: "", price: "", stock: "" });
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{comic.id ? "Editar Cómic" : "Agregar Cómic"}</h2>
      <input
        type="text"
        name="title"
        placeholder="Título"
        value={comic.title}
        onChange={handleChange}
        required
      />
      <input
        type="text"
        name="description"
        placeholder="Descripción"
        value={comic.description}
        onChange={handleChange}
      />
      <input
        type="text"
        name="author"
        placeholder="Autor"
        value={comic.author}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="price"
        placeholder="Precio"
        value={comic.price}
        onChange={handleChange}
        required
      />
      <input
        type="number"
        name="stock"
        placeholder="Stock"
        value={comic.stock}
        onChange={handleChange}
        required
      />
      <button type="submit">{comic.id ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default ComicForm;
