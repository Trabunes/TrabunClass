import * as React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Platform, Picker, Text } from 'react-native'
import { Card, Title, Paragraph, Button, TextInput, Chip, Avatar } from 'react-native-paper'
import StarRating from 'react-native-star-rating';
import Geolocation from '@react-native-community/geolocation';

import DateTimePicker from '@react-native-community/datetimepicker';

import Icon from 'react-native-vector-icons/FontAwesome'

const { width, height } = Dimensions.get('window')
const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITITUD_DELTA = LATTITUDE_DELTA * ASPECT_RATIO


export default class agregar extends React.Component {
      static navigationOptions = {
            header: null,
      };

      constructor() {
            super()
            this.state = {
                  sesion: 0,
                  data: [],
                  id_clase: '',
                  rut: '',
                  rut_clase: '',
                  titulo: '',
                  categorias: [],
                  categoria: '',
                  descripcion: '',
                  costo: '',
                  cupo: 3,
                  hora_inicio: '',
                  hora_fin: '',
                  fecha: '',

                  date: new Date(),
                  mode: 'date',
                  show: false,
            };
      }
      onPressCupo(rating) {
            this.setState({
                  cupo: rating
            });
      }

      getCategorias() {
            fetch('http://192.168.1.156/backend/buscar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        nombre_categoria: 'nombre_categoria',
                  })
            })
                  .then((response) => response.json())
                  .then((res) => {
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({ categoria: data })

                  })

      }

      agregar = () => {
            fetch('http://192.168.1.156/backend/agregar.php', {
                  method: 'POST',
                  headers: {
                        Accept: 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        id_clase: this.state.id_clase,
                        _rut: this.state.rut,
                        titulo: this.state.titulo,
                        descripcion: this.state.descripcion,
                        costo: this.state.costo,
                        cupo: this.state.cupo,
                        hora_inicio: this.state.hora_inicio,
                        hora_fin: this.state.hora_fin,
                        fecha: this.state.fecha,
                        latitud: this.state.latitud,
                        longitud: this.state.longitud,
                  }),

            })
      }
      _onUpdate = () => {
            fetch('http://192.168.1.156/backend/modificar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        mod_clase: 'si',
                        id_clase: this.state.id_clase,
                        _rut: this.state.rut,
                        titulo: this.state.titulo,
                        descripcion: this.state.descripcion,
                        costo: this.state.costo,
                        cupo: this.state.cupo,
                        hora_inicio: this.state.hora_inicio,
                        hora_fin: this.state.hora_fin,
                        fecha: this.state.fecha,
                        latitud: this.state.initialPosition.latitude,
                        longitud: this.state.initialPosition.longitude,
                  })
            }).then((response) => response.json())
                  .then((responseJson) => {
                        // Showing response message coming from server updating records.
                        alert(responseJson);

                  }).catch((error) => {
                        console.error(error);
                  });
      }
      _onRefresh = () => {
            fetch('http://192.168.1.156/backend/backend.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_inicio: this.state.rut,
                  })
            })
                  .then((response) => response.json())
                  .then((res) => {
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({ data: data })

                  })

      }

      componentDidMount() {
            this.getCategorias();
      }

      setDate = (event, date) => {
            date = date || this.state.date;

            this.setState({
                  show: Platform.OS === 'ios' ? true : false,
                  date,
            });
      }

      show = mode => {
            this.setState({
                  show: true,
                  mode,
            });
      }

      datepicker = () => {
            this.show('date');
      }

      timepicker = () => {
            this.show('time');
      }


      handlePicker = (datetime) => {
            this.setState({
                  isVisible: false,
                  date: datetime
            })
      }

      showPicker = () => {
            this.setState({ isVisible: true })
      }

      hidePicker = () => {
            this.setState({ isVisible: false })
      }

      renderPicker() {
            if (this.state.categoria != '') {
                  this.state.categoria.map((item, i) => {
                        return (
                              <View>
                              <Picker.Item key={i} label={item.nombre_categoria} value={item.nombre_categoria} />
                              </View>
                        )
                  })
            }else{
                  return(
                        <View>
                              <Picker.Item label="Cargando categorías..." value='NA' />
                        </View>
                  )
            }
      }
      render() {

            const { show, date, mode } = this.state;
            return (
                  <ScrollView flexDirection='column' style={estilos_agregar.scroll}>
                        <Card style={estilos_agregar.carta} >
                              <Card.Content>
                                    <View style={estilos_agregar.container}>
                                          <Title alignItems='center'>Agregar Clase</Title>

                                          <Title>Título de la Clase</Title>
                                          <TextInput name='Titulo' value={this.state.titulo} onChangeText={(titulo) => this.setState({ titulo })}
                                                mode='outlined' style={estilos_agregar.inputTitulo} placeholder="Clases de ..." label="Ingresa el Título" />

                                          <Title>Categoría de la Clase</Title>
                                          <Picker
                                          selectedValue={this.state.categoria}
                                          style={{height: 50, width: 180}}
                                          onValueChange={(itemValue, itemIndex) =>
                                          this.setState({categoria: itemValue})
                                          }>
                                          <Picker.Item label="Matematicas" value="Matematicas" />
                                          <Picker.Item label="Deportes" value="Deportes" />
                                          <Picker.Item label="Tecnología" value="Tecnología" />
                                          <Picker.Item label="Arte" value="Arte" />
                                          </Picker>

                                          {/* <Picker
                                          selectedValue={this.state.categoria}
                                          style={{height: 50, width: 100}}
                                          onValueChange={(itemValue, itemIndex) =>
                                          this.setState({categoria: itemValue})
                                          }>
 
                                          <Picker.Item label="Java" value="java" />
                                          <Picker.Item label="JavaScript" value="js" />
                                          </Picker> */}

                                          <Title>Descripción</Title>
                                          <TextInput name='Descripcion' multiline={true} value={this.state.descripcion} onChangeText={(descripcion) => this.setState({ descripcion })}
                                                mode='outlined' style={estilos_agregar.inputDescripcion} placeholder="Ingresa la Descripción" label="Ingresa la Descripción" />

                                          <View style={estilos_agregar.container}>
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
                                          </View>

                                          <View style={estilos_agregar.container2}>
                                                <View style={estilos_agregar.container}>
                                                      <Title>Valor</Title>
                                                      <Icon name="money" color='#4747d1' size={44} />
                                                      <TextInput name='Titulo' value={this.state.costo} onChangeText={(costo) => this.setState({ costo })}
                                                            mode='outlined' style={estilos_agregar.input} placeholder="Ingresa el Valor" label="Ej: 5000" />
                                                </View>

                                                <View style={estilos_agregar.container}>
                                                      <Title>Ubicación</Title>
                                                      <Icon name="map" color='#4747d1' size={44} />
                                                      <TextInput name='Titulo' value={this.state.titulo} onChangeText={(titulo) => this.setState({ titulo })}
                                                            mode='outlined' style={estilos_agregar.input} placeholder="Ingresa la Ubicación" label="La Serena" />
                                                </View>
                                          </View>

                                          <Title>Cupos</Title>
                                          <View style={estilos_agregar.container2}>
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
                                          </View>
                                    </View>

                              </Card.Content>
                              <Card.Actions style={{ justifyContent: 'center' }}>
                                    <Button mode="contained" style={estilos_agregar.boton} onPress={this.agregar}>Agregar</Button>
                                    <Button mode="contained" style={estilos_agregar.boton2} onPress={this._onUpdate}>Modificar</Button>
                              </Card.Actions>
                        </Card>
                  </ScrollView>
            )
      }
}

//Estilos Agregar
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
//Fin Estilos Agregar