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
import { DramaContext } from "../Context/DramaContext";

const AddListScreen = ({ navigation }) => {
    const [drama, setDrama] = useState("");
    const [fontsLoaded, setFontsLoaded] = useState(false);
    const [enableSave, setEnableSave] = useState(true);
    const [errorNote, setErrorNote] = useState(false);
    const dramaContext = useContext(DramaContext);
    const { addNewDrama, refreshDramas } = dramaContext;
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
    const handlerNewNote = async () => {
        // Validar que la nota tiene valor
        if (note) {
            await addNewNote(note, refreshNotes);

            // Regresar a la pantalla anterior
            navigation.goBack();
        } else {
            setErrorNote(true);
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
                <H1>Ingresa tu nota</H1>
                <Textarea
                  rowSpan={5}
                  bordered
                  placeholder="Escribe algo..."
                  value={drama}
                  onChangeText={setDrama}
                  style={errorNote ? styles.inputError : styles.note}
                />
                {errorNote ? (
                  <Text style={styles.error}>¡Debes ingresar una nota!</Text>
                ) : null}
                <Button
                  style={styles.button}
                  onPress={handlerNewNote}
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
    note: {
      borderColor: "black",
      marginBottom: 10,
    },
 

});
  

export default AddListScreen;