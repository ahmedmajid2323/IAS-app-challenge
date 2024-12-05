import { Image, Pressable, ScrollView, StyleSheet, Text, TouchableOpacity, View, ViewBase } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { BarChart, LineChart } from 'react-native-gifted-charts'
import { useDispatch, useSelector } from 'react-redux'
import { set_factory_name } from '../redux/zoneSlice'
import firestore from '@react-native-firebase/firestore';

const Industrielle = ({navigation}) => {

  const today_date = new Date()

  const barData = [
    {value: 230,label: 'factory 1',frontColor: '#790059'},
    {value: 180,label: 'factory 2',frontColor: '#040069'},
  ];

  const zone_inf = [
    { title: '500', subtitle: 'Workers' },
    { title: '20g/m³', subtitle: 'CO₂' },
    { title: '30', subtitle: 'MegaWatt ' },
    { title: '500 m³', subtitle: 'Water ' },
    { title: '20g/m³', subtitle: 'Humidity' },
    { title: '30°C', subtitle: 'Temp°' },
  ];

  const [factories_temp, setfactories_temp] = useState({})
  const [Air_quality_data, setAir_quality_data] = useState([])

  useEffect(() => {
    const subscriber = firestore()
      .collection('zone_2')
      .doc('zone_1')
      .onSnapshot(documentSnapshot => {
        const readings = documentSnapshot.data().industrial_zones.zone_1

        /*****************************************data for the air quality*******************************/
         const formattedData = readings.map((reading) => ({
            'value': reading.gaz_emission
        }));
        setAir_quality_data(formattedData);

        /*************************************data for the factories temprature**************************/
        
      });
  
    return ()=>subscriber()
    
  }, [])

  return (
    <LinearGradient colors={['#31543D', '#006357', '#31543D']}  style={{flex:1,padding:20}}>
      <ScrollView style={{flex:1}}>
      <View style={{flexDirection:'row',justifyContent:'space-between'}}>

      <Pressable onPress={()=>navigation.navigate('Home')} style={{flexDirection:'row',gap:5,alignItems:'center'}}>
        <Image source={require('../assets/arrow_back.png')} />
        <View style={{padding:10,paddingHorizontal:15,backgroundColor:'#4B7058',elevation:10,borderRadius:50}}>
          <Text style={{color:'white',fontWeight:700}}>Electricity Maps</Text>
        </View>
      </Pressable>

      <TouchableOpacity onPress={()=>{navigation.navigate('stack_login')}}
      style={{padding:10,backgroundColor:'#4B7058',elevation:10,borderRadius:50, alignItems:'center',justifyContent:'center'}}>
        <Image style={{width: 30 , height: 30}} source={require('../assets/login.png')} />
      </TouchableOpacity>

      </View>

      <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:20}}>
        <View style={{flexDirection:'column'}}>
          <Text style={{color:'white',fontWeight:700}}>Industrial zone Boumhal</Text>
          <Text style={{color:'white',fontWeight:400,opacity:0.5}}>{today_date.toDateString()}, {today_date.getHours()}:{today_date.getMinutes()}</Text>
        </View>
        <View style={styles.container}>
          {zone_inf.map((item, index) => (
            <View key={index} style={styles.card}>
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.subtitle}>{item.subtitle}</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:20}}>
        <Text style={{color:'white',fontWeight:700,textAlign:'center'}}>Factories T° difference</Text>
        <Text style={{color:'white',fontWeight:400,opacity:0.5,textAlign:'center',marginBottom:15}}>{today_date.toDateString()}</Text>
        <View >
          <BarChart
            showFractionalValue
            showYAxisIndices
            noOfSections={4}
            maxValue={400}
            initialSpacing={70}
            data={barData}
            isAnimated
            spacing={45}
            />
        </View>
      </View>

      <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:20}}>
        <Text style={{color:'white',fontWeight:700,marginBottom:15,textAlign:'center'}}>Air quality (PPM)</Text>
        <LineChart
          curved
          width={240}
          spacing={20}
          areaChart
          spacing={30}
          data={Air_quality_data}
          startFillColor="#031B0B"
          startOpacity={0.9}
          endFillColor="#006357"
          endOpacity={0.4}
          initialSpacing={10}
          rotateLabel={-45}
          xAxisLabelTextStyle={{
            color: 'black',
            fontSize: 10,
          }}
          pointerConfig={{
            pointerColor: '#790059',
            pointerStripColor: '#790059',
            pointerLabelComponent: (items , i) => {
              return (
                <View
                  style={{
                    height: 60,
                    elevation:10,
                    width: 70,
                    backgroundColor: '#282C3E',
                    borderRadius: 10,
                    justifyContent:'center',
                    paddingLeft:16,
                  }}>
                  <Text style={{color: 'white', fontWeight:'bold'}}>value: </Text>
                  <Text style={{color: 'white', fontWeight:'bold'}}>{items[0].value}</Text>
                </View>
              );
            },
          }}
          />
      </View>

      </ScrollView>
    </LinearGradient>
  )
}

export default Industrielle

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flexWrap: 'wrap', // Enables wrapping
    justifyContent: 'space-around', // Space between items
    padding: 10,
    alignItems:'center'
  },
  card: {
    backgroundColor: '#31543D',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 10, 
    marginBottom:10
  },
  title: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    color: '#fff',
    fontSize: 10,
  },
})