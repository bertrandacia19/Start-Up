import React, { useContext, useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import {
  Button,
  Container,
  Content,
  H1,
  Text,
  Textarea,
  Spinner,
  View,
} from "native-base";
import * as Font from "expo-font";

// Importar el contexto de las notas
import { DramasContext } from "../context/DramaContext";

const AddListScreen = ({ navigation }) => {
  const [drama, setDrama] = useState("");
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [enableSave, setEnableSave] = useState(true);
  const [errorDrama, setErrorDrama] = useState(false);
  const dramasContext = useContext(DramasContext);
  const { addNewDrama, refreshDramas } = dramasContext;

  // Cargar la fuente de manera asíncrona
  useEffect(() => {
    const loadFontsAsync = async () => {
      await Font.loadAsync({
        Roboto_medium: require("native-base/Fonts/Roboto_medium.ttf"),
      }).then(() => {
        setFontsLoaded(true);
      });
    };

    loadFontsAsync();
  }, []);

  // Ejecutar el efecto cuando el valor de la nota cambie
  useEffect(() => {
    if (drama) setEnableSave(false);
    else setEnableSave(true);
  }, [drama]);

  const handlerNewDrama = async () => {
    // Validar que la nota tiene valor
    if (drama) {
      await addNewDrama(drama, refreshDramas);

      // Regresar a la pantalla anterior
      navigation.goBack();
    } else {
      setErrorDrama(true);
    }
  };

  if (!fontsLoaded)
    return (
      <Content contentContainerStyle={styles.content}>
        <Spinner color="blue" />
      </Content>
    );

  return (
    <Content>
      <Container style={styles.container}>
        <H1>Ingresa El dorama</H1>
        <Textarea
          rowSpan={5}
          bordered
          placeholder="Escribe la descrpción del dorama..."
          value={drama}
          onChangeText={setDrama}
          style={errorDrama ? styles.inputError : styles.drama}
        />
        {errorDrama ? (
          <Text style={styles.error}>¡Debes ingresar el dorama!</Text>
        ) : null}
        <Button
          style={styles.button}
          onPress={handlerNewDrama}
          // disabled={enableSave}
        >
          <Text>Guardar</Text>
        </Button>
      </Container>
    </Content>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    justifyContent: "center",
  },
  container: {
    padding: 10,
  },
  button: {
    fontFamily: "Roboto",
  },
  error: {
    fontSize: 12,
    color: "red",
    marginBottom: 10,
  },
  inputError: {
    borderColor: "red",
  },
  drama: {
    borderColor: "black",
    marginBottom: 10,
  },
});

export default AddListScreen ;
