import { StyleSheet, Text, View, Pressable , Image , ScrollView, Modal , TouchableWithoutFeedback, TouchableOpacity} from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { LineChart, PieChart } from 'react-native-gifted-charts'
import SelectDropdown from 'react-native-select-dropdown';
import auth from '@react-native-firebase/auth';
import { useSelector } from 'react-redux';

const renderDot = (color) => {
    return (
      <View  
        style={{ height: 10, width: 10,borderRadius: 5,backgroundColor: color, marginRight: 10}}/>
    );
  };
  
  const renderLegendComponent = () => {
    return (
      <>
        <View style={{flexDirection: 'row',justifyContent: 'center',marginBottom: 10,}}>
          <View style={{flexDirection: 'row',alignItems: 'center',width: 120,marginRight: 20,}}>
            {renderDot('#790059')}
            <Text style={{color: 'white'}}>Electricity: 47%</Text>
          </View>
          <View style={{flexDirection: 'row', alignItems: 'center', width: 120}}>
            {renderDot('#031B0B')}
            <Text style={{color: 'white'}}>Hydrogen: 16%</Text>
          </View>
        </View>
        <View>
          <View style={{ flexDirection: 'row',alignItems: 'center',width:260}}>
            {renderDot('#040069')}
            <Text style={{color: 'white'}}>Solar: 43%</Text>
          </View>
        </View>
      </>
    );
  };

const Usine = ({navigation}) => {

  const factory_admin = useSelector(state=>state.factory.factoryAdmin)
  console.log(factory_admin)

  const signOut = ()=>{
    auth().signOut()
  }

  const [ModalFilter, setModalFilter] = useState(false)

    const Air_quality = [
      {value: 15, label:'jan'}, 
      {value: 30, label:'feb'}, 
      {value: 26, label:'mar'}, 
      {value: 40, label:'apr'}, 
      {value: 30, label:'mai'}, 
      {value: 26, label:'jun'}, 
      {value: 40, label:'jul'}, 
      {value: 26, label:'aug'}, 
      {value: 40, label:'sep'}, 
      {value: 30, label:'oct'}, 
      {value: 26, label:'nov'}, 
      {value: 40, label:'dec'}
    ];
    
    const pieData = [
        { value: 47, color: '#790059',gradientCenterColor: '#CF0D9C'}, 
        {value: 43, color: '#040069', gradientCenterColor: '#4D47E5', focused: true}, 
        {value: 16, color: '#031B0B', gradientCenterColor: '#006357'},
    ];

    /*****************************************************************energie consumption*******************************************************/
    const electrecity = [{value: 0},{value: 10},{value: 8},{value: 58},{value: 56},{value: 78},{value: 74},{value: 98}];
    const hydrogen = [{value: 0},{value: 20},{value: 18},{value: 40},{value: 36},{value: 60},{value: 54},{value: 85}];
    const solar = [{value: 0},{value: 30},{value: 28},{value: 50},{value: 40},{value: 80},{value: 60},{value: 110}];

    const years = ['2020','2021','2022','2023','2024']
    const months = ["January", "February", "March",  "April", "May", "June",  "July",  "August",  "September",  "October", "November",  "December"];

  return (
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

      <View style={{backgroundColor:'#4B7058',elevation:10,padding:10,borderRadius:10,marginTop:30}}>
          <Text style={{color:'white',fontWeight:700,marginBottom:10,textAlign:'center'}}>Temperature (C°)</Text>
          <LineChart
          curved
          width={240}
          spacing={20}
          areaChart
          spacing={30}
          data={Air_quality}
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
          data={Air_quality}
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
                      47%
                      </Text>
                      <Text style={{fontSize: 14, color: 'white'}}>Electricity</Text>
                  </View>
                  );
              }}/>
          </View>

          <View style={{marginBottom: 20, borderTopWidth:2 , borderBottomWidth:2, paddingVertical:10, borderColor:'#031B0B'}}>
            {renderLegendComponent()}
          </View>

          <View style={{marginRight:45}} >
            <LineChart
            areaChart
            curved
            showXAxisIndices
            data={electrecity}
            data2={hydrogen}
            data3={solar}
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

      <Modal transparent visible={ModalFilter} >
        <TouchableWithoutFeedback onPress={()=>setModalFilter(false)} >
        <View style={{flex:1,justifyContent:'center',alignItems:'center',backgroundColor:'rgba(0,0,0,0.5)'}}>
          <View style={{backgroundColor:'white',elevation:10,padding:10,borderRadius:10,alignItems:'center'}}>

            <Text style={{marginBottom:10}}>Filter data</Text>
            <View style={{flexDirection:'row',gap:30}}>
              <SelectDropdown
              data={years}
              onSelect={(year, index) => {
                  console.log(year)
              }}
              renderButton={(selectedItem, isOpened) => {
                  return (
                  <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'year'}
                      </Text>
                      <Image source={require('../assets/arrow_back.png')} style={{height:20 , width:20,transform :[{rotate:'270deg'}]}}/>
                  </View>
                  );
              }}
              renderItem={(item, index, isSelected) => {
                  return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                      <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                  );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
              />
              <SelectDropdown
              data={months}
              onSelect={(month, index) => {
                  console.log(month)
              }}
              renderButton={(selectedItem, isOpened) => {
                  return (
                  <View style={styles.dropdownButtonStyle}>
                      <Text style={styles.dropdownButtonTxtStyle}>
                      {(selectedItem && selectedItem.title) || 'month'}
                      </Text>
                      <Image source={require('../assets/arrow_back.png')} style={{height:20 , width:20,transform :[{rotate:'270deg'}]}}/>
                  </View>
                  );
              }}
              renderItem={(item, index, isSelected) => {
                  return (
                  <View style={{...styles.dropdownItemStyle, ...(isSelected && {backgroundColor: '#D2D9DF'})}}>
                      <Text style={styles.dropdownItemTxtStyle}>{item}</Text>
                  </View>
                  );
              }}
              showsVerticalScrollIndicator={false}
              dropdownStyle={styles.dropdownMenuStyle}
              />
            </View>

          </View>
        </View>
        </TouchableWithoutFeedback>
      </Modal>

    </LinearGradient>
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