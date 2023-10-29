import { View, Text, StyleSheet, Image } from 'react-native';
import React from 'react';
import { StatusBar } from 'expo-status-bar';



import Header from '../components/Header/Header';
import Calculator from '../components/calculator-humedity/calculator-humedity'

const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar style="light" backgroundColor="#000" />

            <View style={styles.headerContainer}>
            <Image source={require('./../../assets/TabaCalc.png')} style={styles.image} />
                <Header />
            
            </View>
            <Calculator />
            

        </View>
    );
    }

const styles = StyleSheet.create({

    image: {
        marginTop: 2,
        width: 150,
        height: 150,
        },

    container: {
        flex: 1,
        backgroundColor: '#A0A672',
    },
    headerContainer: {
        backgroundColor: '#808C26', 
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '31%',
    }
});



export default HomeScreen;