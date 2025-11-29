import React from 'react';
import {TouchableOpacity, Text, StyleSheet} from 'react-native';

const Button = ({title, onPress, variant = 'primary', style}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'primary' && styles.primaryButton,
        variant === 'secondary' && styles.secondaryButton,
        style,
      ]}
      onPress={onPress}>
      <Text
        style={[
          styles.buttonText,
          variant === 'secondary' && styles.secondaryText,
        ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginVertical: 8,
  },
  primaryButton: {
    backgroundColor: '#6B46C1',
  },
  secondaryButton: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#6B46C1',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  secondaryText: {
    color: '#6B46C1',
  },
});

export default Button;
