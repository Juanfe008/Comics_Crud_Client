import React, { useState, useEffect } from "react";
import { createComic, updateComic } from "../services/api";
import "./ComicStyles.css";

const ComicForm = ({ comicToEdit, onSave }) => {
  const initialState = {
    title: "",
    description: "",
    author: "",
    price: "",
    stock: "",
  };

  const [comic, setComic] = useState(initialState);

  useEffect(() => {
    if (comicToEdit) {
      setComic(comicToEdit);
    } else {
      setComic(initialState);
    }
  }, [comicToEdit]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setComic((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (comic.id) {
        await updateComic(comic.id, comic);
      } else {
        await createComic(comic);
      }
      onSave(); // Notifica al padre que la acción se realizó
    } catch (error) {
      console.error("Error al guardar el cómic:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>{comic.id ? "Editar Cómic" : "Agregar Cómic"}</h2>
      <div>
        <input
          type="text"
          name="title"
          placeholder="Título"
          value={comic.title}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="text"
          name="description"
          placeholder="Descripción"
          value={comic.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <input
          type="text"
          name="author"
          placeholder="Autor"
          value={comic.author}
          onChange={handleChange}
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="price"
          placeholder="Precio"
          value={comic.price}
          onChange={handleChange}
          min="0"
          step="0.01"
          required
        />
      </div>
      <div>
        <input
          type="number"
          name="stock"
          placeholder="Stock"
          value={comic.stock}
          onChange={handleChange}
          min="0"
          required
        />
      </div>
      <button type="submit">{comic.id ? "Actualizar" : "Agregar"}</button>
    </form>
  );
};

export default ComicForm;
