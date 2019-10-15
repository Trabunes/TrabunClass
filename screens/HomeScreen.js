import * as React from 'react';
import { StyleSheet, ScrollView, View, Text, FlatList, RefreshControl, Dimensions } from 'react-native'
import { Card, Title, Paragraph, Button, TextInput, Searchbar, Chip, Avatar } from 'react-native-paper'
import { createMaterialBottomTabNavigator} from 'react-navigation-material-bottom-tabs'
import Carousel from 'react-native-snap-carousel';
import MapView, {Marker} from 'react-native-maps';
import StarRating from 'react-native-star-rating';
import { TabView, SceneMap } from 'react-native-tab-view';
import Geolocation from '@react-native-community/geolocation';


const {width, height} = Dimensions.get('window')

import Icon from 'react-native-vector-icons/FontAwesome'

const ASPECT_RATIO = width / height
const LATTITUDE_DELTA = 0.0922
const LONGITITUD_DELTA = LATTITUDE_DELTA * ASPECT_RATIO

const FirstRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#562583' }]} />
    );
    
    const SecondRoute = () => (
      <View style={[styles.scene, { backgroundColor: '#562583' }]} />
    );

class HomeScreen extends React.Component{
            render() {
                  return(
                        <Title style={styles.titulo}>Bienvenido a TrabünClass</Title>
                  );
            }
}

class vistaInicio extends React.Component {
      // static navigationOptions = { title: 'Welcome', header: { visible:false } };
      static navigationOptions = {
            header: null,
            };

            constructor() {
                  super()
                  this._onDelete = this._onDelete.bind(this);
                  this.state = {
                        refreshing: false,
                        data: [],
                        id_clase: [],
                        rut: '',
                        starCount: 3.5,
                        index: 0,
                        routes: [
                          { key: 'first', title: 'Mis Clases' },
                          { key: 'second', title: 'Inscritas' },
                        ],
                        
                  };
                  }

                  onStarRatingPress(rating) {
                        this.setState({
                          starCount: rating
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
                              this.setState({data: data})
                              
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
                              id: e,
                              })
                        })
                  }
            componentDidMount() {
                  const { navigation } = this.props;  
                  const rut = navigation.getParam('rut', this.state.id_clase);
                  this.setState({rut: rut})
                  console.log(rut)

                  fetch('http://192.168.1.156/backend/backend.php', {
                        method: 'POST',
                        headers: {
                              'Accept': 'application/json',
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({
                              rut_usuario_inicio: rut,
                              })
                        })
                        .then((response) => response.json())                       
                        .then((res) => {
                              let data = [];
                              Object.values(res).forEach(item => {
                                    data = data.concat(item);
                              });
                              this.setState({data: data})
                              
                        })   
                  }

      render() {
            var {navigate} = this.props.navigation;
            
            //Ojito Aquí
            contents = this.state.data.map( (item, i) => {                  
                  return (
                        <Card style={styles.carta} key={i}>          
                        <Avatar.Text key={item.id_clase} size={42} label={item.id_clase} style={styles.icon} />
                           
                        <Card.Title style={styles.titulo}
                        title={item.nombre + ' ' +item.apellido} 
                        subtitle={item.rut}
                        />
                        <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
                        <Card.Actions>
                              <Button mode="contained" style={styles.boton} onPress={ () => this.props.navigation.navigate('Agregar', {
                                                                                            id: item.id_clase,
                                                                                            rut_clase: item.rut,
                                                                                            titulo: item.titulo,
                                                                                            descripcion: item.descripcion,
                                                                                            costo: item.costo,
                                                                                            cupo: item.cupo,
                                                                                            hora_inicio: item.hora_inicio,
                                                                                            hora_fin: item.hora_fin,
                                                                                            fecha: item.fecha,

                              })}>Modificar</Button>
                              <Button mode="contained" key={item.id_clase} onPress={() => this._onDelete(item.id_clase)} style={styles.boton}>Eliminar</Button>
                              <Button mode="contained" style={styles.boton}>Mapa</Button>
                        </Card.Actions>
                        <Card.Content>
                              <View style={inicio.container}>
                                    <Title style={{textAlign: 'center'}}>{item.titulo}</Title>

                                    <Paragraph>{item.descripcion}</Paragraph>

                                          {/* Se crea una nueva vista para alinear los iconos */}
                                          <View style={inicio.viewIcons}>
                                          <StarRating
                                          disabled={false}
                                          maxStars={5}
                                          rating={this.state.starCount}
                                          selectedStar={(rating) => this.onStarRatingPress(rating)}
                                          fullStarColor={'#4747d1'}
                                          />
                                          </View>
                                          {/* ----------------------------------------------- */}
                              </View>

                              <View style={inicio.container}>
                              <Title style={alignSelf= 'center'}>Cupos</Title>
                              </View> 

                              {/* Se crea una nueva vista para alinear los iconos */}
                              <View style={inicio.viewIcons}>
                              <Icon name="user" color='#4747d1' size={44}/>
                              <Icon name="user" color='#4747d1' size={44}/>
                              <Icon name="user" color='#4747d1' size={44}/>
                              <Icon name="user" color='#4747d1' size={44}/>
                              <Icon name="user" color='#4747d1' size={44}/>
                              </View>
                              {/* ----------------------------------------------- */}

                              <View style={inicio.viewIcons}>
                                    <View style={inicio.container}>
                                          <Title>Costo</Title>
                                          <Icon name="money" color='#4747d1' size={44}/>
                                          <Text size={30}>${item.costo}</Text>
                                    </View>

                                    <View style={inicio.container}>
                                          <Title>Fecha</Title>
                                          <Icon name="calendar" color='#4747d1' size={44}/>
                                          <Text>{item.fecha}</Text>
                                          <Text>{item.hora_inicio}      {item.hora_fin}</Text>
                                    </View>
                              </View>

                        </Card.Content>
      
                        </Card>
                  );

               });
            
            return (
                  <ScrollView refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                      />
                  } style={styles.container}>

                        <TabView
                        navigationState={this.state}
                        renderScene={SceneMap({
                        first: FirstRoute,
                        second: SecondRoute,
                        })}
                        onIndexChange={index => this.setState({ index })}
                        initialLayout={{ width: Dimensions.get('window').width}}
                        />      

                  <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh}
                        />
                  {contents}
              </ScrollView>
              
           )
           
      }
}
//Estilos Inicio
const inicio = StyleSheet.create({
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
      container: {
            flex: 1,
            paddingLeft: 5,
            alignItems: 'center',
            justifyContent: 'center',
      },
})

