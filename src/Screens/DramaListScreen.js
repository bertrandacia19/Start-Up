import React, { useContext } from "react";
import  { StyleSheet } from "react-native";
import { Container, Content, Fab, Icon, List, ListItem, Text} from "native-base";

//use contexto de notas
import { Dramacontext } from "../context/Dramacontext";

const DramaListScreen = ({ navigation }) => {
    const { notes } = useContext(Dramacontext);
    return(
        <Container>
            <Content>
                <List>
                    {notes
                    ? notes.map((note) => (
                        <ListItem>
                            <Text key={note.id}>{note.note}</Text>
                        </ListItem>
                    ))
                    : null}
                </List>
                <Fab
                    active={true}
                    position="bottomRight"
                    style={{ backgroundColor: "ff0023"}}
                    direction="up"
                    onPress={() => {
                        navigation.navigate("noteCreate");

                    }}
                >
                    <Icon name="plus" type="FontAwesome"/>
                </Fab>
            </Content>
        </Container>
    )
}

const styles = StyleSheet.create({});

export default DramaListScreen;