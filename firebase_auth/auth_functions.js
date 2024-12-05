import auth from '@react-native-firebase/auth';
import { Alert } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { set_factoryAdmin } from '../redux/zoneSlice';

const signIn = async (email, password ) => {

  try {
    if(!email || !password){
      Alert.alert('Warning','all fields are required !')
    }else{
      const userCredential = await auth().signInWithEmailAndPassword(email.trim() , password);
    }
  } catch (error) {
    if(error.code === 'auth/invalid-credential' || error.code === 'auth/invalid-email'){
      Alert.alert('wrong credentials',`${error}`)
    }
  }
};

const Auth_functions = {
    signIn 
}

export default Auth_functions