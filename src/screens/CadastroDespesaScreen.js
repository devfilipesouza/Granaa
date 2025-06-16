import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Platform,
  Alert,
  SafeAreaView,
  Modal,
  FlatList,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import CustomCard from '../components/CustomCard';

const CadastroDespesaScreen = ({ navigation }) => {
  const [valor, setValor] = useState('');
  const [data, setData] = useState(new Date());
  const [categoria, setCategoria] = useState('Alimentação');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const categorias = [
    'Alimentação', 'Transporte', 'Conta Fixa', 'Assinatura', 'Lazer',
    'Compras', 'Educação', 'Saúde', 'Serviços', 'Outros'
  ];

  const handleSalvar = async () => {
    if (!valor || isNaN(parseFloat(valor))) { 
      Alert.alert('Erro', 'Informe um valor numérico válido!');
      return;
    }

    const novoLancamento = {
      id: Date.now(),
      tipo: 'despesa',
      valor: parseFloat(valor),
      data: data.toISOString(), 
      categoria,
    };

    try {

      const existingLancamentosJson = await AsyncStorage.getItem('@lancamentos');
      let existingLancamentos = existingLancamentosJson != null ? JSON.parse(existingLancamentosJson) : [];


      existingLancamentos.push(novoLancamento);


      await AsyncStorage.setItem('@lancamentos', JSON.stringify(existingLancamentos));

      Alert.alert('Sucesso', 'Despesa cadastrada com sucesso!');
      navigation.goBack(); 
    } catch (e) {
      console.error('Erro ao salvar despesa:', e);
      Alert.alert('Erro', 'Ocorreu um erro ao salvar a despesa.');
    }
  };

  return (
    <LinearGradient colors={[Colors.primaryBlue, Colors.successGreen]} style={styles.container}>
      <SafeAreaView style={{ flex: 1 }}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={Spacing.extraLarge} color={Colors.white} />
          </TouchableOpacity>
          <Text style={Typography.headerTitle}>Nova Despesa</Text>
          <TouchableOpacity onPress={() => navigation.navigate('CadastroReceita')}>
            <Text style={Typography.headerLink}>Receita</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.cardWrapper}>
          <CustomCard style={styles.customCardOverride}>
            <TextInput
              style={styles.input}
              placeholder="Valor (R$)"
              placeholderTextColor={Colors.mediumGray}
              keyboardType="numeric"
              value={valor}
              onChangeText={setValor}
            />

            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setModalVisible(true)}
            >
              <Text style={{ color: Typography.inputText.color, fontSize: Typography.inputText.fontSize }}>
                {categoria} ▼
              </Text>
            </TouchableOpacity>

            <Modal
              visible={modalVisible}
              animationType="slide"
              transparent={true}
              onRequestClose={() => setModalVisible(false)}
            >
              <View style={styles.modalOverlay}>
                <View style={styles.modalContent}>
                  <FlatList
                    data={categorias}
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                        style={styles.modalItem}
                        onPress={() => {
                          setCategoria(item);
                          setModalVisible(false);
                        }}
                      >
                        <Text style={Typography.inputText}>{item}</Text>
                      </TouchableOpacity>
                    )}
                  />
                  <TouchableOpacity
                    style={[styles.modalItem, { backgroundColor: Colors.dangerRed, borderBottomWidth: 0 }]}
                    onPress={() => setModalVisible(false)}
                  >
                    <Text style={[Typography.buttonText, { color: Colors.white, textAlign: 'center' }]}>
                      Cancelar
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </Modal>

            <TouchableOpacity onPress={() => setShowDatePicker(true)} style={styles.datePicker}>
              <Ionicons name="calendar-outline" size={Spacing.large} color={Colors.primaryBlue} />
              <Text style={Typography.dateText}> {data.toLocaleDateString()}</Text>
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
              <LinearGradient
                colors={[Colors.dangerRed, Colors.darkRed]}
                style={styles.saveButtonGradient}
              >
                <Text style={Typography.buttonText}>Salvar Despesa</Text>
              </LinearGradient>
            </TouchableOpacity>
          </CustomCard>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
  },
  header: {
    marginTop: Spacing.extraLarge,
    marginBottom: Spacing.medium,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  cardWrapper: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: Spacing.huge,
  },
  customCardOverride: {
    width: '100%',
    padding: Spacing.cardPadding,
    borderRadius: 20,
    alignItems: 'stretch',
  },
  input: {
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    fontSize: Typography.inputText.fontSize,
    paddingVertical: Spacing.inputPaddingVertical,
    marginBottom: Spacing.inputBottomMargin,
    color: Typography.inputText.color,
  },
  dropdown: {
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    marginBottom: Spacing.inputBottomMargin,
    paddingVertical: Spacing.inputPaddingVertical,
  },
  datePicker: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: Colors.borderColor,
    paddingVertical: Spacing.inputPaddingVertical,
    marginBottom: Spacing.extraLarge,
  },
  saveButton: {
    borderRadius: Spacing.small + Spacing.tiny,
    overflow: 'hidden',
  },
  saveButtonGradient: {
    paddingVertical: Spacing.buttonPaddingVertical,
    alignItems: 'center',
    borderRadius: Spacing.small + Spacing.tiny,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.3)',
    justifyContent: 'center',
    paddingHorizontal: 40,
  },
  modalContent: {
    backgroundColor: Colors.white,
    borderRadius: 10,
    padding: 20,
    maxHeight: '80%',
  },
  modalItem: {
    paddingVertical: 15,
    borderBottomColor: Colors.borderColor,
    borderBottomWidth: 1,
  },
});

export default CadastroDespesaScreen;
