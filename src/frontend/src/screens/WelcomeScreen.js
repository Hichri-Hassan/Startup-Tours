import React, { useEffect, useRef } from 'react';
import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Animated,
    Dimensions,
} from 'react-native';

const { width } = Dimensions.get('window');

const ScanScreen = ({ onScanComplete }) => {
    const pulse1 = useRef(new Animated.Value(0.5)).current;
    const pulse2 = useRef(new Animated.Value(0.5)).current;
    const pulse3 = useRef(new Animated.Value(0.5)).current;
    const pulse4 = useRef(new Animated.Value(0.5)).current;

    useEffect(() => {
        // Animation des coins qui pulsent
        const animateCorner = (anim, delay) => {
            Animated.loop(
                Animated.sequence([
                    Animated.timing(anim, {
                        toValue: 1,
                        duration: 2000,
                        delay,
                        useNativeDriver: true,
                    }),
                    Animated.timing(anim, {
                        toValue: 0.5,
                        duration: 0,
                        useNativeDriver: true,
                    }),
                ]),
            ).start();
        };

        animateCorner(pulse1, 0);
        animateCorner(pulse2, 500);
        animateCorner(pulse3, 1000);
        animateCorner(pulse4, 1500);
    }, []);

    return (
        <View style={styles.container}>
            {/* Logo / Title */}
            <View style={styles.header}>
                <Text style={styles.title}>Point ou Culture G</Text>
                <Text style={styles.subtitle}>
                    Scanne le QR du bar pour rejoindre la soirée.
                </Text>
            </View>

            {/* Scan Frame */}
            <View style={styles.scanContainer}>
                {/* Background card */}
                <View style={styles.scanBackground} />

                {/* Animated corners */}
                <View style={styles.scanFrame}>
                    <Animated.View
                        style={[styles.corner, styles.topLeft, { opacity: pulse1 }]}
                    />
                    <Animated.View
                        style={[styles.corner, styles.topRight, { opacity: pulse2 }]}
                    />
                    <Animated.View
                        style={[styles.corner, styles.bottomLeft, { opacity: pulse3 }]}
                    />
                    <Animated.View
                        style={[styles.corner, styles.bottomRight, { opacity: pulse4 }]}
                    />

                    {/* Center QR Icon */}
                    <View style={styles.qrIconContainer}>
                        <Text style={styles.qrIcon}>⊞</Text>
                    </View>
                </View>
            </View>

            {/* Primary CTA */}
            <TouchableOpacity
                style={styles.primaryButton}
                onPress={onScanComplete}
                activeOpacity={0.8}>
                <Text style={styles.primaryButtonText}>Simuler le scan</Text>
            </TouchableOpacity>

            {/* Secondary CTA */}
            <TouchableOpacity
                style={styles.secondaryButton}
                onPress={onScanComplete}
                activeOpacity={0.6}>
                <Text style={styles.secondaryIcon}>🔑</Text>
                <Text style={styles.secondaryButtonText}>
                    Entrer le code manuellement
                </Text>
            </TouchableOpacity>
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
    header: {
        alignItems: 'center',
        marginBottom: 48,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#c12ec4',
        marginBottom: 12,
    },
    subtitle: {
        fontSize: 16,
        color: '#6B7280',
        textAlign: 'center',
    },
    scanContainer: {
        width: 256,
        height: 256,
        marginBottom: 48,
        position: 'relative',
    },
    scanBackground: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#f2eded',
        borderRadius: 24,
    },
    scanFrame: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
    corner: {
        position: 'absolute',
        width: 48,
        height: 48,
        borderColor: '#e1a3ff',
        borderWidth: 4,
    },
    topLeft: {
        top: 32,
        left: 32,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        borderTopLeftRadius: 16,
    },
    topRight: {
        top: 32,
        right: 32,
        borderLeftWidth: 0,
        borderBottomWidth: 0,
        borderTopRightRadius: 16,
    },
    bottomLeft: {
        bottom: 32,
        left: 32,
        borderRightWidth: 0,
        borderTopWidth: 0,
        borderBottomLeftRadius: 16,
    },
    bottomRight: {
        bottom: 32,
        right: 32,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        borderBottomRightRadius: 16,
    },
    qrIconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    qrIcon: {
        fontSize: 64,
        color: '#c12ec4',
        opacity: 0.3,
    },
    primaryButton: {
        width: width - 96,
        maxWidth: 320,
        backgroundColor: '#e1a3ff',
        paddingVertical: 16,
        borderRadius: 25,
        marginBottom: 16,
        alignItems: 'center',
    },
    primaryButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
    secondaryButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    secondaryIcon: {
        fontSize: 18,
    },
    secondaryButtonText: {
        color: '#6B7280',
        fontSize: 14,
    },
});

export default ScanScreen;
