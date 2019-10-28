import React, { Component } from "react";
import { View, Text, TextInput, Button, Picker } from "react-native";
import firebase from "../../database/dataFirebase";
import styles from "./style";

export default class Registre extends Component {
  constructor(props) {
    super(props);

    this.state = {
      Id: "",
      Produto: [],
      ProdutoAntes: [],
      Categoria: ""
    };
  }

  static navigationOptions = {
    title: "Configurações do Produto",
    headerStyle: {
      backgroundColor: "#f4511e"
    },
    headerTintColor: "#FFF",
    headerTitleStyle: {
      textAlign: "center",
      flex: 1
    }
  };

  EditarDados(id, Categoria, Nome) {
    let dia = new Date().getDate();
    let mes = new Date().getMonth() + 1;
    let ano = new Date().getFullYear();
    let horas = new Date().getHours();
    let minutos = new Date().getMinutes();

    if (
      this.state.ProdutoAntes.Nome == Nome &&
      this.state.ProdutoAntes.Categoria == Categoria
    ) {
    } else {
      firebase
        .database()
        .ref("Produtos")
        .child(id)
        .child("Produto")
        .update({
          Nome,
          Categoria
        });

      firebase
        .database()
        .ref("Modificado")
        .push({
          Data: dia + "-" + mes + "-" + ano,
          Hora: horas + "-" + minutos,
          Produto: {
            Categoria,
            Id: id,
            Nome
          }
        })
        .then(alert("Produto Atualizado"))
        .then(this.props.navigation.goBack());
    }
  }

  ExcluirDados(id) {
    firebase
      .database()
      .ref("Produtos")
      .child(id)
      .remove()
      .then(alert("Produto Excluido"))
      .then(this.props.navigation.goBack());
  }

  componentDidMount() {
    this.setState({ Produto: this.props.navigation.getParam("Produto") });
    this.setState({ Id: this.props.navigation.getParam("id") });
    this.setState({ Nome: this.props.navigation.getParam("Produto") });
  }

  render() {
    return (
      <View style={styles.container}>
        <View style={{ marginTop: 40 }}>
          <Text style={{ fontSize: 20 }}>Nome:</Text>
          <TextInput
            style={styles.input}
            value={this.state.Produto.Nome}
            onChangeText={text =>
              this.setState({ Produto: { ...this.state.Produto, Nome: text } })
            }
          />
          <Text style={styles.Categoria}>Categoria:</Text>
          <Picker
            selectedValue={this.state.Produto.Categoria}
            style={styles.Picker}
            onValueChange={(itemValue, itemIndex) =>
              this.setState({
                Produto: { ...this.state.Produto, Categoria: itemValue }
              })
            }
          >
            <Picker.Item label="Alimentos" value="Alimentos" />
            <Picker.Item label="Eletrônicos" value="Eletrônicos" />
            <Picker.Item label="Limpeza" value="Limpeza" />
          </Picker>
        </View>
        <View style={{ flexDirection: "row" }}>
          <View style={styles.buttons}>
            <Button
              title="Editar"
              onPress={() => {
                this.EditarDados(
                  this.state.Id,
                  this.state.Produto.Categoria,
                  this.state.Produto.Nome
                );
              }}
            />
          </View>
          <View style={styles.buttons}>
            <Button
              title="Excluir"
              onPress={() => {
                this.ExcluirDados(this.state.Id);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}
