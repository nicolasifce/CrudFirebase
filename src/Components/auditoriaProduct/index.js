import React, { Component } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  Picker,
  SafeAreaView,
  FlatList,
  StyleSheet
} from "react-native";
import firebase from "../../database/dataFirebase";
import styles from "./style";

function Item({ item }) {
  return (
    <View style={styles.item}>
      <Text style={styles.itens}>PRODUTO: {item.Produto.Nome}</Text>
      <Text style={styles.itens}>ID: {item.Produto.Id}</Text>

      <Text style={styles.itens}>
        MODIFICADO: {item.Data} às {item.Hora} Horas
      </Text>
    </View>
  );
}

export default class Registre extends Component {
  static navigationOptions = {
    title: "Registro de Mudanças",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#FFF",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

  constructor(props) {
    super(props);
    this.state = { ModificaInfo: [] };
  }

  componentDidMount() {
    this.CapturaDados();
  }

  CapturaDados = async () => {
    firebase
      .database()
      .ref("Modificado")
      .on("value", snapshot => {
        this.setState({ ModificaInfo: Object.values(snapshot.val()) });
      });
  };

  render() {
    const { ModificaInfo } = this.state;

    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={ModificaInfo}
          keyExtractor={(item, index) => `p${index}`}
          renderItem={({ item }) => <Item item={item} />}
        />
      </SafeAreaView>
    );
  }
}
