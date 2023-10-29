import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Header = () => {
    return (
        <View style={styles.headerContainer}>
        </View>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        paddingVertical: 1,
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%'
    },
    headerText: {
        fontSize: 22,
        color: 'white',
        fontWeight: 'bold',
    },
});


export default Header;
