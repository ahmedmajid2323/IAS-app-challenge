import { Pressable, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import { useSelector } from 'react-redux'
import Auth_functions from '../firebase_auth/auth_functions'

const Login = () => {

  const [Email, setEmail] = useState()
  const [Password, setPassword] = useState()

  return (
    <LinearGradient colors={['#31543D', '#006357', '#31543D']}  style={{flex:1,padding:20,alignItems:'center',justifyContent:'center'}}>
        <View style={{backgroundColor:'#4B7058',elevation:10,padding:20,borderRadius:10,flexDirection:'column',alignItems:'center',justifyContent:'center',gap:20}}>
          <Text style={{fontWeight:700,fontSize:20,color:'white'}}>Welcome back</Text>
          <Text style={{fontWeight:700,fontSize:20,color:'white'}}t>Login</Text>
          <TextInput onChangeText={(text)=>setEmail(text)}
          style={styles.input} placeholder='email' keyboardType='email' />
          <TextInput onChangeText={(text)=>setPassword(text)}
          style={styles.input} placeholder='password' keyboardType='password' />
          <TouchableOpacity onPress={()=>Auth_functions.signIn(Email , Password)}
          style={styles.input} >
            <Text style={{textAlign:'center',fontWeight:700,color:'#31543D',fontSize:17}}>Sign in</Text>
          </TouchableOpacity>
        </View>
    </LinearGradient>
  )
}

export default Login

const styles = StyleSheet.create({
  input:{
    backgroundColor:'white',
    padding:10,
    paddingHorizontal:15,
    borderRadius:20,
    width:250
  }
})