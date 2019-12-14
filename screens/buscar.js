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
            console.log(this.state.data);
            const { firstQuery } = this.state;

            contents = this.state.categoria.map ( (item, i, x, z) => {
                  return(
                        <View key={i}>
                        <Title style={estilos_buscar.titulo} key={x}>{item.nombre_categoria}</Title>
                        <Carousel layout={'default'} key={z}
                        ref={(c) => { this._carousel = c; }}
                        data={this.state.data}
                        renderItem={this._renderItem}
                        sliderWidth={360}
                        itemWidth={320}/>
                        </View>
                  )
            })

            return (
                  <ScrollView style={estilos_buscar.view} flexDirection='column'>
                  {contents}

                  {/* <Title style={estilos_buscar.titulo}>{this.state.categoria != '' ? 'Titulo' : 'Cargando'}</Title> */}
                  {/* <View style={estilos_buscar.view}>
                  <Carousel layout={'default'} 
                  ref={(c) => { this._carousel = c; }}re
                  data={this.state.data}
                  renderItem={this._renderItem}
                  sliderWidth={360}
                  itemWidth={320}/>
                  </View> */}
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

