import React, { useContext } from "react";
import { StyleSheet } from "react-native";
import {
  Container,
  Content,
  Fab,
  Icon,
  List,
  ListItem,
  Text,
  Body,
  Right,
} from "native-base";

// Utilizar el contexto de notas
import { DramaContext } from "../context/DramaContext";

const DramaListScreen = ({ navigation }) => {
  const { dramas } = useContext(DramaContext);

  return (
    <Container>
      <Content>
        <List>
          {dramas
            ? dramas.map((drama) => (
                <ListItem
                  key={drama.id.toString()}
                  onPress={() => {
                    navigation.navigate("noteModify", { id: drama.id });
                  }}
                >
                  <Body>
                    <Text numberOfLines={2}>{drama.drama}</Text>
                  </Body>
                  <Right>
                    <Icon name="arrow-forward" />
                  </Right>
                </ListItem>
              ))
            : null}
        </List>
      </Content>
      <Fab
        active={true}
        position="bottomRight"
        style={{ backgroundColor: "#ff0023" }}
        direction="up"
        onPress={() => {
          navigation.navigate("noteCreate");
        }}
      >
        <Icon name="plus" type="FontAwesome" />
      </Fab>
    </Container>
  ); 
};

const styles = StyleSheet.create({});

export default DramaListScreen;