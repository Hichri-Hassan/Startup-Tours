import React, {useState, useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated, Dimensions} from 'react-native';

const {width} = Dimensions.get('window');

const WaitingScreen = ({onMatchFound, intention}) => {
  const [count, setCount] = useState(3);
  const scale1 = useRef(new Animated.Value(0.4)).current;
  const scale2 = useRef(new Animated.Value(0.4)).current;
  const scale3 = useRef(new Animated.Value(0.4)).current;
  const opacity1 = useRef(new Animated.Value(0.6)).current;
  const opacity2 = useRef(new Animated.Value(0.6)).current;
  const opacity3 = useRef(new Animated.Value(0.6)).current;
  const centerScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    // Animation des cercles
    const animateCircle = (scaleValue, opacityValue, delay) => {
      Animated.loop(
        Animated.parallel([
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(scaleValue, {
              toValue: 1.2,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
          Animated.sequence([
            Animated.delay(delay),
            Animated.timing(opacityValue, {
              toValue: 0,
              duration: 2000,
              useNativeDriver: true,
            }),
          ]),
        ]),
      ).start();
    };

    animateCircle(scale1, opacity1, 0);
    animateCircle(scale2, opacity2, 600);
    animateCircle(scale3, opacity3, 1200);

    // Animation du centre
    Animated.loop(
      Animated.sequence([
        Animated.timing(centerScale, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(centerScale, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ]),
    ).start();

    // Incrémenter le compteur
    const interval = setInterval(() => {
      setCount(prev => {
        if (prev >= 8) {
          clearInterval(interval);
          setTimeout(() => onMatchFound(), 1000);
          return prev;
        }
        return prev + 1;
      });
    }, 800);

    return () => clearInterval(interval);
  }, [onMatchFound]);

  return (
    <View style={styles.container}>
      {/* Animated Bubbles */}
      <View style={styles.animationContainer}>
        {/* Background */}
        <View style={styles.background} />

        {/* Animated circles */}
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{scale: scale1}],
              opacity: opacity1,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{scale: scale2}],
              opacity: opacity2,
            },
          ]}
        />
        <Animated.View
          style={[
            styles.circle,
            {
              transform: [{scale: scale3}],
              opacity: opacity3,
            },
          ]}
        />

        {/* Center Icon */}
        <Animated.View
          style={[
            styles.centerIcon,
            {
              transform: [{scale: centerScale}],
            },
          ]}>
          <Text style={styles.iconText}>👥</Text>
        </Animated.View>
      </View>

      {/* Text Content */}
      <View style={styles.textContainer}>
        <Text style={styles.title}>
          {count} {count === 1 ? 'personne a' : 'personnes ont'} rejoint la
          soirée…
        </Text>
        <Text style={styles.subtitle}>
          {intention === 'romance'
            ? 'On trouve ton match parfait !'
            : 'On lance dès que vous êtes assez nombreux !'}
        </Text>
      </View>

      {/* Avatars Preview */}
      <View style={styles.avatarsContainer}>
        {[...Array(Math.min(count, 5))].map((_, i) => (
          <View
            key={i}
            style={[
              styles.avatar,
              i > 0 && {marginLeft: -8},
            ]}>
            <Text style={styles.avatarText}>
              {String.fromCharCode(65 + i)}
            </Text>
          </View>
        ))}
        {count > 5 && (
          <View style={[styles.avatar, styles.avatarExtra, {marginLeft: -8}]}>
            <Text style={styles.avatarExtraText}>+{count - 5}</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
    backgroundColor: '#ffffff',
  },
  animationContainer: {
    width: 256,
    height: 256,
    marginBottom: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  background: {
    position: 'absolute',
    width: 256,
    height: 256,
    backgroundColor: '#f2eded',
    borderRadius: 128,
    opacity: 0.2,
  },
  circle: {
    position: 'absolute',
    width: 256,
    height: 256,
    borderRadius: 128,
    borderWidth: 2,
    borderColor: '#e1a3ff',
  },
  centerIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: '#e1a3ff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 48,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#c12ec4',
    marginBottom: 12,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#6B7280',
    textAlign: 'center',
  },
  avatarsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#f2eded',
    borderWidth: 2,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    fontSize: 14,
    color: '#6B7280',
  },
  avatarExtra: {
    backgroundColor: '#e1a3ff',
  },
  avatarExtraText: {
    fontSize: 14,
    color: '#ffffff',
  },
});

export default WaitingScreen;
