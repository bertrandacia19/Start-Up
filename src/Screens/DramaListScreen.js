import React, { useContext } from "react";
import  { StyleSheet } from "react-native";
import { Container, Content, Fab, Icon, List, ListItem, Text, Body, Right} from "native-base";


//use contexto de notas
import { Dramacontext } from "../context/Dramacontext";

const DramaListScreen = ({ navigation }) => {
    const { dramas } = useContext(Dramacontext);
    return(
        <Container>
            <Content>
                <List>
                    {dramas
                    ? dramas.map((drama) => (
                        <ListItem
                        key={drama.PKdramaID.toString()}
                        onPress={() => {
                            navigation.navigate("noteModify", {id: drama.PKdramaID});
                        }}
                        >
                            <Body>
                            <Text numberOfLines={2}>{drama.drama}</Text>
                            </Body>
                            <Right>
                                <Icon name="arrow-foward"/>
                            </Right>
                        </ListItem>
                    ))
                    : null}
                </List>
                </Content>
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
        </Container>
    );
};

const styles = StyleSheet.create({});

export default DramaListScreen;