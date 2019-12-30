import * as React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Text, Alert, RefreshControl } from 'react-native'
import { Card, Paragraph, Title, ActivityIndicator, Button } from 'react-native-paper'
import Carousel from 'react-native-snap-carousel';
import { TouchableOpacity } from 'react-native-gesture-handler';
const { height, width } = Dimensions.get('window')
import Icon from 'react-native-vector-icons/FontAwesome'


export default class buscar extends React.Component {
      constructor() {
            super()
            this.state = {
                  refreshing: false,
                  data: [],
                  rut: '',
                  categoria: [],
                  matematicas: [],
                  deportes: [],
                  tecnologia: [],
                  arte: [],
            };
      }

      inscribir(id_clase, rut) {
            console.warn(id_clase);
            fetch('http://192.168.1.156/backend/agregar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        rut_usuario_agregar: rut,
                        id_clase: id_clase,
                  })
            })
      }

      componentDidMount() {
            const { navigation } = this.props;
            const rut = navigation.getParam('rut', this.state.rut);
            this.setState({ rut: rut })

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
                        this.setState({ data: data })

                  })
            this.getCategorias()
            this.get(1).then(data => this.setState({ matematicas: data }))
            this.get(2).then(data => this.setState({ deportes: data }))
            this.get(3).then(data => this.setState({ tecnologia: data }))
            this.get(4).then(data => this.setState({ arte: data }))
      }

      getCategorias() {
            fetch('http://192.168.1.156/backend/buscar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        categoria: 'asd',
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

      get(id_categoria) {
            return fetch('http://192.168.1.156/backend/buscar.php', {
                  method: 'POST',
                  headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                  },
                  body: JSON.stringify({
                        id_categoria: id_categoria,
                  })
            })
                  .then((response) => response.json())
                  .then((res) => {
                        let data = [];
                        Object.values(res).forEach(item => {
                              data = data.concat(item);
                        });
                        return data;
                  })
      }

      render() {
            matematicas = this.state.matematicas.map((item, i, z) =>
                  <Card key={i} style={estilos_buscar.carta} onPress={() => { console.log('onPress'); }} >
                        <Card.Title title={item.titulo} subtitle={item.rut} />
                        <Card.Content>
                              <Paragraph key={i} >{item.descripcion} </Paragraph>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 }}>
                                    <Paragraph key={i} ><Icon name="money" color='black' size={16} /> ${item.costo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="map" color='black' size={16} /> {item.lugar}</Paragraph>
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>
                                    <Paragraph key={i} ><Icon name="user" color='black' size={16} /> {item.cupo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="calendar" color='black' size={16} /> {item.fecha}</Paragraph>
                              </View>
                              <Button onPress={() => this.inscribir(item.id_clase, this.state.rut)} style={estilos_buscar.boton}><Text>Inscribirse</Text></Button>
                        </Card.Content >
                  </Card>
            )

            deportes = this.state.deportes.map((item, i, z) =>
                  <Card key={i} style={estilos_buscar.carta} onPress={() => { console.log('onPress'); }} >
                        <Card.Title title={item.titulo} subtitle={item.rut} />
                        <Card.Content>
                              <Paragraph key={i} >{item.descripcion} </Paragraph>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 }}>
                                    <Paragraph key={i} ><Icon name="money" color='black' size={16} /> ${item.costo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="map" color='black' size={16} /> {item.lugar}</Paragraph>
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>
                                    <Paragraph key={i} ><Icon name="user" color='black' size={16} /> {item.cupo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="calendar" color='black' size={16} /> {item.fecha}</Paragraph>
                              </View>
                              <Text>{'\n'}</Text>
                              <Button onPress={() => this.inscribir(item.id_clase, this.state.rut)} style={estilos_buscar.boton}><Text>Inscribirse</Text></Button>
                        </Card.Content >
                  </Card>
            )

            tecnologia = this.state.tecnologia.map((item, i, z) =>
                  <Card key={i} style={estilos_buscar.carta} onPress={() => { console.log('onPress'); }} >
                        <Card.Title title={item.titulo} subtitle={item.rut} />
                        <Card.Content>
                              <Paragraph key={i} >{item.descripcion} </Paragraph>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 }}>
                                    <Paragraph key={i} ><Icon name="money" color='black' size={16} /> ${item.costo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="map" color='black' size={16} /> {item.lugar}</Paragraph>
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>
                                    <Paragraph key={i} ><Icon name="user" color='black' size={16} /> {item.cupo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="calendar" color='black' size={16} /> {item.fecha}</Paragraph>
                              </View>
                              <Text>{'\n'}</Text>
                              <Button onPress={() => this.inscribir(item.id_clase, this.state.rut)} style={estilos_buscar.boton}><Text>Inscribirse</Text></Button>
                        </Card.Content >
                  </Card>
            )

            arte = this.state.arte.map((item, i, z) =>
                  <Card key={i} style={estilos_buscar.carta} onPress={() => { console.log('onPress'); }} >
                        <Card.Title title={item.titulo} subtitle={item.rut} />
                        <Card.Content>
                              <Paragraph key={i} >{item.descripcion} </Paragraph>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingTop: 15 }}>
                                    <Paragraph key={i} ><Icon name="money" color='black' size={16} /> ${item.costo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="map" color='black' size={16} /> {item.lugar}</Paragraph>
                              </View>
                              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-around', paddingBottom: 15 }}>
                                    <Paragraph key={i} ><Icon name="user" color='black' size={16} /> {item.cupo}</Paragraph>
                                    <Paragraph key={z} ><Icon name="calendar" color='black' size={16} /> {item.fecha}</Paragraph>
                              </View>
                              <Text>{'\n'}</Text>
                              <Button onPress={() => this.inscribir(item.id_clase, this.state.rut)} style={estilos_buscar.boton}><Text>Inscribirse</Text></Button>
                        </Card.Content >
                  </Card>
            )

            return (
                  <ScrollView style={estilos_buscar.view} flexDirection='column'>

                        <RefreshControl
                              refreshing={this.state.refreshing}
                              onRefresh={this._onRefresh} />

                        <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Matematicas' : 'Cargando'}</Title>
                        {/* <Carousel layout={'default'}
                              ref={(c) => { this._carousel = c; }}
                              data={this.state.matematicas}
                              renderItem={this._renderItem}
                              sliderWidth={360}
                              itemWidth={320}
                        /> */}
                        <ScrollView
                              style={{ marginTop: 16, }}
                              horizontal={true}
                              contentContainerStyle={{ marginHorizontal: -4 }}
                              showsHorizontalScrollIndicator={false}
                              scrollEventThrottle={16}>
                              {matematicas}
                        </ScrollView>


                        <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Deportes' : 'Cargando'}</Title>
                        <ScrollView
                              style={{ marginTop: 16, }}
                              horizontal={true}
                              contentContainerStyle={{ marginHorizontal: -4 }}
                              showsHorizontalScrollIndicator={false}
                              scrollEventThrottle={16}>
                              {deportes}
                        </ScrollView>

                        <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Tecnología' : 'Cargando'}</Title>
                        <ScrollView
                              style={{ marginTop: 16, }}
                              horizontal={true}
                              contentContainerStyle={{ marginHorizontal: -4 }}
                              showsHorizontalScrollIndicator={false}
                              scrollEventThrottle={16}>
                              {tecnologia}
                        </ScrollView>

                        <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Arte' : 'Cargando'}</Title>
                        <ScrollView
                              style={{ marginTop: 16, }}
                              horizontal={true}
                              contentContainerStyle={{ marginHorizontal: -4 }}
                              showsHorizontalScrollIndicator={false}
                              scrollEventThrottle={16}>
                              {arte}
                        </ScrollView>
                        <RefreshControl
                                          refreshing={this.state.refreshing}
                                          onRefresh={this._onRefresh}
                                    />
                  </ScrollView>


            );
      }
}

const estilos_buscar = StyleSheet.create({
      carta: {
            borderRadius: 20 / 2,
            marginTop: 5,
            marginBottom: 5,
            width: 320,
            marginRight: 25,
            marginLeft: 25,
      },
      view: {
            backgroundColor: '#562583',
            height: height,
      },
      titulo: {
            paddingTop: 25,
            color: 'white',
            paddingLeft: 25,
            fontSize: 42,
      },
      descripcion: {
            paddingBottom: 150,
      },
      boton: {
            width: 140,
            backgroundColor: '#94C11F',
            borderRadius: 25,
            alignSelf: 'center',
      },
})

