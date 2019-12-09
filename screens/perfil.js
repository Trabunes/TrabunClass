import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, RefreshControl, Dimensions, StatusBar, ImageBackground, Image } from 'react-native'
import { Card, Title, Paragraph} from 'react-native-paper'
import { TabView } from 'react-native-tab-view';
import Icon from 'react-native-vector-icons/FontAwesome'

import Fondotrabun from '../img/background.png'
import esteban from '../img/esteban.jpg'
const {height, width} = Dimensions.get('window')


export default class perfil extends React.Component {
    constructor() {
          super()
          this.state = {
             refreshing: false,
             rut: '',
             nombre: '',
             apellido: '',
             data: [],

             index: 0,
             routes: [
                   { key: 'general', title: 'General' },
                   { key: 'administrar', title: 'Administrar'}
             ],
          };
       }
    probar = () => { 
          fetch('http://192.168.1.156/backend/agregar.php', {
                method: 'POST',
                headers: {
                  Accept: 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                  rut: this.state.rut,
                  nombre: this.state.nombre,
                  apellido: this.state.apellido,
                }),
          })
    }
    _onDelete = (e) => {
          fetch('http://192.168.1.156/backend/eliminar.php', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                      rut: e,
                    })
              })
          }
    _onRefresh = () => {
                fetch('http://192.168.1.156/backend/buscar.php')
                .then((response) => response.json())
                .then((res) => {
                      this.setState({ data: res,
                      }); 
                });
                
          }
    componentDidMount() {
          const { navigation } = this.props;  
          const rut = navigation.getParam('rut', this.state.id_clase);
          this.setState({rut: rut})
           fetch('http://192.168.1.156/backend/buscar.php', {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                      rut_perfil: rut,
                    })
           })
                .then((response) => response.json())                       
                .then((res) => {
                      this.setState({data: res,
                                    res: res[0] })
                })
                .catch((error) => {
                console.error(error);
          });
          }
    renderScene = ({route}) => {
          switch (route.key) {
                case 'general':
                return <HijoPerfil rut={this.state.rut} data={this.state.data}/>;
                case 'administrar':
                      return <Administrar inscritas={this.state.inscritas} />;
                default:
              return null;
          }
          };
    render() {
          return (      
                <ScrollView refreshControl={
                      <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}/>} style={estiloPerfil.containerBackground}>
                <RefreshControl
                      refreshing={this.state.refreshing}
                      onRefresh={this._onRefresh}
                />
                <TabView
                navigationState={this.state}
                renderScene={this.renderScene}
                onIndexChange={index => this.setState({ index })}
                initialLayout={{ width: Dimensions.get('window').width }}
                 />
                </ScrollView>
         );
    }
}

const Administrar = (props) => {
    return(         
          <View><Text>asdasd</Text></View>                  
    );
}

mostrarIcono = (tipo) => {
            if(tipo == 0){
                  return(
                        <View style={{justiftyContent:"center", alignItems:"center"}}>
                              <Icon name="user" color='#4747d1' size={44} />
                        </View>
                  );
            }
            if(tipo == 1){
                  return(
                        <View style={{justiftyContent:"center", alignItems:"center"}}>
                              <Icon name="graduation-cap" color='#4747d1' size={44}/>
                        </View>
                  );
            }
            if(tipo == 2){
                  return(
                        <View style={{justiftyContent:"center", alignItems:"center"}}>
                              <Icon name="user-secret" color='#4747d1' size={44}/>
                        </View>
                  );
            }
      }

//Clase hijo de perfil que sera impreso dentro de una TabView
const HijoPerfil = (props) => {
contents = props.data.map( (item, i) => {
    return (
         <ImageBackground key={i} source={Fondotrabun} style={estiloPerfil.backgroundContainer}>
                <ScrollView>
                <Card style={estiloPerfil.carta}>
                <Title style={estiloPerfil.titulo}>Información General</Title>
                            <Image source={esteban} style={estiloPerfil.logo}></Image>
                            {this.mostrarIcono(item.tipo)}
                            <View style={estiloPerfil.container}>
                                  <Title style={estiloPerfil.titulo}>{item.nombre} {item.apellido}</Title>
                                  <Paragraph>{item.rut_usuario}</Paragraph>

                                  <Title style={estiloPerfil.titulo}>Biografía</Title>
                                  <Paragraph style={{textAlign: 'center'}}>{item.biografia}</Paragraph>
                            </View>                  
                </Card>
                </ScrollView>
          </ImageBackground>
    );
 });
    return(
          <View>{contents}</View>
          )
};

const estiloPerfil = StyleSheet.create({
    carta: {
          marginTop: 20,
          flex: 1,
          borderRadius: 20/2,
          height: height-100,
          width: 320,   
    },
    container: {
          alignItems: 'center',
          justifyContent: 'center',
    },
    titulo: {
          textAlign: 'center',
          marginBottom: 20,
    },
    backgroundContainer: {
        flex: 1,
        width: null,
        height: height,
        justifyContent: 'center',
        alignItems: 'center',
        },
    containerBackground: {
        backgroundColor: '#773192',
    },
    logo: {
        flex: 0,
        width: 120,
        height: 120,
        justifyContent: 'center',
        alignItems: 'flex-end',
        borderRadius: 45,
        left: 100,
        bottom:10,     
  },
});