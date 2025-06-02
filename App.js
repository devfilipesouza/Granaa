import 'react-native-gesture-handler'; // importante importar antes do React
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';
import HomeScreen from './src/screens/HomeScreen';
import CadastroDespesaScreen from './src/screens/CadastroDespesaScreen';
import CadastroReceitaScreen from './src/screens/CadastroReceitaScreen';

// Criando o stack navigator
const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen
          name="CadastroDespesa"
          component={CadastroDespesaScreen}
        />
        <Stack.Screen
          name="CadastroReceita"
          component={CadastroReceitaScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
