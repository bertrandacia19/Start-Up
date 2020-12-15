import React, { useEffect, createContext, useState } from "react";
import { database } from "../components/db";

// Crear el contexto de las notas
export const DramasContext = createContext({});

export const DramasContextProvider = (props) => {
  // Obtener los valores iniciales para el contexto
  // se obtienen desde los props
  const { dramas: initialDrama, children } = props;

  // Almacenar los valores en el estado
  const [dramas, setDramas] = useState(initialDrama);
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

  const getDramasById = (id) => {
    return database.getDramasById(id, setDrama);

    console.log(response);

    // Obtener el valor de la primera posición del arreglo
    // const value = note[0];
    // setNote(value);

    // console.log(value);
    // console.log(note);
  };

  // Crear el objeto de contexto
  const dramasContext = {
    dramas,
    drama,
    addNewDrama,
    getDramasById,
  };

  // Pasar los valores al proveedor y retornarlo
  return (
    <DramasContext.Provider value={dramasContext}>
      {children}
    </DramasContext.Provider>
  );
};