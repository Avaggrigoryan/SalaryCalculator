import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import SalaryCalculator from './src/components/SalaryCalculator';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <SalaryCalculator />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f9fafb',
  },
});