class vistaPerfil extends React.Component {
      constructor() {
            super()
            this.state = {
               refreshing: false,
               rut: '',
               nombre: '',
               apellido: '',
               data: [],
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
             fetch('http://192.168.1.156/backend/buscar.php', {
                  method: 'POST',
                  headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut: this.state.rut,
                      })
             })
            
                  .then((response) => response.json())                       
                  .then((res) => {

                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({data: data})
                        
                  })
                  
                  .catch((error) => {
                  console.error(error);
            });
            }
      render() {
            contents = this.state.data.map( (item, i) => {                  
                  return (
                  <View style={perfil.container} key={i}>
                  <Card style={perfil.cartaNombres} key={i}>             
                        <Card.Content>
                              <Title>{item.nombre} {item.apellido}</Title>
                              <Paragraph>{item.rut}</Paragraph>
                              <Paragraph>{item.longitud}</Paragraph>
                              <Paragraph>{item.latitud}</Paragraph>
                        </Card.Content>
                        <Card.Actions>
                              <Button mode="contained" style={perfil.boton2} onPress={(e) => this._onDelete(item.rut)}>Eliminar</Button>
                              <Button mode="contained" style={perfil.boton2} onPress={(e) => this._onDelete(item.rut)}>Modificar</Button>
                        </Card.Actions>
                  </Card>
                  </View>
                  );

               });
            return (      
                  <ScrollView refreshControl={
                        <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}/>} style={styles.container}>
                  <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this._onRefresh}
                  />
                  <Card style={perfil.carta} >             
                        <Card.Content>
                              <Title>Agregar Profesor</Title>
                              <TextInput value={this.state.rut} onChangeText={(rut) => this.setState({rut}) }
                               mode='outlined' style={perfil.input} placeholder="Ingresa el Rut" label="Ingresa el Rut"/>
                               
                              <TextInput name='Nombre' value={this.state.nombre} onChangeText={(nombre) => this.setState({nombre})} 
                               mode='outlined' style={perfil.input} placeholder="Ingresa el Nombre" label="Ingresa el Nombre"/>
                               
                              <TextInput value={this.state.apellido} onChangeText={(apellido) => this.setState({apellido})} 
                               mode='outlined' style={perfil.input} placeholder="Ingresa el Apellido" label="Ingresa el Apellido"/>

                              <TextInput  value={this.state.contraseña} onChangeText={(contraseña) => this.setState({contraseña})} 
                               mode='outlined' style={perfil.input} placeholder="Ingresa la Contraseña" label="Ingresa la Contraseña"/>

                        </Card.Content>
                        <Card.Actions>
                              <Button mode="contained" style={perfil.boton1} onPress={this.probar}>Modificar</Button>
                              <Button mode="contained" style={perfil.boton1} onPress={this.probar}>Agregar</Button>
                        </Card.Actions>
                  </Card>
                  {contents}
                  </ScrollView>
           );
      }
}
//Estilos Perfil
            const perfil = StyleSheet.create({
                  container: {
                        flex: 1,
                        backgroundColor: '#562583',
                        alignItems: 'center',
                        justifyContent: 'center',
              
                  },
                  carta: {
                        borderRadius: 20/2,
                        marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                        height: 420,
                        width: 350,   
                  },
                  cartaNombres: {
                        borderRadius: 20/2,
                        marginTop: 5,
                        marginLeft: 5,
                        marginRight: 5,
                        marginBottom: 5,
                        height: 125,
                        width: 350,   
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
                  boton1: {
                        marginTop: 5,
                        marginLeft: 10,
                        width: 100,
                        marginBottom: 10,
                        backgroundColor: '#562583',
                        borderRadius: 25,
                      },
                  boton2: {
                        marginBottom: 100,
                        marginLeft: 230,
                        width: 100,
                        backgroundColor: '#562583',
                        borderRadius: 25,
                      },
            })
class vistaMapa extends React.Component {
      static navigationOptions = {
            header: null,
            };

      constructor(){
            super()

            this.state = {
                  data: [],
                  initialPosition: {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                  },
                  newPosition: {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                  },
                  markers: []
            }
            
      }
      componentDidMount(){
            Geolocation.getCurrentPosition(
                  (position) => {
                        var lat = parseFloat(position.coords.latitude)
                        var lon = parseFloat(position.coords.longitude)

                        var initialRegion = {
                              latitude: lat,
                              longitude: lon,
                              latitudeDelta: LATTITUDE_DELTA,
                              longitudeDelta: LONGITITUD_DELTA,
                        }

                        this.setState({initialPosition: initialRegion})
                        this.setState({markerPosition: initialRegion})
                        this.actualizarPosicion(this.state.initialPosition.latitude, this.state.initialPosition.longitude)
                        this.buscarUsuario();
                  },
                  error => console.log(error), 
                  { enableHighAccuracy: false, timeout: 1500000, maximumAge: 0 })
                  this.watchID = Geolocation.watchPosition((position)=>{
                        var lat = parseFloat(position.coords.latitude)
                        var lon = parseFloat(position.coords.longitude)

                        var lastRegion = {
                              latitude: lat,
                              longitude: lon,
                              longitudeDelta: LONGITITUD_DELTA,
                              latitudeDelta: LATTITUDE_DELTA,
                        }
                        this.setState({initialPosition: lastRegion})
                        this.setState({markerPosition: lastRegion})
                  })
 
      }

      componentDidUpdate(){
            Geolocation.getCurrentPosition(
                  (position) => {
                        var lat = parseFloat(position.coords.latitude)
                        var lon = parseFloat(position.coords.longitude)

                        var initialRegion = {
                              latitude: lat,
                              longitude: lon,
                              latitudeDelta: LATTITUDE_DELTA,
                              longitudeDelta: LONGITITUD_DELTA,
                        }

                        this.setState({newPosition: initialRegion})
                        // console.warn(this.state.newPosition.latitude);
                        // console.warn(this.state.newPosition.longitude);
                        this.actualizarPosicion(this.state.newPosition.latitude, this.state.newPosition.longitude)
                        this.buscarUsuario();
                  },
                  error => console.log(error), 
                  { enableHighAccuracy: false, timeout: 1500000, maximumAge: 0 })
                  this.watchID = Geolocation.watchPosition((position)=>{
                        var lat = parseFloat(position.coords.latitude)
                        var lon = parseFloat(position.coords.longitude)

                        var lastRegion = {
                              latitude: lat,
                              longitude: lon,
                              longitudeDelta: LONGITITUD_DELTA,
                              latitudeDelta: LATTITUDE_DELTA,
                        }
                        this.setState({newPosition: lastRegion})
                  })
 
      }
      actualizarPosicion(la, lo){
            const { navigation } = this.props;
            const rut = navigation.getParam('rut', 'NO-RUT');
            console.log(rut)
            fetch('http://192.168.1.156/backend/modificar.php', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut: rut,
                        latitude: la,
                        longitude: lo,
                  }),
                  
            })
      }
      buscarUsuario = () => {
            const { navigation } = this.props;
            const rut = navigation.getParam('rut', 'NO-RUT');
            fetch('http://192.168.1.156/backend/buscar.php', {
                  method: 'POST',
                  headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut: rut,
                  }),
            })
            .then((response) => response.json())
            .then((res) => {
                  this.setState({ markers: res,
                  }); 
                  console.log(this.state.markers)

            });
            
          }
      componentWillUnmount(){
            Geolocation.clearWatch(this.watchID)
      }

      render() {
            usuarios = this.state.markers.map( (item, i) => {   
                  return (
                        <MapView.Marker key={i}
                              coordinate={{latitude: parseFloat(item.latitud),
                                    longitude: parseFloat(item.longitud),
                                    longitudeDelta: LONGITITUD_DELTA,
                                    latitudeDelta: LATTITUDE_DELTA,}}>
                              <View style={mapa.radius}>
                                    <View style={styles.marker}>

                                    </View>
                              </View>
                              <MapView.Callout>
                              <View>
                              <Text>{item.nombre}  {item.apellido}</Text>
                              </View>
                              </MapView.Callout>
                        </MapView.Marker>
                  );

               });
            return (
                  <View style={mapa.container}>
                        <MapView
                              style={mapa.map}
                              region={this.state.initialPosition}>
                        {usuarios}
                        </MapView>
                        
                </View>
           )
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
            top:0,
            bottom: 0,
            position: 'absolute'
      },
     });
