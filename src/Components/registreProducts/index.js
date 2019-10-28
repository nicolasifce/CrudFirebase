import React, { Component } from "react";
import { View, Text, TextInput, Button, Picker } from "react-native";
import styles from "./style";
import firebase from "../../database/dataFirebase";

export default class Registre extends Component {
  state = {
    Nome: "",
    Categoria: "Alimentos",
    Data: "",
    Hora: ""
  };

  static navigationOptions = {
    title: "Cadastro",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#FFF",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

  Set = (Nome, Categoria) => {
    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let ano = new Date().getFullYear();
    let horas = new Date().getHours();
    let minutos = new Date().getMinutes();

    if (Nome == "") {
      alert("Digite um nome");
    } else {
      firebase
        .database()
        .ref("Produtos")
        .push({
          Produto: {
            Nome,
            Categoria,
            Criado: {
              Data: dia + "-" + mes + "-" + ano,
              Hora: horas + ":" + minutos
            }
          }
        })
        .then(alert("Produto Criado"))
        .then(this.props.navigation.goBack());
    }
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 20 }}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={this.state.Nome}
            onChangeText={text => this.setState({ Nome: text })}
          />
          <Text style={styles.Categoria}>Categoria:</Text>
          <Picker
            selectedValue={this.state.Categoria}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({ Categoria: itemValue })
            }
          >
            <Picker.Item label="Alimentos" value="Alimentos" />
            <Picker.Item label="Eletrônicos" value="Eletrônicos" />
            <Picker.Item label="Limpeza" value="Limpeza" />
          </Picker>
        </View>
        <View style={{ marginTop: 40 }}>
          <Button
            title="Cadastrar"
            onPress={() => {
              this.Set(this.state.Nome, this.state.Categoria);
            }}
          />
        </View>
      </View>
    );
  }
}
