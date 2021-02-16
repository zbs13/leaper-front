import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import Header from '../components/Header';

export default function HomeScreen({ navigation }) {
    return (
        <View style={styles.container}>
            <Header />
            <Button title="GOOOOO" onPress={() => navigation.navigate("Home")} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});
