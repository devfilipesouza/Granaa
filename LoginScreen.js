import React, { useState, useEffect } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Platform, Image, StatusBar, Keyboard, TouchableWithoutFeedback, Alert, ImageBackground 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import * as Google from 'expo-auth-session/providers/google';
import * as AppleAuthentication from 'expo-apple-authentication';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [request, response, promptAsync] = Google.useAuthRequest({
    clientId: 'SEU_CLIENT_ID_AQUI', // Client ID do Google
  });

  const handleGoogleLogin = () => {
    promptAsync();
  };

  const handleLogin = () => {
    if (!email || !senha) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    } else {
      // Realize o login aqui
      console.log('Login realizado');
    }
  };

  useEffect(() => {
    StatusBar.setBarStyle('dark-content'); 
    StatusBar.setBackgroundColor('#054f77');
  }, []);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ImageBackground 
        source={require('../assets/background.jpg')} 
        style={styles.container}
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

            <View style={styles.socialButtonsContainer}>
              <TouchableOpacity style={styles.socialButton} onPress={handleGoogleLogin}>
                <Image source={require('../assets/google.png')} style={styles.socialIcon} />
              </TouchableOpacity>

              {Platform.OS === 'ios' && (
                <TouchableOpacity style={styles.socialButton}>
                  <Image source={require('../assets/apple.png')} style={styles.socialIcon} />
                </TouchableOpacity>
              )}
            </View>

            <Text style={styles.registerText}>
              Não tem uma conta? <Text style={styles.registerLink} onPress={() => navigation.navigate('Register')}>Registre-se</Text>
            </Text>
          </MotiView>
        </LinearGradient>
      </ImageBackground>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 0,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 250,
    height: 150,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 15,
    width: '80%',
    alignItems: 'center',
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
  socialButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 10,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  socialIcon: {
    width: 30,
    height: 30,
  },
  registerText: {
    marginTop: 10,
    color: '#666',
  },
  registerLink: {
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default LoginScreen;
