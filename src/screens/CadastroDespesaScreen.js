import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const CadastroDespesaScreen = ({ navigation }) => {
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [categoria, setCategoria] = useState('Alimentação');
  const [showDatePicker, setShowDatePicker] = useState(false);

  const categorias = [
    'Alimentação', 'Transporte', 'Conta Fixa', 'Assinatura', 'Lazer',
    'Compras', 'Educação', 'Saúde', 'Serviços', 'Outros'
  ];

  const handleSalvar = () => {
    if (!descricao || !valor) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const despesa = {
      tipo: 'despesa',
      descricao,
      valor: parseFloat(valor),
      data,
      categoria
    };

    console.log('Despesa salva:', despesa);
    Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!');
    // Aqui você pode salvar no AsyncStorage ou enviar para API
  };

  return (
    <LinearGradient colors={['#34C759', '#007AFF']} style={styles.container}>
      <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.backButton}>
        <Ionicons name="arrow-back" size={24} color="#fff" />
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.title}>Cadastrar Despesa</Text>

        <TextInput
          style={styles.input}
          placeholder="Descrição"
          value={descricao}
          onChangeText={setDescricao}
        />

        <TextInput
          style={styles.input}
          placeholder="Valor (R$)"
          keyboardType="numeric"
          value={valor}
          onChangeText={setValor}
        />

        <View style={styles.dropdown}>
          <Picker
            selectedValue={categoria}
            onValueChange={(itemValue) => setCategoria(itemValue)}
          >
            {categorias.map((cat) => (
              <Picker.Item key={cat} label={cat} value={cat} />
            ))}
          </Picker>
        </View>

        <TouchableOpacity onPress={() => setShowDatePicker(true)}>
          <Text style={styles.dateText}>Data: {data.toLocaleDateString()}</Text>
        </TouchableOpacity>

        {showDatePicker && (
          <DateTimePicker
            value={data}
            mode="date"
            display={Platform.OS === 'ios' ? 'spinner' : 'default'}
            onChange={(event, selectedDate) => {
              const currentDate = selectedDate || data;
              setShowDatePicker(false);
              setData(currentDate);
            }}
          />
        )}

        <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
          <Text style={styles.saveButtonText}>Salvar</Text>
        </TouchableOpacity>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  backButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    zIndex: 10,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
    marginTop: 80,
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    color: '#000',
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 15,
  },
  dateText: {
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#FF3B30',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CadastroDespesaScreen;
