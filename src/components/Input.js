import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

const Input = ({
    placeholder,
    value,
    onChangeText,
    secureTextEntry,
    keyboardType,
    style,
    ...props
}) => {
    return (
        <TextInput
            style={[styles.input, style]}
            placeholder={placeholder}
            value={value}
            onChangeText={onChangeText}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            placeholderTextColor="#A0AEC0"
            {...props}
        />
    );
};

const styles = StyleSheet.create({
    input: {
        borderWidth: 1,
        borderColor: '#E2E8F0',
        borderRadius: 12,
        padding: 16,
        fontSize: 16,
        backgroundColor: '#fff',
        marginVertical: 8,
    },
});

export default Input;
