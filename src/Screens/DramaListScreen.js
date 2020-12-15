import React, { useContext } from "react";
import { StyleSheet ,Image,Dimensions} from "react-native";
import { Container,Header,Item,Content, Fab, Icon, List,ListItem, Text, Body,
 Right,
} from "native-base";
const {width, height} = Dimensions.get("window");
// Utilizar el contexto de notas
import { DramasContext } from "../context/DramaContext";

const DramaListScreen = ({ navigation }) => {
  const { dramas } = useContext(DramasContext);

  return (
    <Container style={styles.container}>
         
      <Content >
        
      <Image
                source = {require("../../assets/icon.png")} 
                style={styles.Zone}
               />
        <List>
          {dramas
            ? dramas.map((drama) => (
                <ListItem
                  key={drama.id.toString()}
                  onPress={() => {
                    navigation.navigate("noteModify", {id: drama.id });// AddModificatedrama
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
        style={{ backgroundColor: "#f44336"}}
        direction="up"
        onPress={() => {
          navigation.navigate("Agregar dorama");
          
        }}
      >
        <Icon name="plus" type="FontAwesome" />
      </Fab>
    </Container>
  ); 
};


//hoja de estilos
const styles = StyleSheet.create({
  
  Zone: {
     width: width ,
     height: height * 0.25,
     resizeMode: "cover",
  },

  container: {
    backgroundColor: "#4f9a94",
  },
});



export default DramaListScreen;
