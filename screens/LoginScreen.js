import * as React from 'react';
import {  StyleSheet,
    ImageBackground,
    Image,
    Text, View,
} from 'react-native'
import {TextInput, Card, Title, Paragraph, Button} from 'react-native-paper'

import Fondotrabun from '../img/background.png'
import logo from '../img/logo2.jpg'


class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = { rut: '', contraseña: '',};
    }
    static navigationOptions = {
        header: null,
        };

    login() {
      fetch('http://192.168.1.156/backend/login.php', {
        method: 'POST',
        header:{
          'Accept': 'application/json',
          'Content-type': 'application/json'
        },
        body: JSON.stringify({
          rut: this.state.rut,
          contraseña: this.state.contraseña,
        })
      })
        .then((response) => response.json())
        .then((res) => {
          if(res=="Datos Correctos"){
            alert("Logeado Exitosamente");
            this.props.navigation.navigate('HomeScreen' , {
              rut: this.state.rut,
              otherParam: '',
            });
          }else{
            alert("Datos Incorrectos");
          }
        })
    }

    render() {
    var {navigate} = this.props.navigation;
      return (
          <ImageBackground source={Fondotrabun} style={styles.backgroundContainer}>
              <Card style={styles.tarjeta}>
              <Card.Content style={styles.contenido} >
                <Image source={logo} style={styles.logo}></Image>
  
                <Title style={styles.titulo}>Bienvenido a TrabünClass</Title>
  
                <View style={styles.borderStyle}>
                <TextInput mode='outlined' style={styles.input} value={this.state.rut} onChangeText={rut => this.setState({rut})} placeholder="Ingresa tu nombre usuario" label="Ingresa tu nombre usuario"/>
                </View>
                
                <TextInput mode='outlined' style={styles.input} value={this.state.contraseña} onChangeText={contraseña => this.setState({contraseña})} placeholder="Ingresa tu contraseña" label="Ingresa tu contraseña"/>
  
                <Button mode='outlined' style={styles.boton} onPress={this.login.bind(this) } >
                        <Text style={styles.texto} >Ingresar</Text>
                </Button>

                <Paragraph>¿Haz olvidado tu contraseña?</Paragraph>
              </Card.Content>
              </Card>
          </ImageBackground>
      );
    }
  }

  export default LoginScreen;

  const styles = StyleSheet.create({
    contenido: {
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
    },
    tarjeta: {
          flex: 0,
          width: 300,
          height: 500,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
    },
    backgroundContainer: {
          flex: 1,
          width: null,
          height: null,
          justifyContent: 'center',
          alignItems: 'center',
        },
    logo: {
          flex: 0,
          width: 150,
          height: 150,
          justifyContent: 'center',
          alignItems: 'center',
          marginBottom: 20,
      },
      input: {
          flex: 0,
          height: 50,
          width: 240,
          justifyContent: 'center',
          alignItems: 'stretch',
          marginBottom: 25,
          borderRadius: 25,
    },
      titulo: {
            height: 50,
            justifyContent: 'center',
      },
      boton: {
            width: 200,
            marginBottom: 15,
            borderRadius: 25,
            backgroundColor: '#562583',
      },
      texto: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
      }
  });
  