class vistaBuscar extends React.Component {

      constructor() {
            super()
            this.state = {
                  data: [],
                  rut: '',
                  
            };
            }

          componentDidMount() {
            const { navigation } = this.props;  
            const rut = navigation.getParam('rut', this.state.rut);
            this.setState({rut: rut})
            console.log(rut)

            fetch('http://192.168.1.156/backend/buscar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_buscar: 'asd',
                        })
                  })
                  .then((response) => response.json())                       
                  .then((res) => {
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({data: data})
                        
                  })   
            }

            _renderItem ({item, i}) {
                  return (
                        <Card style={styles.carta2} key={i} onPress={()=>{console.log('onPress');}} >             
                        <Card.Title title={item.titulo} subtitle={item.rut}/>
                        <Card.Content>
                        <Paragraph>{item.descripcion} </Paragraph>
                        </Card.Content>
                        </Card>
                  );
              }
      render() {
            const { firstQuery } = this.state;

            clases = this.state.data.map( (item, i) => {                  
                  return (
                        <Carousel layout={'default'} key={i}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={320}
                      />

                  );

               });
            return (
                  <View style={styles.view} >
                  <Searchbar
                  placeholder="Search"
                  onChangeText={query => { this.setState({ firstQuery: query }); }}
                  value={firstQuery}
                  />
                  <ScrollView flexDirection='column'>
                  {clases}
                  </ScrollView>
                  </View>
                  
           )
      }
}

