import * as React from 'react';
import { Card, Title, Paragraph, Button, TextInput, Searchbar, Chip, Avatar } from 'react-native-paper'
import { StyleSheet, ScrollView, View, Text, RefreshControl, Dimensions, ActivityIndicator, Image, Alert } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view';
import StarRating from 'react-native-star-rating';
import Icon from 'react-native-vector-icons/FontAwesome'
const { height, width } = Dimensions.get('window')

import imagotipo from '../img/imagotipo4.png';


export default class inicio extends React.Component {
      static navigationOptions = {
            header: null,
      };
      constructor(props) {
            super(props)
            this._onDelete = this._onDelete.bind(this);
            this.state = {
                  refreshing: false,
                  data: [],
                  inscritas: [],
                  id_clase: [],
                  usuario: [],
                  rut: '',
                  starCount: 3.5,
                  //Necesarias para TabView
                  index: 0,
                  routes: [
                        { key: 'first', title: 'Mis Clases' },
                        { key: 'second', title: 'Inscritas' },
                  ]
            };
      }
      onStarRatingPress(rating) {
            this.setState({
                  starCount: rating
            });
      }
      _onRefreshTutor = () => {
            fetch('http://192.168.1.156/backend/backend.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_inicio: this.state.usuario[0].rut_usuario,
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
      _onRefreshUsuario = () => {
            fetch('http://192.168.1.156/backend/backend.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_inscritos: this.state.usuario[0].rut_usuario,
                  })
            })
                  .then((response) => response.json())
                  .then((res) => {
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({ inscritas: data })

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
      anularInscripcion = (id_clase) => {
            fetch('http://192.168.1.156/backend/eliminar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_asistente: this.state.rut,
                        id_clase: id_clase,
                  })
            })
      }
      datosUsuario(rut) {
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
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({ usuario: data })
                  })
      }
      misClases(rut) {
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
                        this.setState({ data: data })
                  })
      }

      componentDidMount() {
            const { navigation } = this.props;
            const rut = navigation.getParam('rut', this.state.id_clase);
            this.setState({rut: rut})
            console.log(rut)
            this.misClases(rut);
            this.inscritas(rut);
            this.datosUsuario(rut);
      }

      misClases(rut) {
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
                        this.setState({ data: data })
                  })
      }
      inscritas(rut) {
            fetch('http://192.168.1.156/backend/backend.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_inscritos: rut,
                  })
            })
                  .then((response) => response.json())
                  .then((res) => {
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        this.setState({ inscritas: data })

                  })
      }
      mensaje = (numero) => {
            return 'numero= ' + numero;
      }
      renderScene = ({ route }) => {
            const { navigation } = this.props;
            const rut = navigation.getParam('rut', this.state.id_clase);
            switch (route.key) {
                  case 'first':
                        return <FirstRoute rut={rut}
                              data={this.state.data}
                              starCount={this.state.starCount}
                              mensaje={this.mensaje}
                        />;
                  case 'second':
                        return <SecondRoute inscritas={this.state.inscritas} />;
                  default:
                        return null;
            }
      };

      render() {
            if (this.state.usuario != '') {
                  console.warn(this.state.usuario[0].rut_usuario);
                  if (this.state.usuario[0].tipo == 0) {
                        return (
                              <ScrollView refreshControl={

                                    <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefreshUsuario} />

                              } style={styles.container}>
                                    <SecondRoute rut={this.state.rut} inscritas={this.state.inscritas} />

                                    
                                    <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefreshUsuario}
                                    />
                              </ScrollView>
                        )
                  }
                  if (this.state.usuario[0].tipo == 1) {
                        return (
                              <ScrollView refreshControl={

                                    <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefreshTutor} />

                              } style={styles.container}>
                                    
                                    <FirstRoute rut={this.state.usuario[0].rut_usuario}
                                          data={this.state.data}
                                          starCount={this.state.starCount}
                                          mensaje={this.mensaje}
                                          onNavigate={(titulo, descripcion, costo, lugar, id_clase) => this.props.navigation.navigate("Modificar", {
                                                titulo: titulo,
                                                descripcion: descripcion,
                                                costo: costo,
                                                lugar: lugar,
                                                id_clase: id_clase,
                                              })}
                                          />

                                    <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefreshTutor}
                                    />
                              </ScrollView>
                        )
                  }
            } else {
                  return (<View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#562583' }}>
                        <Image source={imagotipo} style={styles.imagotipo} ></Image>
                        <Text style={{ color: 'white' }}>Cargando Datos...</Text><ActivityIndicator size='large' />
                  </View>)
            }
            //Ojito Aquí
            return (
                  <ScrollView refreshControl={
                        <RefreshControl
                              refreshing={this.state.refreshing}

                              onRefresh={this._onRefresh} />
                  } contentContainerStyle={styles.container}>

                        <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh}
                        />

                  </ScrollView>
            )

      }
}

