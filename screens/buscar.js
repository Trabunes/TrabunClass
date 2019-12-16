import * as React from 'react';
import { StyleSheet, ScrollView, View, Dimensions, Text } from 'react-native'
import { Card, Paragraph,Title, ActivityIndicator} from 'react-native-paper'
import Carousel from 'react-native-snap-carousel';
const {height, width} = Dimensions.get('window')


export default class buscar extends React.Component {
    constructor() {
          super()
          this.state = {
                data: [],
                rut: '',
                categoria: [],
                matematicas: [],
                deportes: [],
                tecnologia: [],
                arte: [],
                prueba: [['asd'],['asd']],
                
          };
        }
        
        componentDidMount() {
          const { navigation } = this.props;  
          const rut = navigation.getParam('rut', this.state.rut);
          this.setState({rut: rut})

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
            this.getCategorias()
            this.get(1).then(data => this.setState({matematicas: data}))
            this.get(2).then(data => this.setState({deportes: data}))
            this.get(3).then(data => this.setState({tecnologia: data}))
            this.get(4).then(data => this.setState({arte: data}))
          }

          getCategorias(){
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
                        this.setState({categoria: data})

                  })
            
          }

          get(id_categoria){
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

          _renderItem ({item, i}) {
                  return (
                      <Card style={estilos_buscar.carta} onPress={()=>{console.log('onPress');}} >             
                      <Card.Title title={item.titulo} subtitle={item.rut}/>
                      <Card.Content>
                      <Paragraph>{item.descripcion} </Paragraph>
                      </Card.Content>
                      </Card>
                  );                
            }
       

      render() {
            console.log(this.state.categoria)
            return (
                  <ScrollView style={estilos_buscar.view} flexDirection='column'>
                  <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Matematicas' : 'Cargando'}</Title>
                  <Carousel layout={'default'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.matematicas}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={320}
                        />
                  
                  <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Deportes' : 'Cargando'}</Title>
                  <Carousel layout={'default'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.deportes}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={320}
                        />
                  
                  <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Tecnología' : 'Cargando'}</Title>
                  <Carousel layout={'default'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.tecnologia}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={320}
                        />
                  
                  <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Arte' : 'Cargando'}</Title>
                  <Carousel layout={'default'}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.arte}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={320}
                        />

                  </ScrollView>

                  
            );   
    }
}

const estilos_buscar = StyleSheet.create({
    carta: {
      borderRadius: 20/2,
            marginTop: 5,
            marginBottom: 5,
            height: 180,
            width: 320,
      },
      view:{
            backgroundColor: '#562583',
            height: height,
      },
      titulo:{
            paddingTop: 25,
            color: 'white',
            paddingLeft: 25,
            fontSize: 42,
      }
})

