import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import listProducts from "./Components/listProducts";
import editProduct from "./Components/editProduct";
import registreProduct from "./Components/registreProducts";
import auditoria from "./Components/auditoriaProduct";

const Routes = createStackNavigator(
  {
    listProducts,
    registreProduct,
    editProduct,
    auditoria
  },
  {
    navigationOptions: {
      headerStyle: {
        backgroundColor: "#da552f"
      },
      headerTitleStyle: {
        textAlign: "center",
        flex: 1
      }
    }
  }
);

const AppContainer = createAppContainer(Routes);
export default AppContainer;