const FirstRoute = (props) => {
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
            Alert.alert('Se ha eliminado la clase')
      }
      _onRefresh = () => {
            fetch('http://192.168.1.156/backend/backend.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_inicio: props.rut,
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
      if (props.data == '') {
            return (
                  <View style={{ height: height }}>
                        <Text>Agrega una clase en el Modulo Agregar</Text>
                  </View>
            )
      } else {
            contents = props.data.map((item, i) => {
                  const { navigation } = props;
                  return (
                        <Card style={styles.carta} key={i}>
                              <Avatar.Text key={item.id_clase} size={42} label={item.id_clase} style={styles.icon} />

                              <Card.Title style={styles.titulo}
                                    title={item.nombre + ' ' + item.apellido}
                                    subtitle={item.rut}
                              />
                              <Card.Content>
                                    <View style={estilo_inicio.container}>
                                          <Title style={{ textAlign: 'center' }}>{item.titulo}</Title>
                                          <Paragraph>{item.descripcion}</Paragraph>
                                    </View>

                                    <View style={estilo_inicio.container}>
                                          <Title style={alignSelf = 'center'}>Cupos</Title>
                                    </View>

                                    {/* Se crea una nueva vista para alinear los iconos */}
                                    <View style={estilo_inicio.viewIcons}>
                                          <Icon name="user" color='#4747d1' size={44} />
                                          <Icon name="user" color='#4747d1' size={44} />
                                          <Icon name="user" color='#4747d1' size={44} />
                                          <Icon name="user" color='#4747d1' size={44} />
                                          <Icon name="user" color='#4747d1' size={44} />
                                    </View>
                                    {/* ----------------------------------------------- */}

                                    <View style={estilo_inicio.viewIcons}>
                                          <View style={estilo_inicio.container}>
                                                <Title>Costo</Title>
                                                <Icon name="money" color='#4747d1' size={44} />
                                                <Text size={30}>${item.costo}</Text>
                                          </View>

                                          <View style={estilo_inicio.container}>
                                                <Title>Fecha</Title>
                                                <Icon name="calendar" color='#4747d1' size={44} />
                                                <Text>{item.fecha}</Text>
                                                <Text>{item.hora_inicio}      {item.hora_fin}</Text>
                                          </View>
                                    </View>
                                    <View style={estilo_inicio.viewIcons}>
                                          {/* <View style={estilo_inicio.container}>
                                                <Title>Costo</Title>
                                                <Icon name="money" color='#4747d1' size={44} />
                                                <Text size={30}>${item.costo}</Text>
                                          </View> */}

                                          <View style={estilo_inicio.container}>
                                                <Title>Lugar</Title>
                                                <Icon name="map" color='#4747d1' size={44} />
                                                <Text>{item.lugar}</Text>
                                          </View>
                                    </View>
                              </Card.Content>
                              <Card.Actions style={{ justifyContent: 'center' }}>

                                    <Button mode="contained" key={item.id_clase} onPress={() => this._onDelete(item.id_clase)} style={styles.boton}>Eliminar</Button>
                                    <Button mode="contained" key={i} onPress={() => props.onNavigate(item.titulo, item.descripcion, item.costo, item.lugar, item.id_clase)} style={styles.boton}>Modificar</Button>

                                    {/* <Button mode="contained" style={styles.boton}>Mapa</Button> */}
                              </Card.Actions>
                        </Card>
                  );
            });
      }

      return (
            <View>{contents}</View>
      );
}

const SecondRoute = (props) => {
      anularInscripcion = (id_clase) => {
            fetch('http://192.168.1.156/backend/eliminar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_asistente: props.rut,
                        id_clase: id_clase,
                  })
            })
            Alert.alert('Has anulado la inscripción a esta clase');
      }
      _onRefresh = () => {
            fetch('http://192.168.1.156/backend/backend.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_inicio: this.state.usuario[0].rut_usuario,
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
      contents = props.inscritas.map((item, i) => {
            return (
                  <Card style={styles.carta} key={i}>
                        <Avatar.Text key={item.id_clase} size={42} label={item.id_clase} style={styles.icon} />

                        <Card.Title style={styles.titulo}
                              title={item.nombre + ' ' + item.apellido}
                              subtitle={item.rut}
                        />
                        {/* <Card.Cover source={{ uri: 'https://picsum.photos/700' }} /> */}
                        <Card.Actions style={estilo_inicio.container}>
                        </Card.Actions>
                        <Card.Content>
                              <View style={estilo_inicio.container}>
                                    <Title style={{ textAlign: 'center' }}>{item.titulo}</Title>

                                    <Paragraph>{item.descripcion}</Paragraph>

                                    {/* Se crea una nueva vista para alinear los iconos */}
                                    {/* <View style={inicio.viewIcons}>
                                          <StarRating
                                                disabled={false}
                                                maxStars={5}
                                                rating={props.starCount}
                                                selectedStar={(rating) => this.onStarRatingPress(rating)}
                                                fullStarColor={'#4747d1'}
                                          />
                                    </View> */}
                                    {/* ----------------------------------------------- */}
                              </View>

                              <View style={estilo_inicio.container}>
                                    <Title style={alignSelf = 'center'}>Cupos</Title>
                              </View>
                              {/* Se crea una nueva vista para alinear los iconos */}
                              <View style={estilo_inicio.viewIcons}>
                                    <Icon name="user" color='#4747d1' size={44} />
                                    <Icon name="user" color='#4747d1' size={44} />
                                    <Icon name="user" color='#4747d1' size={44} />
                                    <Icon name="user" color='#4747d1' size={44} />
                                    <Icon name="user" color='#4747d1' size={44} />
                              </View>
                              {/* ----------------------------------------------- */}

                              <View style={estilo_inicio.viewIcons}>
                                    <View style={estilo_inicio.container}>
                                          <Title>Costo</Title>
                                          <Icon name="money" color='#4747d1' size={44} />
                                          <Text size={30}>${item.costo}</Text>
                                    </View>

                                    <View style={estilo_inicio.container}>
                                          <Title>Fecha</Title>
                                          <Icon name="calendar" color='#4747d1' size={44} />
                                          <Text>{item.fecha}</Text>
                                          <Text>{item.hora_inicio}      {item.hora_fin}</Text>
                                    </View>
                              </View>
                              <Button mode="contained" key={item.id_clase} onPress={() => this.anularInscripcion(item.id_clase)} style={styles.botonInscrito}>Anular Inscripción</Button>
                        </Card.Content>

                  </Card>
            );
      });
      return (
            <View style={[styles.scene, { backgroundColor: '#9E197E' }]}>
                  {contents}
            </View>
      );

};


const styles = StyleSheet.create({
      container: {
            backgroundColor: '#773192',
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
      boton: {
            marginTop: 5,
            marginLeft: 5,
            width: 100,
            marginLeft: 10,
            backgroundColor: '#562583',
            borderRadius: 25,
      },
      botonInscrito: {
            marginTop: 5,
            marginLeft: 5,
            width: 230,
            alignSelf: 'center',
            marginLeft: 10,
            backgroundColor: 'red',
            borderRadius: 25,
      },
      imagotipo: {
            flex: 0,
            width: 200,
            height: 200,
            justifyContent: 'center',
            alignItems: 'center',
            marginBottom: 20,
      },
      carta: {
            alignContent: 'center',
            // borderRadius: 25,
            borderRadius: 50 / 2,
            marginTop: 15,
            marginLeft: 10,
            marginRight: 10,
            marginBottom: 15,
      }
});

const estilo_inicio = StyleSheet.create({
      viewIcons: {
            flexDirection: 'row',
            justifyContent: 'space-between',
      },
      container: {
            flex: 1,
            paddingLeft: 5,
            alignItems: 'center',
            justifyContent: 'center',
      },
})
