import * as React from 'react';
import { Card, Title, Paragraph, Button, TextInput, Searchbar, Chip, Avatar, Picker } from 'react-native-paper'
import { StyleSheet, ScrollView, View, Text, ImageBackground, Dimensions, Alert} from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

import Fondotrabun from '../img/background.png'
const {height, width} = Dimensions.get('window')

export default class modificar extends React.Component{
    constructor(props){
        super(props)
        this.state = { 
            tipo: null,
            rut_usuario: '',
            nombre_usuario: '',
            apellido_usuario: '',
            contraseña_usuario: '',
            categoria: [],

            titulo: '',
            id_categoria: '',
            descripcion: '',
            costo: '',
            lugar: '',

            rut_tutor: '',
            nombre_tutor: '',
            apellido_tutor: '',
            contraseña_tutor: '',
            tamañoUsuario: 44,
            tamañoTutor: 44,
        };
    }

      soloTexto (text, estado) {
        console.log(text, estado)
        this.setState({
            [estado]: text.replace(/[^A-Za-z]/g, ''),
        });
    }

    componentDidMount(){
        const { navigation } = this.props;
        const titulo = navigation.getParam('titulo', this.state.titulo);
        const descripcion = navigation.getParam('descripcion', this.state.descripcion);
        const costo = navigation.getParam('costo', this.state.costo);
        const lugar = navigation.getParam('lugar', this.state.lugar);
        const id_clase = navigation.getParam('id_clase', this.state.id_clase);

        
        console.warn(id_clase);
        this.setState({ titulo: titulo,
                        descripcion: descripcion,
                        costo: costo,
                        lugar: lugar,
                        id_clase: id_clase})
    }

    _onUpdate = () => {
        fetch('http://192.168.1.156/backend/modificar.php', {
              method: 'POST',
              headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                    id_clase: this.state.id_clase,
                    titulo: this.state.titulo,
                    descripcion: this.state.descripcion,
                    costo: this.state.costo,
                    lugar: this.state.lugar,
              })
        }).then((response) => response.json())
              .then((responseJson) => {
                    // Showing response message coming from server updating records.
                    Alert.alert(responseJson);

              }).catch((error) => {
                    console.error(error);
              });
  }

    render(){
        return(
            <ScrollView flexDirection='column' style={estilos_agregar.scroll}>
            <Card style={estilos_agregar.carta} >
                  <Card.Content>
                        <View style={estilos_agregar.container}>
                              <Title alignItems='center'>Modificar Clase</Title>

                              <Title>Título de la Clase</Title>
                              <TextInput name='Titulo' value={this.state.titulo} onChangeText={(titulo) => this.setState({ titulo })}
                                    mode='outlined' style={estilos_agregar.inputTitulo} placeholder="Clases de ..." label="Ingresa el Título" />

                              {/* <Title>Categoría de la Clase</Title>
                              <Picker
                                    selectedValue={this.state.id_categoria}
                                    style={{ height: 50, width: 180 }}
                                    onValueChange={(itemValue, itemIndex) =>
                                          this.setState({ id_categoria: itemValue })
                                    }>
                                    <Picker.Item label="Selecciona una" value="0" />
                                    <Picker.Item label="Matematicas" value="1" />
                                    <Picker.Item label="Deportes" value="2" />
                                    <Picker.Item label="Tecnología" value="3" />
                                    <Picker.Item label="Arte" value="4" />
                              </Picker> */}

                              <Title>Descripción</Title>
                              <TextInput name='Descripcion' multiline={true} value={this.state.descripcion} onChangeText={(descripcion) => this.setState({ descripcion })}
                                    mode='outlined' style={estilos_agregar.inputDescripcion} placeholder="Ingresa la Descripción" label="Ingresa la Descripción" />

                              {/* <View style={estilos_agregar.container}>
                                    <Title>Fecha</Title>
                                    <Icon onPress={this.datepicker} name="calendar" color='#4747d1' size={44} />
                                    <View>
                                          <View>
                                                <Button onPress={this.datepicker} >{String(this.state.date.getDate()).padStart(2, '0')}/{String(this.state.date.getMonth() + 1).padStart(2, '0')}/{this.state.date.getFullYear().toString()}</Button>
                                          </View>
                                          {show && <DateTimePicker value={date}
                                                mode={mode}
                                                is24Hour={true}
                                                display="default"
                                                onChange={this.setDate} />
                                          }
                                    </View>
                              </View> */}

                              <View style={estilos_agregar.container2}>
                                    <View style={estilos_agregar.container}>
                                          <Title>Valor</Title>
                                          <Icon name="money" color='#4747d1' size={44} />
                                          <TextInput name='Costo' value={this.state.costo} onChangeText={(costo) => this.setState({ costo })}
                                                mode='outlined' style={estilos_agregar.input} placeholder="Ingresa el Valor" label="Ej: 5000" />
                                    </View>

                                    <View style={estilos_agregar.container}>
                                          <Title>Ubicación</Title>
                                          <Icon name="map" color='#4747d1' size={44} />
                                          <TextInput name='Titulo' value={this.state.lugar} onChangeText={(lugar) => this.setState({ lugar })}
                                                mode='outlined' style={estilos_agregar.input} placeholder="Ingresa la Ubicación" label="La Serena" />
                                    </View>
                              </View>

                              <Title>Cupos</Title>
                              {/* <View style={estilos_agregar.container2}>
                                    <StarRating
                                          starStyle={estilos_agregar.cupo}
                                          starSize={44}
                                          disabled={false}
                                          emptyStar={'user-o'}
                                          fullStar={'user'}
                                          iconSet={'FontAwesome'}
                                          maxStars={5}
                                          rating={this.state.cupo}
                                          selectedStar={(rating) => this.onPressCupo(rating)}
                                          fullStarColor={'#4747d1'}
                                    />
                              </View> */}
                        </View>

                  </Card.Content>
                  <Card.Actions style={{ justifyContent: 'center' }}>
                        <Button mode="contained" style={estilos_agregar.boton} onPress={() => this._onUpdate()}>Modificar</Button>
                  </Card.Actions>
            </Card>
      </ScrollView>

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

  const estilos_agregar = StyleSheet.create({
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
          borderRadius: 50 / 2,
          marginTop: 15,
          marginLeft: 10,
          marginRight: 10,
          marginBottom: 15,
          //     height: 1000,
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
          height: 100,
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
          backgroundColor: '#94C11F',
          borderRadius: 25,
          alignItems: 'center',
    },
    boton2: {
          marginTop: 5,
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