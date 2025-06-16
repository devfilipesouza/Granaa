import React from 'react';
import { View, StyleSheet } from 'react-native';
import Spacing from '../constants/Spacing';
import Colors from '../constants/Colors';

const CustomCard = ({ children, style }) => {
  return (
    <View style={[styles.card, style]}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.cardBackground,
    padding: Spacing.large,
    borderRadius: 15,
    width: '80%', 
    alignItems: 'center',
    shadowColor: Colors.shadowColor,
    shadowOffset: { width: 0, height: Spacing.tiny },
    shadowOpacity: 0.2,
    shadowRadius: Spacing.tiny,
    elevation: 5,
  },
});

export default CustomCard;
