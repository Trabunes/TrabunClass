import * as React from 'react';
import { StyleSheet, ScrollView, View } from 'react-native'
import { Card, Paragraph,Title} from 'react-native-paper'
import Carousel from 'react-native-snap-carousel';

export default class buscar extends React.Component {
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
                      <Card style={estilos_buscar.carta} key={i} onPress={()=>{console.log('onPress');}} >             
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
                <View style={estilos_buscar.view} >
                <ScrollView flexDirection='column'>
                <Title style={estilos_buscar.titulo}>Matematicas</Title>
                {clases}
                </ScrollView>
                </View>
                
         )
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
      },
      titulo:{
            paddingTop: 25,
            color: 'white',
            paddingLeft: 25,
            fontSize: 42,
      }
})

