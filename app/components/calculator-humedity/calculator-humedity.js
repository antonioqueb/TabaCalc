import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import * as Location from 'expo-location';
import { getWeatherData } from './../../api/api';
import { Picker } from '@react-native-picker/picker';

const CalculatorHumedity = () => {
  const [tipoHoja, setTipoHoja] = useState('Tabaco Virginia'); 
  const [humedad, setHumedad] = useState('');
  const [pesoInicial, setPesoInicial] = useState('');
  const [pesoFinal, setPesoFinal] = useState('');
  const [incrementoPeso, setIncrementoPeso] = useState('');
  const [mostrarResultados, setMostrarResultados] = useState(false); // Nuevo estado

  const tasasAbsorcion = {
    "Tabaco Virginia": 0.045,
    "Tabaco Burley": 0.040,
    "Tabaco Oriental": 0.030
  };

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      try {
        const data = await getWeatherData(latitude, longitude);
        setHumedad(data.main.humidity / 100);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    })();
  }, []);

  const calcularPesoFinal = () => {
    const tasa = tasasAbsorcion[tipoHoja] || 0;
    const aumento = tasa * parseFloat(humedad) * parseFloat(pesoInicial);
    setIncrementoPeso(aumento.toFixed(2));
    const resultado = parseFloat(pesoInicial) + aumento;
    setPesoFinal(resultado.toFixed(2));
    setMostrarResultados(true);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Elige el tipo de hoja de tabaco:</Text>

      <Picker
        selectedValue={tipoHoja}
        style={styles.input}
        onValueChange={(itemValue) => setTipoHoja(itemValue)}
      >
        <Picker.Item label="Tabaco Virginia" value="Tabaco Virginia" />
        <Picker.Item label="Tabaco Burley" value="Tabaco Burley" />
        <Picker.Item label="Tabaco Oriental" value="Tabaco Oriental" />
      </Picker>
  
      <Text style={styles.label}>Humedad del aire actual: {(humedad * 100).toFixed(2)}%</Text>
  
      <Text style={styles.label}>Introduce el peso inicial del fardo en kilos:</Text>
      <TextInput
        style={styles.TextInput}
        value={pesoInicial}
        onChangeText={setPesoInicial}
        placeholder="Peso Inicial" 
        placeholderTextColor="#fff"
        keyboardType="numeric"
      />
  
      <Button
        title="Calcular"
        style={styles.button}
        onPress={calcularPesoFinal}
      />

      {mostrarResultados && (
        <>
          <Text style={styles.resultText}>Resultados:</Text>
          <Text style={styles.tableText}>Peso Inicial: {pesoInicial} kg</Text>
          <Text style={styles.tableText}>Incremento por Humedad: {incrementoPeso} kg ({(parseFloat(incrementoPeso)/parseFloat(pesoInicial)*100).toFixed(2)}%)</Text>
          <Text style={styles.tableText}>Peso Final: {pesoFinal} kg</Text>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      padding: 15,
    },
    label: {
      marginVertical: 2,
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
    },
    input: {
      borderWidth: 1,
      borderColor: '#ccc',
      borderRadius: 5,
      paddingHorizontal: 10,
      paddingVertical: 3,
      fontSize: 16,
      marginBottom: 20,
      color: '#fff',
    },
    resultText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#fff',
      marginVertical: 7,
    },
    tableText: {
      fontSize: 16,
      fontWeight: 'bold',
      color: '#fff',
      marginVertical: 5,
    },
    button: {
      paddingVertical: 10,
      paddingHorizontal: 20,
      backgroundColor: '#439FD9',
      borderRadius: 5,
      marginVertical: 10,
      color: '#515915',
    },
    TextInput : {
        color: '#fff',
        padding: 8,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#fff',
        marginBottom: 8,
        fontSize: 16,
        fontWeight: 'bold',
        backgroundColor: '#808C26',
        paddingEnd: 2,
    },
});

export default CalculatorHumedity;
