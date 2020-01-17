import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, RefreshControl, Dimensions, StatusBar, ImageBackground, Image } from 'react-native'
import { Card, Title, Paragraph, Button, TextInput, Chip, Avatar } from 'react-native-paper'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import MapView, { Marker } from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import Geolocation from '@react-native-community/geolocation';

//importacion de los componentes de la aplicacion
import Perfil from './perfil';
import Inicio from './inicio';
import Buscar from './buscar';
import Agregar from './agregar';



const { width, height } = Dimensions.get('window')

import Icon from 'react-native-vector-icons/FontAwesome'

const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITITUD_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

class HomeScreen extends React.Component {
      render() {
            return (
                  <Title style={styles.titulo}>Bienvenido a TrabünClass</Title>
            );
      }
}

//Estilos Mapa
const mapa = StyleSheet.create({
      container: {
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#F5FCFF',
      },
      map: {
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            position: 'absolute'
      },
});

//Estilos Agregar
const agregar = StyleSheet.create({
      container: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 5,
      },
      container2: {
            flexDirection: 'row',
            justifyContent: 'space-between',

      },
      carta: {
            borderRadius: 20 / 2,
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 15,
            height: 1000,
            width: 350,
            alignItems: 'center',
      },
      scroll: {
            backgroundColor: '#773192',
      },
      input: {
            flex: 0,
            height: 50,
            width: 130,
            justifyContent: 'center',
            alignItems: 'stretch',
            marginBottom: 25,
            borderRadius: 25,
      },
      inputTitulo: {
            flex: 0,
            height: 50,
            width: 300,
            justifyContent: 'center',
            alignItems: 'stretch',
            marginBottom: 25,
            borderRadius: 25,
      },
      inputDescripcion: {
            flex: 0,
            height: 200,
            width: 300,
            justifyContent: 'center',
            alignItems: 'stretch',
            marginBottom: 25,
            borderRadius: 25,
      },
      boton: {
            marginTop: 5,
            width: 140,
            marginLeft: 10,
            backgroundColor: '#562583',
            borderRadius: 25,
            alignItems: 'center',
      },
      boton2: {
            marginTop: 5,
            marginBottom: 15,
            width: 140,
            marginLeft: 10,
            backgroundColor: '#562583',
            borderRadius: 25,
            alignItems: 'center',
      },
      cupo: {
            alignItems: 'center',
            justifyContent: 'center',
            paddingRight: 20,
      }
})
//Fin Estilos Agregar
export default createMaterialBottomTabNavigator({
      HomeScreen: { screen: HomeScreen },
      Inicio: {
            screen: Inicio,
            navigationOptions: {
                  tabBarLabel: 'Inicio',
                  tabBarIcon: ({ tintColor }) => (
                        <Icon name="home" color={tintColor} size={24} />
                  ),
                  tabBarColor: '#562583',
            }
      },
      Perfil: {
            screen: Perfil,
            navigationOptions: {
                  tabBarLabel: 'Perfil',
                  tabBarIcon: ({ tintColor }) => (
                        <Icon name="user" color={tintColor} size={24} />
                  ),
                  tabBarColor: '#773192',
            }
      },
      // Mapa:  { screen: vistaMapa,
      //       navigationOptions:{
      //             tabBarLabel: 'Mapa',
      //             tabBarIcon: ({tintColor})=>(
      //                   <Icon name="map-marker" color={tintColor} size={24}/>
      //             ),
      //             tabBarColor: '#562583',
      //       }},
      Buscar: {
            screen: Buscar,
            navigationOptions: {
                  tabBarLabel: 'Buscar',
                  tabBarIcon: ({ tintColor }) => (
                        <Icon name="search" color={tintColor} size={24} />
                  ),
                  tabBarColor: '#773192',
            }
      },
      Agregar: {
            screen: Agregar,
            navigationOptions: {
                  tabBarIcon: ({ tintColor }) => (
                        <Icon style={styles.icon2} name="plus-square" color={tintColor} size={28} />
                  ),
                  tabBarColor: '#773192',
            }
      },

}, {
      initialRouteName: 'Inicio',
      order: ['Inicio', 'Buscar', 'Agregar', 'Perfil'],
      activeTintColor: '#000000',
      barStyle: { backgroundColor: '#9E197E' },
})


const styles = StyleSheet.create({
      containermapa: {
            backgroundColor: '#562583',
      },
      container: {
            backgroundColor: '#773192',
      },
      view: {
            backgroundColor: '#562583',
      },
      scrollview1: {
            flex: 1, flexDirection: 'row', justifyContent: 'flex-end'
      },
      scrollview2: {
            flex: 1, flexDirection: 'row', justifyContent: 'flex-end'
      },

      para: {
            marginBottom: 500,
      },
      titulo: {
            flex: 1,
            marginLeft: 50,
            textAlign: 'center',
            fontWeight: 'bold',
            height: '100%',
            width: '100%',
      },
      icon: {
            marginTop: 5,
            marginLeft: 5,
            position: 'absolute',
            left: 2, // Keep some space between your left border and Image
      },
      icon2: {
            marginBottom: 20,
            left: 2, // Keep some space between your left border and Image
      },
      chip: {
            flexDirection: "row",
            justifyContent: "space-between",
            width: 100,
            flex: 1,  // Add this line  
      },
      boton: {
            marginTop: 5,
            marginLeft: 5,
            width: 100,
            marginLeft: 10,
            backgroundColor: '#562583',
            borderRadius: 25,
      },
      botonPerfil: {
            width: 200,
            marginBottom: 15,
            borderRadius: 25,
            backgroundColor: '#562583',
      },
      carta: {
            // borderRadius: 25,
            borderRadius: 20 / 2,
            marginTop: 5,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 5,
      },
      carta2: {
            borderRadius: 20 / 2,
            marginTop: 5,
            marginBottom: 5,
            height: 180,
            width: 320,
      },
      button: {
            padding: 20,
            borderWidth: 1,
      },
      containerbutton: {
            flex: 1,
            backgroundColor: '#fff',
            alignItems: 'center',
            justifyContent: 'center',

      },
      scene: {
            flex: 1,
      },
});

