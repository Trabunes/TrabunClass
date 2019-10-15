//Se importan el contenido de las paginas para mostrar
import HomeScreen from './screens/HomeScreen.js'
import LoginScreen from './screens/LoginScreen.js'

import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';


//Creación del StackNavigator
//  StackNavigator = Componente que permite a la 
//                 aplicación moverse entre pantallas
const RootStack = createStackNavigator({
    //Se crea una "Configuración" llamada LoginScreen
    LoginScreen: {
      //Se le asigna a la opción 'screen' el archivo LoginScreen.js
      screen: LoginScreen
    },
    HomeScreen: {
      screen: HomeScreen,
      navigationOptions: {
        header: null,
      }
    }
});

const App = createAppContainer(RootStack);

export default App;
