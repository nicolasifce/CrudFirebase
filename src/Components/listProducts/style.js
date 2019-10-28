import {StyleSheet} from 'react-native';
import Constants from "expo-constants";



const styles = StyleSheet.create({
    container: {
      flex: 1,
      marginTop: Constants.statusBarHeight
    },
    item: {
      backgroundColor: "#25aad0",
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 16,
      borderRadius:10,
      elevation:20
    },
    title: {
      fontSize: 25,
      color:'#FFF',
      marginLeft:30
    },
    icons:{
        flexDirection:'row',
        marginBottom:10
    },
    dados:{
        color:'#FFF',
        fontSize:16
    }

  });

  export default styles;