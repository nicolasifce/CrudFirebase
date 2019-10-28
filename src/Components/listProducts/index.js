import React, { Component } from "react";
import {
  Button,
  FlatList,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity
} from "react-native";
import firebase from "../../database/dataFirebase";
import {
  AntDesign,
  MaterialCommunityIcons,
  MaterialIcons
} from "@expo/vector-icons";
import styles from "./style";

function Item({ item, navigation }) {
  let icon;
  if (item.Produto.Categoria === "Alimentos") {
    icon = <MaterialIcons style name="restaurant" size={32} color="white" />;
  } else if (item.Produto.Categoria === "Eletrônicos") {
    icon = <AntDesign name="API" size={32} color="white" />;
  } else if (item.Produto.Categoria === "Limpeza") {
    icon = <MaterialCommunityIcons name="broom" size={32} color="white" />;
  }
  return (
    <TouchableOpacity
      style={styles.item}
      onPress={() => navigation.navigate("editProduct", { ...item })}
    >
      <View style={styles.icons}>
        {icon}
        <Text style={styles.title}>{item.Produto.Nome}</Text>
      </View>
      <Text style={styles.dados}>ID: {item.id}</Text>
      <View style={{ flexDirection: "row" }}>
        <MaterialIcons name="radio-button-checked" size={20} color="white" />
        <Text
          style={{
            color: "#FFF",
            fontSize: 16,
            marginLeft: 10
          }}
        >
          {item.Produto.Categoria}
        </Text>
      </View>
      <Text style={styles.dados}>
        Criado: {item.Produto.Criado.Data} ás {item.Produto.Criado.Hora} Horas
      </Text>
    </TouchableOpacity>
  );
}

export default class ListProduct extends Component {
  constructor(props) {
    super(props);
    this.state = { ProductInfo: [], loading: false };
  }

  static navigationOptions = ({ navigation }) => {
    return {
      title: "Produtos",
      headerStyle: {
        backgroundColor: "#f4511e"
      },
      headerTintColor: "#FFF",
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      },
      headerRight: (
        <TouchableOpacity onPress={() => navigation.navigate("auditoria")}>
          <AntDesign name="profile" size={32} color="white" />
        </TouchableOpacity>
      )
    };
  };

  componentDidMount() {
    this.CapturaDados();
  }

  formatProducts(productObject) {
    return Object.keys(productObject).map(key => ({
      id: key,
      ...productObject[key]
    }));
  }

  CapturaDados = () => {
    this.setState({ loading: true });
    firebase
      .database()
      .ref("Produtos")
      .on("value", snapshot => {
        this.setState({
          ProductInfo: this.formatProducts(snapshot.val()),
          loading: false
        });
      });
  };

  render() {
    const { ProductInfo, loading } = this.state;
    const { navigation } = this.props;
    return (
      <SafeAreaView style={styles.container}>
        <FlatList
          data={ProductInfo}
          refreshing={loading}
          onRefresh={this.CapturaDados}
          keyExtractor={(item, index) => `p${index}`}
          renderItem={({ item }) => (
            <Item item={item} navigation={navigation} />
          )}
        />
        <Button
          title="Cadastrar"
          onPress={() => navigation.navigate("registreProduct")}
        />
      </SafeAreaView>
    );
  }
}
