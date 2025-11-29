import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

const Card = ({ children, onPress, style }) => {
    if (onPress) {
        return (
            <TouchableOpacity style={[styles.card, style]} onPress={onPress}>
                {children}
            </TouchableOpacity>
        );
    }

    return <View style={[styles.card, style]}>{children}</View>;
};

const styles = StyleSheet.create({
    card: {
        backgroundColor: '#fff',
        borderRadius: 12,
        padding: 16,
        marginVertical: 8,
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
    },
});

export default Card;
