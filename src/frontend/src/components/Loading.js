import React from 'react';
import { ActivityIndicator, View, StyleSheet } from 'react-native';

const Loading = ({ color = '#6B46C1', size = 'large' }) => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size={size} color={color} />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default Loading;
