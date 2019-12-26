import * as React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Platform } from 'react-native'
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
                  descripcion: '',
                  costo: '',
                  cupo: 3,
                  hora_inicio: '',
                  hora_fin: '',
                  fecha: '',

                  date: new Date('2020-06-12T14:42:42'),
                  mode: 'date',
                  show: false,
            };
      }
      onPressCupo(rating) {
            this.setState({
                  cupo: rating
            });
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

                                          <Title>Descripción</Title>
                                          <TextInput name='Descripcion' value={this.state.descripcion} onChangeText={(descripcion) => this.setState({ descripcion })}
                                                mode='outlined' style={estilos_agregar.inputDescripcion} placeholder="Ingresa la Descripción" label="Ingresa la Descripción" />


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


                                          {/* <View style={estilos_agregar.container2}>
                                                <View style={estilos_agregar.container}>
                                                      <Title>Hora</Title>
                                                      <Icon name="clock-o" color='#4747d1' size={44} />
                                                      <TextInput name='Hora_Inicio' value={this.state.hora_inicio} onChangeText={(hora_inicio) => this.setState({ hora_inicio })}
                                                            mode='outlined' style={estilos_agregar.input} placeholder="Ingresa la Hora de Inicio" label="Ingresa la Hora de Inicio" />
                                                      <TextInput name='Hora_Inicio' value={this.state.hora_fin} onChangeText={(hora_inicio) => this.setState({ hora_inicio })}
                                                            mode='outlined' style={estilos_agregar.input} placeholder="Ingresa la Hora de Inicio" label="Ingresa la Hora de Inicio" />
                                                </View>
                                                <View style={estilos_agregar.container}>
                                                      <Title>Fecha</Title>
                                                      <Icon name="calendar" color='#4747d1' size={44} />
                                                      <TextInput name='Fecha' value={this.state.fecha} onChangeText={(fecha) => this.setState({ fecha })}
                                                            mode='outlined' style={estilos_agregar.input} placeholder="Ingresa la Fecha" label="Ingresa la Fecha" />
                                                </View>
                                          </View> */}

                                          <View>
                                                <View>
                                                      <Button onPress={this.datepicker} >{this.state.date.toDateString()}</Button>
                                                </View>
                                                <View>
                                                      <Button onPress={this.timepicker} >Show time picker!</Button>
                                                </View>
                                                {show && <DateTimePicker value={date}
                                                      mode={mode}
                                                      is24Hour={true}
                                                      display="default"
                                                      onChange={this.setDate} />
                                                }
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