import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    input: { 
        height: 40, 
        borderWidth: 1, 
        padding: 10, 
        borderRadius: 5
    },
    text: {
        fontSize: 18
    },
    inputView: {
        marginBottom: 15
    }
});

const Input = ({label, value, onChangeText, placeholder, secureTextEntry}) => {
    return (
        <View style={styles.inputView}>
            <Text style={styles.text}>{label}</Text>
            <TextInput 
                secureTextEntry={secureTextEntry}
                autoCorrect={false}
                label={label}
                placeholder={placeholder}
                onChangeText={onChangeText}
                value={value}
                style={styles.input}
            />
        </View>
    );
};

export { Input };