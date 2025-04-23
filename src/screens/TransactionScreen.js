import React, { useState } from 'react';
import { 
  View, Text, TextInput, TouchableOpacity, StyleSheet, 
  Keyboard, TouchableWithoutFeedback, Alert, Platform 
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { MotiView } from 'moti';
import DateTimePicker from '@react-native-community/datetimepicker';

const TransactionScreen = ({ navigation }) => {
  const [tipo, setTipo] = useState('entrada');
  const [descricao, setDescricao] = useState('');
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const handleSalvar = () => {
    if (!descricao || !valor) {
      Alert.alert('Erro', 'Preencha todos os campos!');
      return;
    }

    const transacao = {
      tipo,
      descricao,
      valor: parseFloat(valor),
      data,
    };

    console.log('Transação salva:', transacao);
    Alert.alert('Sucesso', 'Transação salva com sucesso!');
    // Aqui você pode salvar no AsyncStorage ou enviar para API
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <LinearGradient
        colors={['#007AFF', '#34C759']}
        style={styles.container}
      >
        <MotiView 
          style={styles.card}
          from={{ opacity: 0, translateY: 60 }}
          animate={{ opacity: 1, translateY: 0 }}
          transition={{ type: 'spring', duration: 500 }}
        >
          <Text style={styles.title}>Nova Transação</Text>

          <View style={styles.buttonGroup}>
            <TouchableOpacity
              style={[styles.typeButton, tipo === 'entrada' && styles.typeButtonSelected]}
              onPress={() => setTipo('entrada')}
            >
              <Text style={styles.typeText}>Entrada</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.typeButton, tipo === 'despesa' && styles.typeButtonSelected]}
              onPress={() => setTipo('despesa')}
            >
              <Text style={styles.typeText}>Despesa</Text>
            </TouchableOpacity>
          </View>

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
                setShowDatePicker(Platform.OS === 'ios');
                setData(currentDate);
              }}
            />
          )}

          <TouchableOpacity style={styles.saveButton} onPress={handleSalvar}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </MotiView>
      </LinearGradient>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 15,
    padding: 20,
    elevation: 5,
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
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  typeButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: '#007AFF',
    borderRadius: 8,
  },
  typeButtonSelected: {
    backgroundColor: '#007AFF',
  },
  typeText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  dateText: {
    textAlign: 'center',
    color: '#007AFF',
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#34C759',
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

export default TransactionScreen;
