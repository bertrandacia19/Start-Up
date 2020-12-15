import React from "react";
import * as SQLite from "expo-sqlite";

// https://docs.expo.io/versions/latest/sdk/sqlite/
// Crea y abre la base de datos
const db = SQLite.openDatabase("Start-up.db");

// Funcionalidades de la base de datos

// Obtener las notas del usuario
const getDrama = (setDramaFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from dramas",
      [],
      (_, { rows: { _array } }) => {
        setDramaFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las notas de los dramas");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Notas obtenidas");
      }
    );
  });
};

// Obtener la nota por el id
const getDramaById = (id, setDramaFunc) => {
  db.transaction((tx) => {
    tx.executeSql(
      "select * from dramas where id = ?",
      [id],
      (_, { rows: { _array } }) => {
        setDramaFunc(_array);
      },
      (_t, error) => {
        console.log("Error al momento de obtener las descripciones de los dramas");
        console.log(error);
      },
      (_t, _success) => {
        console.log("Nota obtenidas");
      }
    );
  });
};

// Insertar notas
const insertDramas = async (drama, successFunc) => {
  db.transaction(
    (tx) => {
      tx.executeSql("insert into dramas (drama, status) values (?,?)", [
        drama,
        "NUEVA",
      ]);
    },
    (_t, error) => {
      console.log("Error al insertar la descripción de los doramas");
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
        tx.executeSql("drop table notes");
      },
      (_t, error) => {
        console.log("Error al eliminar la tabla de notas");
        reject(error);
      },
      (_t, result) => {
        resolve(result);
      }
    );
  });
};

// Creación de la tabla de notas
const setupDatabaseTableAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists dramas (id integer primary key autoincrement, drama text not null, status text not null);"
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

// Agrega una nota por defecto
const setupDramasAsync = async () => {
  return new Promise((resolve, reject) => {
    db.transaction(
      (tx) => {
        tx.executeSql("insert into dramas (drama, status) values (?,?)", [
          "Bienvenido a Start-up",
          "NUEVA",
        ]);
      },
      (_t, error) => {
        console.log("Error al momento de insertar los valores por defecto");
        console.log(error);
        reject(error);
      },
      (_t, success) => {
        resolve(success);
      }
    );
  });
};

export const database = {
  getDrama,
  insertDramas,
  dropDatabaseTableAsync,
  setupDatabaseTableAsync,
  setupDramasAsync,
  getDramaById,
};