class vistaAgregar extends React.Component {
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
                  latitud: '',
                  longitud: '',
                  initialPosition: {
                        latitude: 0,
                        longitude: 0,
                        latitudeDelta: 0,
                        longitudeDelta: 0,
                  },
                  
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
                              this.setState({data: data})
                              
                        })  
                        
                      }

                  componentcomponentDidUpdate(){
                  console.warn(this.state.cupo)
                  this.setState({sesion: 1})
                  const { navigation } = this.props;  
                  const id = navigation.getParam('id', this.state.id_clase);
                  const rut = navigation.getParam('rut', this.state.rut);
                  const rut_clase = navigation.getParam('rut_clase', this.state.rut_clase);
                  const titulo = navigation.getParam('titulo', this.state.titulo);
                  const descripcion = navigation.getParam('descripcion', this.state.descripcion);
                  const costo = navigation.getParam('costo', this.state.costo);
                  const cupo = navigation.getParam('cupo', this.state.cupo);
                  const hora_inicio = navigation.getParam('hora_inicio', this.state.hora_inicio);
                  const hora_fin = navigation.getParam('hora_fin', this.state.hora_fin);
                  const fecha = navigation.getParam('fecha', this.state.fecha);

                  // this.setState({data: {
                  //                   rut: rut,
                  //                   rut_clase: rut_clase,
                  //                   titulo: titulo,
                  //                   descripcion: descripcion,
                  //                   costo: costo,
                  //                   hora_inicio: hora_inicio,
                  //                   hora_fin: hora_fin,
                  //                   fecha: fecha,
                  //                   descripcion: descripcion
                  // }})
                  this.setState({rut: rut})           
                  this.setState({titulo: titulo})
                  this.setState({descripcion: descripcion})
                  this.setState({costo: costo})
                  this.setState({cupo: cupo})
                  this.setState({hora_inicio: hora_inicio})
                  this.setState({hora_fin: hora_fin})
                  this.setState({fecha: fecha})
                  this.setState({descripcion: descripcion})       
                  console.warn(this.state.data)
            }
            
            componentDidMount() {
                  const { navigation } = this.props;  
                  const id = navigation.getParam('id', this.state.id_clase);
                  const rut = navigation.getParam('rut', this.state.rut);
                  const rut_clase = navigation.getParam('rut_clase', this.state.rut_clase);
                  const titulo = navigation.getParam('titulo', this.state.titulo);
                  const descripcion = navigation.getParam('descripcion', this.state.descripcion);
                  const costo = navigation.getParam('costo', this.state.costo);
                  const cupo = navigation.getParam('cupo', this.state.cupo);
                  const hora_inicio = navigation.getParam('hora_inicio', this.state.hora_inicio);
                  const hora_fin = navigation.getParam('hora_fin', this.state.hora_fin);
                  const fecha = navigation.getParam('fecha', this.state.fecha);
                  
                  this.setState({sesion: 1})
                  this.setState({id_clase: id})
                  this.setState({rut: rut})
                  this.setState({rut_clase: rut_clase})
                  this.setState({titulo: titulo})
                  this.setState({descripcion: descripcion})
                  this.setState({costo: costo})
                  this.setState({cupo: cupo})
                  this.setState({hora_inicio: hora_inicio})
                  this.setState({hora_fin: hora_fin})
                  this.setState({fecha: fecha})
                  this.setState({descripcion: descripcion})

                  Geolocation.getCurrentPosition(
                        (position) => {
                              var lat = parseFloat(position.coords.latitude)
                              var lon = parseFloat(position.coords.longitude)
      
                              var initialRegion = {
                                    latitude: lat,
                                    longitude: lon,
                                    latitudeDelta: LATTITUDE_DELTA,
                                    longitudeDelta: LONGITITUD_DELTA,
                              }
      
                              this.setState({initialPosition: initialRegion})
                              // console.warn(this.state.initialPosition.latitude);
                              // console.warn(this.state.initialPosition.longitude);
                        },
                        error => console.log(error), 
                        { enableHighAccuracy: false, timeout: 100000, maximumAge: 0 })
                        this.watchID = Geolocation.watchPosition((position)=>{
                              var lat = parseFloat(position.coords.latitude)
                              var lon = parseFloat(position.coords.longitude)
      
                              var lastRegion = {
                                    latitude: lat,
                                    longitude: lon,
                                    longitudeDelta: LONGITITUD_DELTA,
                                    latitudeDelta: LATTITUDE_DELTA,
                              }
                              this.setState({initialPosition: lastRegion})
                        })

                  this.setState({longitud: this.state.initialPosition.longitude})
                  this.setState({latitud: this.state.initialPosition.latitude})
                  }
            
                  // componentDidUpdate(){
                  //       if (prevState.slideActive !== this.state.slideActive && this.state.slideActive) {
                  //             console.log("Thumbs showing");
                  //             this.setState({
                  //               slideActive: false
                  //             });
                  //           }

                  //       console.warn("DidUpdate")
                  //       this.setState({sesion: 1})
                  //       const { navigation } = this.props;  
                  //       const id = navigation.getParam('id', this.state.id_clase);
                  //       const rut = navigation.getParam('rut', this.state.rut);
                  //       const rut_clase = navigation.getParam('rut_clase', this.state.rut_clase);
                  //       const titulo = navigation.getParam('titulo', this.state.titulo);
                  //       const descripcion = navigation.getParam('descripcion', this.state.descripcion);
                  //       const costo = navigation.getParam('costo', this.state.costo);
                  //       const cupo = navigation.getParam('cupo', this.state.cupo);
                  //       const hora_inicio = navigation.getParam('hora_inicio', this.state.hora_inicio);
                  //       const hora_fin = navigation.getParam('hora_fin', this.state.hora_fin);
                  //       const fecha = navigation.getParam('fecha', this.state.fecha);
      
                  //       this.setState({rut: rut})           
                  //       this.setState({titulo: titulo})
                  //       this.setState({descripcion: descripcion})
                  //       this.setState({costo: costo})
                  //       this.setState({cupo: cupo})
                  //       this.setState({hora_inicio: hora_inicio})
                  //       this.setState({hora_fin: hora_fin})
                  //       this.setState({fecha: fecha})
                  //       this.setState({descripcion: descripcion})       
                        
                  // }

                  componentWillUnmount(){
                        this.setState({sesion: 0})
                        console.warn("desactivada")
                  }
                  
      render() {
            return (            
                  <ScrollView flexDirection='column' style={agregar.scroll}>
                  <Card style={agregar.carta} >             
                        <Card.Content>
                        <View style={agregar.container}>
                              <Title alignItems='center'>Agregar Clase</Title>

                              {/* <View style={agregar.container2}>
                                    <View style={agregar.container}>
                                          <Title>Rut Usuario</Title>
                                          <TextInput name='Rut' value={this.state.rut} onChangeText={(rut) => this.setState({rut}) }
                                          mode='outlined' style={agregar.input} placeholder="19352007-3" label="Ingresa tu Rut"/> 
                                    </View>
                              </View> */}


                              <Title>Título de la Clase</Title>
                              <TextInput name='Titulo' value={this.state.titulo} onChangeText={(titulo) => this.setState({titulo})} 
                               mode='outlined' style={agregar.inputTitulo} placeholder="Clases de ..." label="Ingresa el Título"/>               

                              <Title>Descripción</Title>
                              <TextInput name='Descripcion' value={this.state.descripcion} onChangeText={(descripcion) => this.setState({descripcion})} 
                               mode='outlined' style={agregar.inputDescripcion} placeholder="Ingresa la Descripción" label="Ingresa la Descripción"/>
                        

                              <View style={agregar.container2}>
                                    <View style={agregar.container}>
                                          <Title>Valor</Title>
                                          <Icon name="money" color='#4747d1' size={44}/>
                                          <TextInput name='Titulo' value={this.state.costo} onChangeText={(costo) => this.setState({costo})} 
                                          mode='outlined' style={agregar.input} placeholder="Ingresa el Valor" label="Ej: 5000"/> 
                                    </View>

                                    <View style={agregar.container}>
                                          <Title>Ubicación</Title>
                                          <Icon name="map" color='#4747d1' size={44}/>
                                          <TextInput name='Titulo' value={this.state.titulo} onChangeText={(titulo) => this.setState({titulo})} 
                                          mode='outlined' style={agregar.input} placeholder="Ingresa la Ubicación" label="La Serena"/> 
                                    </View>
                              </View>
                              
                              <Title>Cupos</Title>
                              {/* <Icon name="users" color='#4747d1' size={44}/>
                              <TextInput name='Cupo' value={this.state.cupo} onChangeText={(cupo) => this.setState({cupo})} 
                               mode='outlined' style={agregar.input} placeholder="Ingresa el Cupo" label="Ingresa el Cupo" keyboardType={'numeric'}/> */}             
                               <View style={agregar.container2}>
                               <StarRating
                                    starStyle={agregar.cupo}
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


                               <View style={agregar.container2}>
                                    <View style={agregar.container}>
                                          <Title>Hora</Title>
                                          <Icon name="clock-o" color='#4747d1' size={44}/>
                                          <TextInput name='Hora_Inicio' value={this.state.hora_inicio} onChangeText={(hora_inicio) => this.setState({hora_inicio})} 
                                          mode='outlined' style={agregar.input} placeholder="Ingresa la Hora de Inicio" label="Ingresa la Hora de Inicio"/>
                                          <TextInput name='Hora_Inicio' value={this.state.hora_fin} onChangeText={(hora_inicio) => this.setState({hora_inicio})} 
                                          mode='outlined' style={agregar.input} placeholder="Ingresa la Hora de Inicio" label="Ingresa la Hora de Inicio"/>                  
                                    </View>
                                    <View style={agregar.container}>
                                          <Title>Fecha</Title>
                                          <Icon name="calendar" color='#4747d1' size={44}/>
                                          <TextInput name='Fecha' value={this.state.fecha} onChangeText={(fecha) => this.setState({fecha})} 
                                          mode='outlined' style={agregar.input} placeholder="Ingresa la Fecha" label="Ingresa la Fecha"/>
                                    </View>
                              </View>

                              
                        </View>
                        </Card.Content>
                        <Card.Actions>
                              <Button mode="contained" style={agregar.boton} onPress={this.agregar}>Agregar</Button>
                              <Button mode="contained" style={agregar.boton} onPress={this._onUpdate}>Modificar</Button>
                        </Card.Actions>
                  </Card>
                  </ScrollView>
           )
      }
}
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
            borderRadius: 20/2,
            marginTop: 10,
            marginLeft: 5,
            marginRight: 5,
            marginBottom: 15,
            height: 1200,
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
      HomeScreen: { screen: HomeScreen},
      Inicio: { screen: vistaInicio,
            navigationOptions:{
                  tabBarLabel: 'Inicio',
                  tabBarIcon: ({tintColor})=>(
                        <Icon name="home" color={tintColor} size={24}/>
                  ),
                  tabBarColor: '#562583',
            }
      },
      Perfil:  { screen: vistaPerfil,
            navigationOptions:{
                  tabBarLabel: 'Perfil',
                  tabBarIcon: ({tintColor})=>(
                        <Icon name="user" color={tintColor} size={24}/>
                  ),
                  tabBarColor: '#773192',
            }},
      Mapa:  { screen: vistaMapa,
            navigationOptions:{
                  tabBarLabel: 'Mapa',
                  tabBarIcon: ({tintColor})=>(
                        <Icon name="map-marker" color={tintColor} size={24}/>
                  ),
                  tabBarColor: '#562583',
            }},
      Buscar:  { screen: vistaBuscar,
            navigationOptions:{
                  tabBarLabel: 'Buscar',
                  tabBarIcon: ({tintColor})=>(
                        <Icon name="search" color={tintColor} size={24}/>
                  ),
                  tabBarColor: '#773192',
            }},
      Agregar:  { screen: vistaAgregar,
            navigationOptions:{
                  tabBarIcon: ({tintColor})=>(
                        <Icon style={styles.icon2} name="plus-square" color={tintColor} size={28}/>
                  ),
                  tabBarColor: '#773192',
            }},

            },{
            initialRouteName: 'Inicio', 
            order: ['Inicio', 'Buscar', 'Agregar','Mapa' ,'Perfil'],
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
    view:{
      backgroundColor: '#562583',
    },
    scrollview1:{
      flex: 1, flexDirection: 'row', justifyContent: 'flex-end'
    },
    scrollview2:{
      flex: 1, flexDirection: 'row', justifyContent: 'flex-end' 
   },
   para:{
      marginBottom: 500,
   },
    titulo:{
      flex: 1,
      marginLeft: 50,
      textAlign: 'center',
      fontWeight: 'bold',
      height:'100%',
      width:'100%',
    },
    icon: {
      marginTop: 5,
      marginLeft: 5,
      position: 'absolute',
      left: 2, // Keep some space between your left border and Image
    },
    icon2:{
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
    carta: {
      // borderRadius: 25,
      borderRadius: 20/2,
      marginTop: 5,
      marginLeft: 5,
      marginRight: 5,
      marginBottom: 5,
    },
    carta2: {
      borderRadius: 20/2,
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
  
 