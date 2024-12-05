import { View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from './screens/Home';
import Industrielle from './screens/Industrielle';
import Usine from './screens/Usine';
import Login from './screens/Login';
import store from './redux/store';
import { Provider, useDispatch } from 'react-redux';
import auth from '@react-native-firebase/auth';
import { NavigationContainer } from '@react-navigation/native';
import { set_factoryAdmin } from './redux/zoneSlice';
import Trading from './screens/Trading';

const Stack = createNativeStackNavigator();

function StackLogin() {

    const dispatch = useDispatch()

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    setUser(user);
    dispatch(set_factoryAdmin(
        {
            displayName: user?.displayName,
            email: user?.email
        }
    ))
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; 
  }, []);

  if (initializing) return null; // or return a loading spinner

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {user ? (
        <>
        <Stack.Screen name="usine" component={Usine} />
        <Stack.Screen name="trading" component={Trading} />
        </>
      ) : (
        <Stack.Screen name="login" component={Login} />
      )}
    </Stack.Navigator>
  );
}

export default function Routes() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="zone_industielle">
          <Stack.Screen name="Home" component={Home} />
          <Stack.Screen name="zone_industielle" component={Industrielle} />
          <Stack.Screen name="stack_login" component={StackLogin} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
