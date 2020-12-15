import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const DramaContext = createContext({});

export const DramaContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { Drama: initialNotes, children } = props;

  // Almacenar los valores en el estado
  const [Drama, setDrama] = useState(initialNotes);
  const [drama, setNote] = useState("");

  // Cargar u obtener las notas
  useEffect(() => {
    refreshDrama();
  }, []);

  const refreshDrama = () => {
    return database.getDrama(setDrama);
  };

  const addNewNote = async (drama) => {
    await database.insertDrama(drama, refreshDrama);
    return refreshDrama();
  };

  const getDramaById = (id) => {
    return database.getDramaById(id, setdrama);

    console.log(response);

    // Obtener el valor de la primera posición del arreglo
    // const value = note[0];
    // setNote(value);

    // console.log(value);
    // console.log(note);
  };

  // Crear el objeto de contexto
  const dramaContext = {
    Drama,
    drama,
    addNewNote,
    getDramaById,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <dramaContext.Provider value={dramaContext}>
      {children}
    </dramaContext.Provider>
  );
};