import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  StatusBar,
  Keyboard,
  TouchableWithoutFeedback,
  Alert,
  ImageBackground,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    StatusBar.setBarStyle('dark-content');
    if (Platform.OS === 'android') {
      StatusBar.setBackgroundColor('#054f77');
    }

    const checkLoginStatus = async () => {
      try {
        const isLoggedIn = await AsyncStorage.getItem('@isLoggedIn');
        if (isLoggedIn === 'true') {
          navigation.replace('Home');
        }
      } catch (error) {
        console.error('Erro ao verificar login:', error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
      return;
    }

    try {
      const jsonUser = await AsyncStorage.getItem('@user');
      if (!jsonUser) {
        Alert.alert('Erro', 'Nenhum usuário cadastrado encontrado. Por favor, registre-se.');
        return;
      }

      const user = JSON.parse(jsonUser);

      if (email === user.email && senha === user.password) {
        await AsyncStorage.setItem('@isLoggedIn', 'true');
        Alert.alert('Sucesso', `Bem-vindo(a), ${user.name}!`);
        navigation.replace('Home');
      } else {
        Alert.alert('Erro', 'Email ou senha incorretos.');
      }
    } catch (error) {
      console.error('Erro ao ler usuário:', error);
      Alert.alert('Erro', 'Ocorreu um erro ao tentar fazer login.');
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
              style={styles.background}
              resizeMode="cover"
            >
              <LinearGradient
                colors={['rgba(0, 122, 255, 0.8)', 'rgba(52, 199, 89, 0.8)']}
                style={styles.gradient}
              >
                <View style={styles.logoContainer}>
                  <Image
                    source={require('../assets/Logotipo_Granna.png')}
                    style={styles.logo}
                    resizeMode="contain"
                  />
                </View>

                <MotiView
                  style={styles.card}
                  from={{ opacity: 0, translateY: 50 }}
                  animate={{ opacity: 1, translateY: 0 }}
                  transition={{ type: 'spring', duration: 500 }}
                >
                  <Text style={styles.title}>Login</Text>
                  <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                  />
                  <TextInput
                    style={styles.input}
                    placeholder="Senha"
                    secureTextEntry
                    value={senha}
                    onChangeText={setSenha}
                  />

                  <TouchableOpacity style={styles.button} onPress={handleLogin}>
                    <Text style={styles.buttonText}>Entrar</Text>
                  </TouchableOpacity>

                  <View style={styles.registerLinkContainer}>
                    <Text style={styles.registerPrompt}>Não tem uma conta?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Register')}>
                      <Text style={styles.registerLink}> Registre-se</Text>
                    </TouchableOpacity>
                  </View>
                </MotiView>
              </LinearGradient>
            </ImageBackground>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    width: '100%',
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
    padding: 20,
    justifyContent: 'center',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 180,
    height: 60,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
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
  registerLinkContainer: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  registerPrompt: {
    color: '#333',
    fontSize: 14,
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontSize: 14,
    marginLeft: 5,
  },
});

export default LoginScreen;
