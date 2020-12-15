import React from "react";
import * as SQlite from "expo-sqlite";


//crea y abre la base de datos

const db = SQlite.openDatabase("Start-up.db");

//funcionalidades de la base de datos

//obtener las notas del usuario

const getDrama = (setDramaFunc) => {
  db.transaction((tx) => {
    tx.executeSql(

      "select * from drama",
      [],
      (_, { rows: { _array } }) => {
        setDramaFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener el drama ");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Dramas obtenidos");
      }
    );
  });
};

//obtener nota por ID
const getDramaById = (id, setDramaFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from drama where PKdramaID = ?",
      [id],
      (_, { rows: { _array } }) => {
        setNoteFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las dramas");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Drama obtenidas");
      }
    );
  });
};

// Insertar drama
const insertDrama = async (titulo, successFunc) => {
  const dato = titulo[0];
  const dato2 = titulo[1];
  db.transaction(
    (tx) => {
      tx.executeSql("insert into drama(titulo,descr) values (?,?)", [
        dato, dato2

      ]);
    },
    (_t, error) => {
      console.log("Error al insertar el drama");
      console.log(_t);
      console.log(error);
    },
    (_t, _success) => {
      successFunc;
    }
  );
};

// Borrar la base de datos
const dropDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("drop table drama");
      },
      (_t, error) => {
        console.log("Error al eliminar la tabla de drama");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
      }
    );
  });
};

// Creación de la tabla de Drama
const setupDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists drama (PKdramaID integer primary key autoincrement, titulo text not null, descr text not null);"
        );
      },
      (_t, error) => {
        console.log("Error al momento de crear la tabla");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        console.log("Tabla creada!");
        resolve(success);
      }
    );
  });
};

 const setupDramaAsync = async () => {
  return new Promise((resolve, reject) => {
    /* console.log("entro"); */
    db.transaction(
      (tx) => {
        tx.executeSql("insert into drama (titulo,descr) values (?,?)", [
          "Bienvenido a Start-Up",
          "NUEVA",
        ]);
      },
      (_t, error) => {
        console.log("Error al momento de insertar los valores por defecto");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        /* console.log("se creo"); */
        resolve(success);
      }
    );
  });
}; 



export const database = {
  getDrama,
  insertDrama,
  setupDatabaseTableAsync,
  dropDatabaseTableAsync,
  setupDramaAsync,
  getDramaById,

};