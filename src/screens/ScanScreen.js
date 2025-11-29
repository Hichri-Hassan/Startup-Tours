import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Alert,
} from 'react-native';
import {CameraView, useCameraPermissions} from 'expo-camera';

const {width} = Dimensions.get('window');

const ScanScreen = ({onScanComplete, onBack}) => {
  const [permission, requestPermission] = useCameraPermissions();
  const [showCamera, setShowCamera] = useState(false);
  const [scanned, setScanned] = useState(false);
  
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

  const handleScanPress = async () => {
    if (!permission) {
      const {granted} = await requestPermission();
      if (!granted) {
        Alert.alert(
          'Permission requise',
          'Nous avons besoin d\'accéder à votre caméra pour scanner le QR code.',
        );
        return;
      }
    }
    setShowCamera(true);
  };

  const handleBarCodeScanned = ({type, data}) => {
    if (!scanned) {
      setScanned(true);
      setShowCamera(false);
      Alert.alert('QR Code scanné !', `Code: ${data}`, [
        {text: 'OK', onPress: onScanComplete},
      ]);
    }
  };

  if (showCamera) {
    return (
      <View style={styles.cameraContainer}>
        <CameraView
          style={styles.camera}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarCodeScanned}
          barcodeScannerSettings={{
            barcodeTypes: ['qr'],
          }}>
          <View style={styles.cameraOverlay}>
            <View style={styles.cameraHeader}>
              <Text style={styles.cameraTitle}>Scannez le QR Code</Text>
              <TouchableOpacity
                style={styles.closeButton}
                onPress={() => {
                  setShowCamera(false);
                  setScanned(false);
                }}>
                <Text style={styles.closeButtonText}>✕</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.scanAreaContainer}>
              <View style={styles.scanArea}>
                <View style={[styles.scanCorner, styles.scanTopLeft]} />
                <View style={[styles.scanCorner, styles.scanTopRight]} />
                <View style={[styles.scanCorner, styles.scanBottomLeft]} />
                <View style={[styles.scanCorner, styles.scanBottomRight]} />
              </View>
            </View>

            <Text style={styles.cameraInstruction}>
              Positionnez le QR code dans le cadre
            </Text>
          </View>
        </CameraView>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Back Button */}
      {onBack && (
        <TouchableOpacity
          style={styles.backButton}
          onPress={onBack}
          activeOpacity={0.7}>
          <Text style={styles.backArrow}>←</Text>
          <Text style={styles.backText}>Retour</Text>
        </TouchableOpacity>
      )}

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
            style={[styles.corner, styles.topLeft, {opacity: pulse1}]}
          />
          <Animated.View
            style={[styles.corner, styles.topRight, {opacity: pulse2}]}
          />
          <Animated.View
            style={[styles.corner, styles.bottomLeft, {opacity: pulse3}]}
          />
          <Animated.View
            style={[styles.corner, styles.bottomRight, {opacity: pulse4}]}
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
        onPress={handleScanPress}
        activeOpacity={0.8}>
        <Text style={styles.primaryButtonText}>📷 Scanner le QR Code</Text>
      </TouchableOpacity>

      {/* Secondary CTA */}
      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={onScanComplete}
        activeOpacity={0.6}>
        <Text style={styles.secondaryIcon}>🔑</Text>
        <Text style={styles.secondaryButtonText}>
          Simuler le scan (démo)
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
  backButton: {
    position: 'absolute',
    top: 60,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    zIndex: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f2eded',
  },
  backArrow: {
    fontSize: 24,
    color: '#c12ec4',
    marginRight: 4,
  },
  backText: {
    fontSize: 16,
    color: '#c12ec4',
    fontWeight: '600',
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
  // Camera styles
  cameraContainer: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  cameraOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cameraHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 60,
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  cameraTitle: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  scanAreaContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanArea: {
    width: 280,
    height: 280,
    position: 'relative',
  },
  scanCorner: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderColor: '#e1a3ff',
    borderWidth: 4,
  },
  scanTopLeft: {
    top: 0,
    left: 0,
    borderRightWidth: 0,
    borderBottomWidth: 0,
  },
  scanTopRight: {
    top: 0,
    right: 0,
    borderLeftWidth: 0,
    borderBottomWidth: 0,
  },
  scanBottomLeft: {
    bottom: 0,
    left: 0,
    borderRightWidth: 0,
    borderTopWidth: 0,
  },
  scanBottomRight: {
    bottom: 0,
    right: 0,
    borderLeftWidth: 0,
    borderTopWidth: 0,
  },
  cameraInstruction: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
    paddingBottom: 100,
    paddingHorizontal: 40,
  },
});

export default ScanScreen;
