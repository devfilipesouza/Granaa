import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Modal, Image, ScrollView, Dimensions, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { PieChart } from 'react-native-chart-kit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect } from '@react-navigation/native';

// Importando constantes e componentes
import Colors from '../constants/Colors';
import Spacing from '../constants/Spacing';
import Typography from '../constants/Typography';
import CustomCard from '../components/CustomCard';

const HomeScreen = ({ navigation }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [lancamentos, setLancamentos] = useState([]); // Already starts with an empty array

  // --- Data Loading and Saving ---
  useFocusEffect(
    useCallback(() => {
      const loadLancamentos = async () => {
        try {
          const jsonValue = await AsyncStorage.getItem('@lancamentos');
          if (jsonValue != null) {
            setLancamentos(JSON.parse(jsonValue));
          } else {
            // No initial data is set here.
            // If AsyncStorage is empty, 'lancamentos' will remain an empty array.
            setLancamentos([]); // Explicitly set to empty if nothing in storage
          }
        } catch (e) {
          console.error('Erro ao carregar lançamentos', e);
        }
      };
      loadLancamentos();
    }, [])
  );

  // Save lançamentos to AsyncStorage whenever 'lancamentos' state changes
  useEffect(() => {
    const saveLancamentos = async () => {
      try {
        // Always save the current state, even if empty, to reflect no data
        await AsyncStorage.setItem('@lancamentos', JSON.stringify(lancamentos));
      } catch (e) {
        console.error('Erro ao salvar lançamentos', e);
      }
    };
    // Save whenever 'lancamentos' changes, regardless of length
    saveLancamentos();
  }, [lancamentos]);

  // --- Calculations ---
  const totalDespesas = lancamentos
    .filter(l => l.tipo === 'despesa')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const totalReceitas = lancamentos
    .filter(l => l.tipo === 'receita')
    .reduce((acc, cur) => acc + cur.valor, 0);

  const saldoAtual = totalReceitas - totalDespesas;

  const despesasPorCategoria = {};
  lancamentos.forEach(l => {
    if (l.tipo === 'despesa') {
      despesasPorCategoria[l.categoria] = (despesasPorCategoria[l.categoria] || 0) + l.valor;
    }
  });

  const coresGrafico = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF', '#FF9F40', '#CDDC39', '#8BC34A', '#00BCD4', '#03A9F4'];

  const dataGrafico = Object.keys(despesasPorCategoria).map((categoria, index) => ({
    name: categoria,
    amount: despesasPorCategoria[categoria],
    color: coresGrafico[index % coresGrafico.length],
    legendFontColor: Colors.black,
    legendFontSize: Typography.body.fontSize,
  }));

  // Ensure PieChart has at least one data point to avoid crashes
  const pieChartData = dataGrafico.length > 0 ? dataGrafico : [{ name: 'Sem Despesas', amount: 1, color: Colors.mediumGray, legendFontColor: Colors.black, legendFontSize: Typography.body.fontSize }];

  // --- Navigation and Data Passing ---
  const handleNavigate = (tipo) => {
    setModalVisible(false);
    navigation.navigate(tipo === 'despesa' ? 'CadastroDespesa' : 'CadastroReceita');
  };

  // --- Logout ---
  const handleLogout = () => {
    Alert.alert('Sair', 'Deseja realmente sair?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Sair',
        style: 'destructive',
        onPress: async () => {
          await AsyncStorage.removeItem('userToken');
          // Optionally, clear all financial data on logout if it's tied to the user session
          // await AsyncStorage.removeItem('@lancamentos');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Login' }],
          });
        },
      },
    ]);
  };

  return (
    <LinearGradient colors={[Colors.primaryBlue, Colors.successGreen]} style={styles.container}>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color={Colors.white} />
      </TouchableOpacity>

      <ScrollView contentContainerStyle={{ paddingBottom: Spacing.huge * 2 }}>
        <View style={styles.logoContainer}>
          <Image
            source={require('../assets/Logotipo_Granna.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        </View>

        <View style={styles.cardWrapper}>
          <CustomCard>
            <Text style={Typography.h2}>Saldo Atual</Text>
            <Text style={[Typography.h1, { color: Colors.primaryBlue, marginBottom: Spacing.medium }]}>
              R$ {saldoAtual.toFixed(2)}
            </Text>

            <View style={styles.subInfo}>
              <Text style={[Typography.subInfo, { color: Colors.successGreen }]}>
                <Ionicons name="arrow-up" size={Typography.subInfo.fontSize} color={Colors.successGreen} /> Receita: R$ {totalReceitas.toFixed(2)}
              </Text>
              <View style={{ marginBottom: Spacing.small }} />
              <Text style={[Typography.subInfo, { color: Colors.dangerRed }]}>
                <Ionicons name="arrow-down" size={Typography.subInfo.fontSize} color={Colors.dangerRed} /> Despesa: R$ {totalDespesas.toFixed(2)}
              </Text>
            </View>
          </CustomCard>
        </View>

        <Text style={Typography.graficoTitulo}>Relatório de Despesas</Text>
        {pieChartData.length > 0 && (
          <PieChart
            data={pieChartData}
            width={Dimensions.get('window').width - (Spacing.screenPadding * 2)}
            height={220}
            chartConfig={{
              backgroundColor: Colors.white,
              backgroundGradientFrom: Colors.white,
              backgroundGradientTo: Colors.white,
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor={'amount'}
            backgroundColor={'transparent'}
            paddingLeft={Spacing.medium}
            absolute
          />
        )}
      </ScrollView>

      <TouchableOpacity style={styles.fab} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={Spacing.extraLarge} color={Colors.white} />
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={Typography.modalTitle}>Adicionar</Text>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('despesa')}>
              <Ionicons name="remove-circle-outline" size={Spacing.large} color={Colors.white} style={{ marginRight: Spacing.small }} />
              <Text style={Typography.buttonText}>Despesa</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.modalButton} onPress={() => handleNavigate('receita')}>
              <Ionicons name="add-circle-outline" size={Spacing.large} color={Colors.white} style={{ marginRight: Spacing.small }} />
              <Text style={Typography.buttonText}>Receita</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => setModalVisible(false)}>
              <Text style={Typography.modalCancel}>Cancelar</Text>
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
    padding: Spacing.screenPadding,
    justifyContent: 'flex-start',
  },
  logoutButton: {
    position: 'absolute',
    top: Spacing.large,
    right: Spacing.large,
    zIndex: 10,
    backgroundColor: Colors.dangerRed,
    padding: Spacing.small,
    borderRadius: 50,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.extraLarge * 1.5,
    marginBottom: Spacing.huge,
  },
  logo: {
    width: 250,
    height: 150,
  },
  cardWrapper: {
    alignItems: 'center',
    marginBottom: Spacing.large,
  },
  subInfo: {
    marginTop: Spacing.small,
    alignItems: 'flex-start',
  },
  fab: {
    position: 'absolute',
    bottom: Spacing.extraLarge,
    right: Spacing.extraLarge,
    backgroundColor: Colors.primaryBlue,
    width: Spacing.huge * 1.25,
    height: Spacing.huge * 1.25,
    borderRadius: Spacing.huge,
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
    backgroundColor: Colors.white,
    padding: Spacing.large,
    borderTopLeftRadius: Spacing.medium,
    borderTopRightRadius: Spacing.medium,
  },
  modalButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primaryBlue,
    padding: Spacing.small + Spacing.tiny,
    borderRadius: Spacing.small,
    marginBottom: Spacing.small,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default HomeScreen;