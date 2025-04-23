import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const EscolherTransacaoScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>O que você deseja cadastrar?</Text>

      <TouchableOpacity 
        style={styles.button}
        onPress={() => navigation.navigate('CadastroDespesa')}
      >
        <Text style={styles.buttonText}>Despesa</Text>
      </TouchableOpacity>

      <TouchableOpacity 
        style={[styles.button, { backgroundColor: '#007AFF' }]}
        onPress={() => navigation.navigate('CadastroReceita')}
      >
        <Text style={styles.buttonText}>Receita</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 20, marginBottom: 30 },
  button: {
    backgroundColor: '#FF3B30',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    width: 200,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 16 },
});

export default EscolherTransacaoScreen;
