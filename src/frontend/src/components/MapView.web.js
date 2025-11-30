// Web MapView fallback using static content
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const MapView = ({ children, style, ...props }) => {
  return (
    <View style={[styles.mapContainer, style]}>
      <Text style={styles.mapText}>Map view available on mobile only</Text>
      {children}
    </View>
  );
};

export const Marker = ({ children }) => null;
export const Circle = () => null;
export const PROVIDER_DEFAULT = null;

const styles = StyleSheet.create({
  mapContainer: {
    backgroundColor: '#f2eded',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapText: {
    color: '#6B7280',
    fontSize: 16,
  },
});

export default MapView;
