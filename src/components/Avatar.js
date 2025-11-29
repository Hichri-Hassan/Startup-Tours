import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';

const Avatar = ({source, name, size = 50, emoji = '👤'}) => {
  return (
    <View style={[styles.container, {width: size, height: size}]}>
      {source ? (
        <Image source={source} style={styles.image} />
      ) : (
        <Text style={[styles.emoji, {fontSize: size * 0.5}]}>{emoji}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 50,
    backgroundColor: '#6B46C1',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  emoji: {
    color: '#fff',
  },
});

export default Avatar;
