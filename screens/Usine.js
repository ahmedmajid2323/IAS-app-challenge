import { StyleSheet, Text, View, Pressable , Image , ScrollView, Modal , TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import firestore from '@react-native-firebase/firestore';
import { LineChart, PieChart } from 'react-native-gifted-charts'
import SelectDropdown from 'react-native-select-dropdown';
import auth from '@react-native-firebase/auth';
import { useDispatch, useSelector } from 'react-redux';
import { set_factoryAdmin, set_factoryName } from '../redux/zoneSlice';

const renderDot = (color) => {
    return (
      <View  
        style={{ height: 10, width: 10,borderRadius: 5,backgroundColor: color, marginRight: 10}}/>
    );
  };
  
  const renderLegendComponent = (elec , hyd , solar) => {
    return (
      <>
        <View style={{flexDirection: 'row',justifyContent: 'center',marginBottom: 10,}}>
          <View style={{flexDirection: 'row',alignItems: 'center',width: 120,marginRight: 20,}}>
            {renderDot('#790059')}
            <Text style={{color: 'white'}}>Electricity: {elec}%</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#031B0B')}
            <Text style={{color: 'white'}}>Hydrogen: {hyd}%</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row',alignItems: 'center',width:260}}>
            {renderDot('#040069')}
            <Text style={{color: 'white'}}>Solar: {solar}%</Text>
          </View>
        </View>
      </>
    );
  };

const Usine = ({navigation}) => {

  const admin = useSelector(state=>state.factory.factoryAdmin)
  const dispatch = useDispatch()
  const [loading, setLoading] = useState(true); 

  const [Temperature_data, setTemperature_data] = useState([])
  const [Humidity_data, setHumidity_data] = useState([])
  const [batteries, setbatteries] = useState([])
  const [hydrogen, sethydrogen] = useState([])
  const [solar_panels, setsolar_panels] = useState([])

  useEffect(() => {
    
    const usersCollection = firestore()
    .collection('zone_2')
    .doc('zone_1')
    .onSnapshot(documentSnapshot => {
      const data = documentSnapshot.data()
      /********************************************************* set admin data *****************************************/
      const admin_data = data.industrial_zones.admin.filter(item => item.email == admin.email)
      dispatch(set_factoryAdmin({
        email: admin.email ,
        displayName: admin_data[0]?.name ,
        factory_name:admin_data[0]?.factory
      }))
      /********************************************************* set humidity data *****************************************/
      const factory_name = admin.factory_name
      const formatted_data = data.industrial_zones.zone_1.map(elt=>({
        'industry_data': elt.industries[factory_name]
      }))
      const humidity_data = formatted_data.map(item => ({
        'value': item.industry_data?.humidity
      }))
      setHumidity_data(humidity_data)
      /********************************************************* set temperature data *****************************************/
      const temperature_data = formatted_data.map(item => ({
        'value': item.industry_data?.temperature
      }))
      setTemperature_data(temperature_data)
      /********************************************************* set energy consumption data *****************************************/
      const energy_data = formatted_data.map(item => ({
        'value': item.industry_data?.energy_consumption
      }))
      const hydrogen_data = energy_data.map(item => ({
        'value': item.value?.hydrogen
      }))
      sethydrogen(hydrogen_data)
      const batteries_data = energy_data.map(item => ({
        'value': item.value?.batteries
      }))
      setbatteries(batteries_data)
      const solar_data = energy_data.map(item => ({
        'value': item.value?.['solar panels']
      }))
      setsolar_panels(solar_data)
      setLoading(false);
    });

    return ()=>usersCollection()
  
  }, [admin])

  const signOut = ()=>{
    auth().signOut()
  }

  // Function to calculate the average value of an array
  const calculateAverage = (array) => {
    if (array.length === 0) return 0; // Handle empty arrays
    return array.reduce((acc, current) => acc + current.value, 0) / array.length;
  };

  // Calculate average values
  const avgBatteries = calculateAverage(batteries);
  const avgHydrogen = calculateAverage(hydrogen);
  const avgSolarPanels = calculateAverage(solar_panels);

  // Calculate total energy
  const totalEnergy = avgBatteries + avgHydrogen + avgSolarPanels;

  // Pie chart data with percentage values
  const pieData = [
    {
      value: ((avgBatteries / totalEnergy) * 100),
      color: '#790059',
      gradientCenterColor: '#CF0D9C',
    }, // Electricity (Batteries)
    {
      value: ((avgHydrogen / totalEnergy) * 100),
      color: '#040069',
      gradientCenterColor: '#4D47E5',
      focused: true,
    }, // Hydrogen
    {
      value: ((avgSolarPanels / totalEnergy) * 100),
      color: '#031B0B',
      gradientCenterColor: '#006357',
    }, // Solar Panels
  ];

  return (
    <View style={{flex:1}} >
      {loading ? (
        <LinearGradient colors={['#31543D', '#006357', '#31543D']} style={{flex:1,alignItems:'center',justifyContent:'center'}}>
          <Text style={{color:'white',fontSize:30,fontWeight:700}}>Loading data...</Text>
        </LinearGradient>
        ) : (
        <LinearGradient colors={['#31543D', '#006357', '#31543D']}  style={{flex:1,padding:20}}>

        <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:10}}>
            <Pressable onPress={signOut} 
            style={{flexDirection:'row',gap:5,alignItems:'center'}}>
            <Image source={require('../assets/arrow_back.png')} />
            <View style={{padding:10,paddingHorizontal:15,backgroundColor:'#4B7058',elevation:10,borderRadius:50}}>
                <Text style={{color:'white',fontWeight:700}}>logout</Text>
            </View>
            </Pressable>

            <TouchableOpacity onPress={()=>navigation.navigate('trading')}
            style={{padding:5,backgroundColor:'#4B7058',elevation:10,borderRadius:50, alignItems:'center',justifyContent:'center'}}>
              <Image style={{width: 35 , height: 35}} source={require('../assets/coin.png')} />
            </TouchableOpacity>
        </View>

        <ScrollView>

        <Text style={{textAlign:'center',fontWeight:700,color:'white',opacity:0.7,fontSize:30}} >{admin.factory_name}</Text>

        <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:20}}>
            <Text style={{color:'white',fontWeight:700,marginBottom:10,textAlign:'center'}}>Temperature (C°)</Text>
            <LineChart
            curved
            width={240}
            spacing={20}
            areaChart
            spacing={30}
            data={Temperature_data}
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
            />
        </View>

        <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:30}}>
            <Text style={{color:'white',fontWeight:700,marginBottom:10,textAlign:'center'}}>Humidity (%)</Text>
            <LineChart
            curved
            width={240}
            spacing={20}
            areaChart
            spacing={30}
            data={Humidity_data}
            startFillColor="#031B0B"
            startOpacity={0.9}
            endFillColor="#006357"
            endOpacity={0.4}
            initialSpacing={12}
            rotateLabel={-45}
            xAxisLabelTextStyle={{
              color: 'black',
              fontSize: 10,
            }}
            />
        </View>
          
        <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:30,marginBottom:20,alignItems:'center',paddingVertical:20}}> 
            <Text style={{color:'white',fontWeight:700,marginBottom:10,textAlign:'center'}}>energy consumption (%)</Text>
            <View style={{marginBottom:20,marginTop:10}} >
                <PieChart
                data={pieData}
                donut
                showGradient
                sectionAutoFocus
                radius={90}
                innerRadius={60}
                innerCircleColor={'#4B7058'}
                centerLabelComponent={() => {
                    return (
                    <View style={{justifyContent: 'center', alignItems: 'center'}}>
                        <Text
                        style={{fontSize: 22, color: 'white', fontWeight: 'bold'}}>
                        {(pieData[0].value).toFixed(1)}%
                        </Text>
                        <Text style={{fontSize: 14, color: 'white'}}>Electricity</Text>
                    </View>
                    );
                }}/>
            </View>

            <View style={{marginBottom: 20, borderTopWidth:2 , borderBottomWidth:2, paddingVertical:10, borderColor:'#031B0B'}}>
              {renderLegendComponent(
                (pieData[0].value).toFixed(1),
                (pieData[1].value).toFixed(1),
                (pieData[2].value).toFixed(1),
              )
                }
            </View>

            <View style={{marginRight:45}} >
              <LineChart
              areaChart
              curved
              showXAxisIndices
              data={batteries}
              data2={hydrogen}
              data3={solar_panels}
              height={200}
              width={250}
              showVerticalLines
              spacing={44}
              initialSpacing={0}
              color1="#790059"
              color2="#031B0B"
              color3="#040069"
              textColor1="green"
              dataPointsColor1="#790059"
              dataPointsColor2="#031B0B"
              dataPointsColor3="#040069"
              startFillColor1="#790059"
              startFillColor2="#031B0B"
              startFillColor3="#040069"
              startOpacity={1}
              endOpacity={0.2}
              />
            </View>

            <View style={{backgroundColor:'#031B0B',borderRadius:10,padding:10,gap:30,alignItems:'center',flexDirection:'row',elevation:10}}>
              <View>
                <Text style={{color:'white'}}>Predicted consumption </Text> 
                <Text style={{color:'white'}}>for the next hour :</Text>
              </View>
              <View style={{backgroundColor:'#4B7058',borderRadius:10}}>
                <Text style={{color:'white',padding:15}}>20 khw</Text>
              </View>
            </View>

        </View>

        </ScrollView>

      </LinearGradient>
      ) }
    
    </View>
  )
}

export default Usine

const styles = StyleSheet.create({
  dropdownButtonStyle: {
    width: '40%',
    height: 40,
    backgroundColor: '#006357',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
},
dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#ffffff',
},
dropdownItemTxtStyle: {
    flex: 1,
    fontSize: 18,
    fontWeight: '500',
    color: '#151E26',
  },
dropdownItemStyle: {
    width: '100%',
    flexDirection: 'row',
    paddingHorizontal: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 8,
},
dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
},
})