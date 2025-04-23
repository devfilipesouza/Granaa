import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Dados fictícios para o saldo e totais
  const saldoAtual = 1500.00;  // Exemplo de saldo
  const totalDespesas = 500.00; // Exemplo de total de despesas
  const totalReceitas = 2000.00; // Exemplo de total de receitas

  const handleNavigate = (tipo) => {
    setModalVisible(false);
    if (tipo === 'despesa') {
      navigation.navigate('CadastroDespesa');
    } else {
      navigation.navigate('CadastroReceita');
    }
  };

  return (
    <LinearGradient colors={['#007AFF', '#34C759']} style={styles.container}>
      {/* Logotipo adicionado */}
      <View style={styles.logoContainer}>
        <Image 
          source={require('../assets/Logotipo_Granna.png')}  // Certifique-se de que o caminho esteja correto
          style={styles.logo} 
          resizeMode="contain"
        />
      </View>

      {/* Caixa flutuante com Saldo Atual, Receita e Despesa */}
      <View style={styles.cardContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Saldo Atual</Text>
          <Text style={styles.cardValue}>R$ {saldoAtual.toFixed(2)}</Text>

          <View style={styles.subInfo}>
            <Text style={[styles.subInfoText, { color: '#34C759' }]}>
              <Ionicons name="arrow-up" size={16} color="#34C759" /> 
              Receita: R$ {totalReceitas.toFixed(2)}
            </Text>
            <View style={styles.spacing} />
            <Text style={[styles.subInfoText, { color: '#FF3B30' }]}>
              <Ionicons name="arrow-down" size={16} color="#FF3B30" /> 
              Despesa: R$ {totalDespesas.toFixed(2)}
            </Text>
          </View>
        </View>
      </View>

      {/* Botão flutuante para adicionar transações */}
      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={32} color="#fff" />
      </TouchableOpacity>

      {/* Modal para escolha de Despesa ou Receita */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Adicionar</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleNavigate('despesa')}
            >
              <Text style={styles.modalButtonText}>Despesa</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => handleNavigate('receita')}
            >
              <Text style={styles.modalButtonText}>Receita</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={styles.modalCancel}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E8F6F9',
    padding: 20,
    justifyContent: 'flex-start',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 20, // Ajuste do espaçamento do logotipo
  },
  logo: {
    width: 250,
    height: 150,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 20,
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
  cardTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#007AFF',
    marginBottom: 20,
  },
  subInfo: {
    marginTop: 10,
    alignItems: 'flex-start',
  },
  subInfoText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacing: {
    marginBottom: 10,
  },
  fab: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    backgroundColor: '#007AFF',
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 25,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007AFF',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    alignItems: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalCancel: {
    textAlign: 'center',
    marginTop: 10,
    color: '#007AFF',
    fontWeight: 'bold',
  },
});

export default HomeScreen;
