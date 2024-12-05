import { StyleSheet, Text, View, Image, Pressable, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import firestore from '@react-native-firebase/firestore';
import { BarChart } from 'react-native-gifted-charts';
import { useSelector } from 'react-redux';

const Trading = () => {

  const userCredentiels = useSelector(state=>state.factory.factoryAdmin)
  
  const HbarEvaluation = [
    {value: 15, label: 'Jan'},
    {value: 40, label: 'Feb'},
    {value: 10, label: 'Mar'},
    {value: 30, label: 'Apr'},
    ];

  const options = [
    {name: 'send', image_path: require('../assets/send.png')},
    {name: 'receive', image_path: require('../assets/receive.png')},
    {name: 'purchase', image_path: require('../assets/purchase.png')},
    {name: 'convert', image_path: require('../assets/convert.png')},
  ]

  return (
    <LinearGradient colors={['#31543D', '#006357', '#31543D']}  style={{flex:1,padding:20}}>

      <View style={{flexDirection:'row',gap:20,alignItems:'center'}}>
        <Image style={{width:40 , height:40}} source={require('../assets/user.png')} />
        <View style={{flexDirection:'column'}}>
          <Text style={{color:'white',fontSize:20,fontWeight:700}} >{userCredentiels.displayName}</Text>
          <Text style={{color:'white',fontSize:20,fontWeight:700}} >Welcome Back</Text>
        </View>
      </View>
        

      <View style={{justifyContent:'center',alignItems:'center',marginVertical:40}} >
        <Text style={{color:'#ffffff',fontSize:20,opacity:0.5}}>Available balance</Text>
        <Text style={{color:'#ffffff',fontSize:40}}>$ 888,888</Text>
      </View>

      <View style={{flexDirection:'row',justifyContent:'space-between',marginBottom:30}}>
        {
          options.map((option , i)=>(
            <TouchableOpacity key={i}
            style={{alignItems:'center',flexDirection:'column',gap:5}}>
              <View style={{padding:15,borderRadius:40,elevation:10,backgroundColor:'black'}} >
                <Image style={{width:25 , height:25}} source={option.image_path} />
              </View>
              <Text style={{color:'white',fontWeight:500}} >{option.name}</Text>
            </TouchableOpacity>
          ))
        }
      </View>

      <View style={{backgroundColor:'#31543D',padding:10,borderRadius:20,elevation:10,alignItems:'center'}}>
        <View style={{flexDirection:'row',gap:20,alignItems:'center',justifyContent:'center'}} >
          <Image style={{width: 50 , height:50}} source={require('../assets/Hbar.png')} />
          <Text style={{color:'white',fontWeight:700,fontSize:25}}>8,600</Text>
        </View>
        <View style={{marginRight:25,marginTop:10}}>
          <BarChart
          data={HbarEvaluation}
          barWidth={35}
          cappedBars
          capColor={'rgba(78, 0, 142)'}
          capThickness={4}
          showGradient
          gradientColor={'rgba(255, 255, 255, 0.8)'}
          frontColor={'rgba(255, 255, 255, 0.2)'}
          />
        </View>
        <View style={{backgroundColor:'#031B0B',borderRadius:10,padding:10,gap:30,alignItems:'center',flexDirection:'row',elevation:10,marginTop:10}}>
          <View>
            <Text style={{color:'white',fontSize:15}}>Current extra electrecity </Text> 
            <Text style={{color:'white',marginTop:5,marginLeft:10,fontWeight:700,fontSize:15}}>TRADE HERE</Text>
          </View>
          <View style={{backgroundColor:'#4B7058',borderRadius:10}}>
            <Text style={{color:'white',padding:15}}>20 khw</Text>
          </View>
        </View>
      </View>
      

    </LinearGradient>
  )
}

export default Trading

const styles = StyleSheet.create({})