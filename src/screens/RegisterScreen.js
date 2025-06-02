import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Image,
  Alert,
  ImageBackground,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  SafeAreaView,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#054f77');
    }
  }, []);

  const handleRegister = async () => {
    if (!name || !email || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert('Erro', 'Por favor, insira um e-mail válido.');
      return;
    }

    if (password.length < 6) {
      Alert.alert('Erro', 'A senha deve ter pelo menos 6 caracteres.');
      return;
    }

    try {
      const existingUser = await AsyncStorage.getItem('@user');
      if (existingUser) {
        const parsedUser = JSON.parse(existingUser);
        if (parsedUser.email === email) {
          Alert.alert('Erro', 'Este e-mail já está cadastrado.');
          return;
        }
      }

      const user = { name, email, password };
      await AsyncStorage.setItem('@user', JSON.stringify(user));
      await AsyncStorage.setItem('@isLoggedIn', 'true');

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      navigation.replace('Home');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro', 'Não foi possível salvar o cadastro.');
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            <ImageBackground
              source={require('../assets/background.jpg')}
              style={styles.backgroundImage}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0, 122, 255, 0.8)', 'rgba(52, 199, 89, 0.8)']}
                style={styles.gradient}
              >
                <View style={styles.backButtonContainer}>
                  <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Ionicons name="arrow-back" size={30} color="#fff" />
                  </TouchableOpacity>
                </View>

                <View style={styles.innerContainer}>
                  <Image
                    source={require('../assets/Logotipo_Granna.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />

                  <View style={styles.card}>
                    <Text style={styles.title}>Registre-se</Text>

                    <TextInput
                      style={styles.input}
                      placeholder="Nome Completo"
                      value={name}
                      onChangeText={setName}
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="E-mail"
                      value={email}
                      onChangeText={setEmail}
                      keyboardType="email-address"
                      autoCapitalize="none"
                    />
                    <TextInput
                      style={styles.input}
                      placeholder="Senha"
                      value={password}
                      onChangeText={setPassword}
                      secureTextEntry
                    />

                    <TouchableOpacity style={styles.button} onPress={handleRegister}>
                      <Text style={styles.buttonText}>Registrar</Text>
                    </TouchableOpacity>

                    <View style={styles.loginLinkContainer}>
                      <Text style={styles.loginPrompt}>Já tem uma conta?</Text>
                      <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={styles.loginLink}>Faça login</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </LinearGradient>
            </ImageBackground>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  backButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 100,
    paddingBottom: 40,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  logo: {
    width: 180,
    height: 60,
    marginBottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 10,
    color: '#000',
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  loginLinkContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginPrompt: {
    color: '#333',
    fontSize: 14,
  },
  loginLink: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default RegisterScreen;
