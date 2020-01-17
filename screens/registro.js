import * as React from 'react';
import { Card, Title, Paragraph, Button, TextInput, Searchbar, Chip, Avatar } from 'react-native-paper'
import { StyleSheet, ScrollView, View, Text, ImageBackground, Dimensions} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Fondotrabun from '../img/background.png'
const {height, width} = Dimensions.get('window')

export default class registro extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            tipo: null,
            rut_usuario: '',
            nombre_usuario: '',
            apellido_usuario: '',
            contraseña_usuario: '',
            categoria: [],
            rut_tutor: '',
            nombre_tutor: '',
            apellido_tutor: '',
            contraseña_tutor: '',
            tamañoUsuario: 44,
            tamañoTutor: 44,
        };
    }

    agregarUsuario() {
        fetch('http://192.168.1.156/backend/agregar.php', {
          method: 'POST',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            rut_usuario: this.state.rut_usuario,
            nombre_usuario: this.state.nombre_usuario,
            tipo_usuario: this.state.tipo_usuario,
            apellido_usuario: this.state.apellido_usuario,
            contraseña_usuario: this.state.contraseña_usuario,
          })
        })
      }

      agregarTutor() {
        fetch('http://10.12.49.113/backend/agregar.php', {
          method: 'POST',
          header:{
            'Accept': 'application/json',
            'Content-type': 'application/json'
          },
          body: JSON.stringify({
            rut_tutor: this.state.rut_tutor,
            nombre_tutor: this.state.nombre_tutor,
            tipo_tutor: this.state.tipo_tutor,
            apellido_tutor: this.state.apellido_tutor,
            contraseña_tutor: this.state.contraseña_tutor,
          })
        })
      }

      soloTexto (text, estado) {
        console.log(text, estado)
        this.setState({
            [estado]: text.replace(/[^A-Za-z]/g, ''),
        });
    }

    formUsuario(){
        if(this.state.tipo == null){
            return(
                <View style={{paddingTop: 25}}>
                    <Text>Selecciona una opción</Text>
                </View>
            );
        }else{
            if(this.state.tipo == 0){
                return(
                    <ScrollView>
                        <TextInput mode='outlined' style={styles.input} value={this.state.rut_usuario} onChangeText={rut_usuario => this.setState({rut_usuario})} placeholder="Rut" label="Ingresa tu Rut" />
                        <TextInput mode='outlined' style={styles.input} value={this.state.nombre_usuario} onChangeText={nombre_usuario => this.soloTexto(nombre_usuario, 'nombre_usuario')} placeholder="Nombre" label="Ingresa tu Nombre" maxLength={30}/>
                        <TextInput mode='outlined' style={styles.input} value={this.state.apellido_usuario} onChangeText={apellido_usuario => this.soloTexto(apellido_usuario, 'apellido_usuario')} placeholder="Apellido" label="Ingresa tu Apellido" maxLength={30}/>
                        <TextInput mode='outlined' style={styles.input} value={this.state.contraseña_usuario} onChangeText={contraseña_usuario => this.setState({contraseña_usuario})} placeholder="Contraseña" label="Ingresa tu Contraseña" maxLength={15}/>
                        <Button mode='outlined' style={styles.registrate} onPress={this.validarUsuario.bind(this)} >
                                <Text style={styles.texto} >Registrate</Text>
                        </Button>
                    </ScrollView>
                );
            }
            if(this.state.tipo == 1){
                return(
                    <ScrollView>
                        <TextInput mode='outlined' style={styles.input} value={this.state.rut_tutor} onChangeText={rut_tutor=> this.setState({rut_tutor})} placeholder="Rut" label="Ingresa tu Rut"/>
                        <TextInput mode='outlined' style={styles.input} value={this.state.nombre_tutor} onChangeText={nombre_tutor => this.soloTexto(nombre_tutor, 'nombre_tutor')} placeholder="Nombre" label="Ingresa tu Nombre"/>
                        <TextInput mode='outlined' style={styles.input} value={this.state.apellido_tutor} onChangeText={apellido_tutor => this.soloTexto(apellido_tutor, 'apellido_tutor')} placeholder="Apellido" label="Ingresa tu Apellido"/>
                        <TextInput mode='outlined' style={styles.input} value={this.state.contraseña_tutor} onChangeText={contraseña_tutor => this.setState({contraseña_tutor})} placeholder="Contraseña" label="Ingresa tu Contraseña"/>
                        <Button mode='outlined' style={styles.registrate} onPress={this.validarTutor.bind(this)}>
                                <Text style={styles.texto} >Registrate</Text>
                        </Button>
                    </ScrollView>
                );
            }
        }
    }
    
    validarUsuario(){
      if(this.state.rut_usuario == ''){

          console.log("está vacio");
          alert("El campo del rut esta vacío");

        }else if (this.state.nombre_usuario == ''){

          console.log ("nombre vacio");
          alert("El campo del nombre esta vacio");

        } else if (this.state.apellido_usuario == ''){

          alert("El campo del apellido esta vacío"); 

        }else if (this.state.tipo_usuario == ''){

          alert("El campo del tipo esta vacío"); 

        }else if (this.state.contraseña_usuario == ''){

          alert("El campo del contraseña esta vacío"); 

        }else {
          this.agregarUsuario();
          alert("Se ha agregado el usuario");
          this.setState({
                  rut_usuario: '',
                  nombre_usuario: '',
                  apellido_usuario: '',
                  tipo: null,
                  contraseña_usuario: '',

          });
      }
    }

    validarTutor(){
      if(this.state.rut_tutor == ''){

          console.log("está vacio");
          alert("El campo del rut esta vacío");

        }else if (this.state.nombre_tutor == ''){

          console.log ("nombre vacio");
          alert("El campo del nombre esta vacio");

        } else if (this.state.apellido_tutor == ''){

          alert("El campo del apellido esta vacío"); 

        }else if (this.state.tipo_tutor == ''){

          alert("El campo del tipo esta vacío"); 

        }else if (this.state.contraseña_tutor == ''){

          alert("El campo del contraseña esta vacío"); 

        }else {
          this.agregarTutor();
          alert("Se ha agregado el Tutor");
          this.setState({
                  rut_tutor: '',
                  nombre_tutor: '',
                  apellido_tutor: '',
                  tipo: null,
                  contraseña_tutor: '',

          });
      }
    }

    render(){
        return(
            <ImageBackground source={Fondotrabun} style={styles.backgroundContainer}>
            <Card style={styles.tarjeta}>
            <Card.Content style={styles.contenido} >
              <Title style={styles.titulo}>Me quiero registrar como:</Title>
              <View style={styles.viewIcons}>
                                  <View style={styles.container}>
                                        <Title>Usuario</Title>
                                        <Icon name="user" color='#4747d1' size={this.state.tamañoUsuario} onPress={() => this.setState({tipo: 0, tamañoUsuario: 60, tamañoTutor: 44})}/>
                                  </View>
                                  <View style={styles.container}>
                                        <Title>Tutor</Title>
                                        <Icon name="graduation-cap" color='#4747d1' size={this.state.tamañoTutor} onPress={() => this.setState({tipo: 1, tamañoUsuario: 44, tamañoTutor: 60})}/>
                                  </View>
               </View>
            {this.formUsuario()}
            </Card.Content>
            </Card>
        </ImageBackground>
        )
        
    }

}

const styles = StyleSheet.create({
    contenido: {
          flex: 0,
          justifyContent: 'center',
          alignItems: 'center',
    },
    tarjeta: {
          flex: 0,
          width: 300,
          height: height-100,
          justifyContent: 'center',
          alignItems: 'center',
          borderRadius: 50,
          marginBottom: 50,
          marginTop: 50,
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
      registrate: {
          width: 200,
          marginBottom: 15,
          borderRadius: 25,
          backgroundColor: '#94C11F',
      },
      texto: {
            color: 'white',
            fontSize: 16,
            textAlign: 'center',
      },
      viewIcons:{
        flexDirection: 'row',
        justifyContent: 'space-between',
      },
      container: {
        flex: 1,
        paddingLeft: 5,
        alignItems: 'center',
        justifyContent: 'center',
  },
  });