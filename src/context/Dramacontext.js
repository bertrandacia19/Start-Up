import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const DramaContext = createContext({});

export const DramaContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { dramas: initialDramas, children } = props;

  // Almacenar los valores en el estado
  const [Dramas, setDramas] = useState(initialDramas);
  const [drama, setDrama] = useState("");

  // Cargar u obtener las notas
  useEffect(() => {
    refreshDramas();
  }, []);

  const refreshDramas = () => {
    return database.getDrama(setDramas);
  };


  const addNewDrama = async (drama) => {
    await database.insertDramas(drama, refreshDramas);
    return refreshDramas();

  };

  const getDramaById = (id) => {
    return database.getDramaById(id, setDrama);

    console.log(response);

    // Obtener el valor de la primera posición del arreglo
    // const value = note[0];
    // setNote(value);

    // console.log(value);
    // console.log(note);
  };

  // Crear el objeto de contexto
    const dramaContext = {
    Dramas, 
    drama,
    addNewDrama,
    getDramaById,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <DramaContext.Provider value={dramaContext}>
      {children}
    </DramaContext.Provider>
  );
};