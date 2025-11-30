import { useState, useEffect, useRef, useMemo } from 'react';
import {
    View,
    Text,
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    ScrollView,
    Animated,
    Dimensions,
    PanResponder,
    Modal,
} from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT, Circle } from '../components/MapView';
import * as Location from 'expo-location';
import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import bars from '../data/Bars';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');
const DRAWER_HEIGHT = SCREEN_HEIGHT * 0.7;

const HomeScreen = ({ onScanPress }) => {
    const [viewMode, setViewMode] = useState('liste');
    const [searchQuery, setSearchQuery] = useState('');
    const [location, setLocation] = useState(null);
    const [mapMode, setMapMode] = useState('details'); // 'details' or 'heatmap'
    const [selectedBar, setSelectedBar] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [showSettings, setShowSettings] = useState(false);
    const [showOnlyFavorites, setShowOnlyFavorites] = useState(false);
    const drawerAnimation = useRef(new Animated.Value(DRAWER_HEIGHT)).current;

    // Load favorites from AsyncStorage on mount
    useEffect(() => {
        const loadFavorites = async () => {
            try {
                const storedFavorites = await AsyncStorage.getItem('favorites');
                if (storedFavorites) {
                    setFavorites(new Set(JSON.parse(storedFavorites)));
                }
            } catch (error) {
                console.error('Error loading favorites:', error);
            }
        };
        loadFavorites();
    }, []);

    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                return;
            }
            let location = await Location.getCurrentPositionAsync({});
            setLocation(location);
        })();
    }, []);

    const openDrawer = (bar) => {
        setSelectedBar(bar);
        Animated.spring(drawerAnimation, {
            toValue: 0,
            useNativeDriver: true,
            tension: 50,
            friction: 8,
        }).start();
    };

    const closeDrawer = () => {
        Animated.timing(drawerAnimation, {
            toValue: DRAWER_HEIGHT,
            duration: 300,
            useNativeDriver: true,
        }).start(() => setSelectedBar(null));
    };

    const toggleFavorite = async (barId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(barId)) {
                newFavorites.delete(barId);
            } else {
                newFavorites.add(barId);
            }
            
            // Save to AsyncStorage
            AsyncStorage.setItem('favorites', JSON.stringify(Array.from(newFavorites)))
                .catch(error => console.error('Error saving favorites:', error));
            
            return newFavorites;
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (_, gestureState) => {
                if (gestureState.dy > 0) {
                    drawerAnimation.setValue(gestureState.dy);
                }
            },
            onPanResponderRelease: (_, gestureState) => {
                if (gestureState.dy > 100) {
                    closeDrawer();
                } else {
                    Animated.spring(drawerAnimation, {
                        toValue: 0,
                        useNativeDriver: true,
                    }).start();
                }
            },
        })
    ).current;

    // Generate heatmap data based on bar density
    const heatmapCircles = useMemo(() => {
        // Create a grid to calculate density
        const gridSize = 0.002; // ~200m
        const densityMap = new Map();

        // Count bars in each grid cell
        bars.forEach(bar => {
            const gridX = Math.floor(bar.latitude / gridSize);
            const gridY = Math.floor(bar.longitude / gridSize);
            const key = `${gridX},${gridY}`;
            
            densityMap.set(key, {
                count: (densityMap.get(key)?.count || 0) + (bar.popular ? 2 : 1),
                lat: gridX * gridSize + gridSize / 2,
                lng: gridY * gridSize + gridSize / 2,
            });
        });

        // Convert density map to colored circles
        const circles = [];
        densityMap.forEach((data, key) => {
            const { count, lat, lng } = data;
            
            // Color scale based on density (Snapchat-style)
            let fillColor;
            let radius;
            if (count >= 3) {
                fillColor = 'rgba(193, 46, 196, 0.6)'; // Hot purple
                radius = 250;
            } else if (count >= 2) {
                fillColor = 'rgba(225, 163, 255, 0.5)'; // Medium purple
                radius = 200;
            } else {
                fillColor = 'rgba(225, 163, 255, 0.3)'; // Light purple
                radius = 150;
            }

            circles.push({
                key,
                center: { latitude: lat, longitude: lng },
                radius,
                fillColor,
                strokeColor: 'transparent',
                strokeWidth: 0,
            });
        });

        return circles;
    }, []);

    const filteredBars = useMemo(() => {
        let filtered = bars;
        if (showOnlyFavorites) {
            filtered = bars.filter(bar => favorites.has(bar.id));
        }
        return filtered;
    }, [showOnlyFavorites, favorites]);

    return (
        <View style={styles.container}>
            {/* Search Bar */}
            <View style={styles.searchContainer}>
                <View style={styles.searchBar}>
                    <Text style={styles.searchIcon}>🔍</Text>
                    <TextInput
                        style={styles.searchInput}
                        placeholder="Rechercher un bar..."
                        placeholderTextColor="#9CA3AF"
                        value={searchQuery}
                        onChangeText={setSearchQuery}
                    />
                </View>

                <TouchableOpacity 
                    style={styles.filterButton}
                    onPress={() => setShowSettings(true)}>
                    <Text style={styles.filterIcon}>⚙️</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                    style={[styles.mapButton, showOnlyFavorites && styles.mapButtonActive]}
                    onPress={() => setShowOnlyFavorites(!showOnlyFavorites)}>
                    <Ionicons 
                        name={showOnlyFavorites ? "heart" : "heart-outline"} 
                        size={20} 
                        color={showOnlyFavorites ? "#ffffff" : "#c12ec4"} 
                    />
                </TouchableOpacity>
            </View>

            {/* Toggle Liste/Carte */}
            <View style={styles.toggleContainer}>
                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        viewMode === 'liste' && styles.toggleButtonActive,
                    ]}
                    onPress={() => setViewMode('liste')}>
                    <Text
                        style={[
                            styles.toggleText,
                            viewMode === 'liste' && styles.toggleTextActive,
                        ]}
                        onPress={() => setViewMode("map")}>
                        Liste
                    </Text>
                </TouchableOpacity>

                <TouchableOpacity
                    style={[
                        styles.toggleButton,
                        viewMode === 'carte' && styles.toggleButtonActive,
                    ]}
                    onPress={() => setViewMode('carte')}>
                    <Text
                        style={[
                            styles.toggleText,
                            viewMode === 'carte' && styles.toggleTextActive,
                        ]}>
                        Carte
                    </Text>
                </TouchableOpacity>
            </View>

            {/* Sort By */}
            <View style={styles.sortContainer}>
                <Text style={styles.sortLabel}>Trier par :</Text>
                <TouchableOpacity style={styles.sortButton}>
                    <Text style={styles.sortText}>Pertinence</Text>
                    <Text style={styles.sortArrow}>▼</Text>
                </TouchableOpacity>
            </View>

            {/* Bars List */}
            {viewMode === 'liste' ? (
                <ScrollView
                    style={styles.listContainer}
                    showsVerticalScrollIndicator={false}>
                    {filteredBars.map(bar => (
                        <TouchableOpacity
                            key={bar.id}
                            style={styles.barCard}
                            onPress={() => openDrawer(bar)}
                            activeOpacity={0.8}>
                            {bar.popular && (
                                <View sAjouttyle={styles.popularBadge}>
                                    <Text style={styles.popularText}>Populaire</Text>
                                </View>
                            )}

                            <View style={styles.barImageContainer}>
                                <Image
                                    source={{ uri: bar.image }}
                                    style={styles.barImage}
                                    resizeMode="cover"
                                />
                                <TouchableOpacity 
                                    style={styles.favoriteButton}
                                    onPress={() => toggleFavorite(bar.id)}>
                                    <Ionicons 
                                        name={favorites.has(bar.id) ? "heart" : "heart-outline"} 
                                        size={20} 
                                        color={favorites.has(bar.id) ? "#c12ec4" : "#6B7280"} 
                                    />
                                </TouchableOpacity>
                            </View>

                            <View style={styles.barInfo}>
                                <Text style={styles.barName}>{bar.name}</Text>
                                <Text style={styles.barAddress}>{bar.address}</Text>

                                <View style={styles.barMeta}>
                                    <View style={styles.ratingContainer}>
                                        <Text style={styles.starIcon}>⭐</Text>
                                        <Text style={styles.ratingText}>{bar.rating}</Text>
                                    </View>
                                    <Text style={styles.distance}>{bar.distance}</Text>
                                </View>

                                <Text style={styles.hours}>{bar.hours}</Text>
                            </View>
                        </TouchableOpacity>
                    ))}
                </ScrollView>
            ) : (
                <View style={styles.mapWrapper}>
                    {/* Map Mode Toggle */}
                    <View style={styles.mapModeToggle}>
                        <TouchableOpacity
                            style={[
                                styles.mapModeButton,
                                mapMode === 'details' && styles.mapModeButtonActive,
                            ]}
                            onPress={() => setMapMode('details')}>
                            <Ionicons 
                                name="location" 
                                size={16} 
                                color={mapMode === 'details' ? '#ffffff' : '#c12ec4'} 
                            />
                            <Text style={[
                                styles.mapModeText,
                                mapMode === 'details' && styles.mapModeTextActive,
                            ]}>Détails</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={[
                                styles.mapModeButton,
                                mapMode === 'heatmap' && styles.mapModeButtonActive,
                            ]}
                            onPress={() => setMapMode('heatmap')}>
                            <Ionicons 
                                name="flame" 
                                size={16} 
                                color={mapMode === 'heatmap' ? '#ffffff' : '#c12ec4'} 
                            />
                            <Text style={[
                                styles.mapModeText,
                                mapMode === 'heatmap' && styles.mapModeTextActive,
                            ]}>Heatmap</Text>
                        </TouchableOpacity>
                    </View>

                    <MapView
                        style={styles.map}
                        provider={PROVIDER_DEFAULT}
                        showsUserLocation={true}
                        showsMyLocationButton={true}
                        followsUserLocation={true}
                        initialRegion={{
                            latitude: location?.coords?.latitude || 47.3941,
                            longitude: location?.coords?.longitude || 0.6848,
                            latitudeDelta: 0.01,
                            longitudeDelta: 0.01,
                        }}>
                        {mapMode === 'heatmap' ? (
                            // Heatmap mode: show density circles (Snapchat-style)
                            <>
                                {heatmapCircles.map(circle => (
                                    <Circle
                                        key={circle.key}
                                        center={circle.center}
                                        radius={circle.radius}
                                        fillColor={circle.fillColor}
                                        strokeColor={circle.strokeColor}
                                        strokeWidth={circle.strokeWidth}
                                    />
                                ))}
                            </>
                        ) : (
                            // Details mode: show markers
                            filteredBars.map(bar => (
                                <Marker
                                    key={bar.id}
                                    coordinate={{
                                        latitude: bar.latitude,
                                        longitude: bar.longitude,
                                    }}
                                    onPress={() => openDrawer(bar)}>
                                    <View style={styles.markerContainer}>
                                        <View style={styles.markerBubble}>
                                            <Text style={styles.markerEmoji}>{bar.emoji || '🍺'}</Text>
                                        </View>
                                        {bar.popular && (
                                            <View style={styles.markerBadge}>
                                                <Text style={styles.markerBadgeText}>⭐</Text>
                                            </View>
                                        )}
                                    </View>
                                </Marker>
                            ))
                        )}
                    </MapView>
                </View>
            )}

            {/* Floating QR Button */}
            <TouchableOpacity
                style={styles.floatingButton}
                onPress={onScanPress}
                activeOpacity={0.8}>
                <Ionicons name="qr-code" size={32} color="#ffffff" />
            </TouchableOpacity>

            {/* Drawer Bottom Sheet */}
            {selectedBar && (
                <>
                    <TouchableOpacity 
                        style={styles.overlay} 
                        activeOpacity={1}
                        onPress={closeDrawer}
                    />
                    <Animated.View
                        style={[
                            styles.drawer,
                            {
                                transform: [{ translateY: drawerAnimation }],
                            },
                        ]}
                        {...panResponder.panHandlers}>
                        <View style={styles.drawerHandle} />
                        
                        <ScrollView 
                            style={styles.drawerContent}
                            showsVerticalScrollIndicator={false}>
                            {/* Bar Image */}
                            <View style={styles.drawerImageContainer}>
                                <Image
                                    source={{ uri: selectedBar.image }}
                                    style={styles.drawerImage}
                                    resizeMode="cover"
                                />
                                {selectedBar.popular && (
                                    <View style={styles.drawerPopularBadge}>
                                        <Text style={styles.popularText}>⭐ Populaire</Text>
                                    </View>
                                )}
                                <TouchableOpacity 
                                    style={styles.drawerFavoriteButton}
                                    onPress={() => toggleFavorite(selectedBar.id)}>
                                    <Ionicons 
                                        name={favorites.has(selectedBar.id) ? "heart" : "heart-outline"} 
                                        size={24} 
                                        color="#c12ec4" 
                                    />
                                </TouchableOpacity>
                            </View>

                            {/* Bar Info */}
                            <View style={styles.drawerInfo}>
                                <Text style={styles.drawerBarName}>{selectedBar.name}</Text>
                                <Text style={styles.drawerBarAddress}>{selectedBar.address}</Text>

                                {/* Rating & Distance */}
                                <View style={styles.drawerMeta}>
                                    <View style={styles.drawerRating}>
                                        <Text style={styles.starIcon}>⭐</Text>
                                        <Text style={styles.drawerRatingText}>{selectedBar.rating}</Text>
                                        <Text style={styles.drawerRatingCount}>(128 avis)</Text>
                                    </View>
                                    <View style={styles.drawerDistance}>
                                        <Ionicons name="walk" size={16} color="#6B7280" />
                                        <Text style={styles.drawerDistanceText}>{selectedBar.distance}</Text>
                                    </View>
                                </View>

                                {/* Hours */}
                                <View style={styles.drawerHours}>
                                    <Ionicons name="time-outline" size={20} color="#c12ec4" />
                                    <Text style={styles.drawerHoursText}>{selectedBar.hours}</Text>
                                </View>

                                {/* Description */}
                                <View style={styles.drawerSection}>
                                    <Text style={styles.drawerSectionTitle}>À propos</Text>
                                    <Text style={styles.drawerDescription}>
                                        Un lieu convivial au cœur de Tours, parfait pour passer une soirée 
                                        entre amis. Ambiance chaleureuse et sélection de boissons variée.
                                    </Text>
                                </View>

                                {/* Amenities */}
                                <View style={styles.drawerSection}>
                                    <Text style={styles.drawerSectionTitle}>Équipements</Text>
                                    <View style={styles.amenitiesContainer}>
                                        <View style={styles.amenityItem}>
                                            <Ionicons name="wifi" size={20} color="#c12ec4" />
                                            <Text style={styles.amenityText}>WiFi</Text>
                                        </View>
                                        <View style={styles.amenityItem}>
                                            <Ionicons name="card" size={20} color="#c12ec4" />
                                            <Text style={styles.amenityText}>CB</Text>
                                        </View>
                                        <View style={styles.amenityItem}>
                                            <Ionicons name="musical-notes" size={20} color="#c12ec4" />
                                            <Text style={styles.amenityText}>Musique</Text>
                                        </View>
                                        <View style={styles.amenityItem}>
                                            <Ionicons name="fast-food" size={20} color="#c12ec4" />
                                            <Text style={styles.amenityText}>Snacks</Text>
                                        </View>
                                    </View>
                                </View>

                                {/* Action Buttons */}
                                <View style={styles.drawerActions}>
                                    <TouchableOpacity style={styles.directionButton}>
                                        <Ionicons name="navigate" size={20} color="#ffffff" />
                                        <Text style={styles.directionButtonText}>Itinéraire</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.callButton}>
                                        <Ionicons name="call" size={20} color="#c12ec4" />
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.shareButton}>
                                        <Ionicons name="share-social" size={20} color="#c12ec4" />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </ScrollView>
                    </Animated.View>
                </>
            )}

            {/* Settings Modal */}
            {showSettings && (
                <Modal
                    visible={showSettings}
                    transparent={true}
                    animationType="fade"
                    onRequestClose={() => setShowSettings(false)}>
                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Paramètres</Text>
                            
                            <View style={styles.settingItem}>
                                <Ionicons name="notifications-outline" size={24} color="#374151" />
                                <Text style={styles.settingText}>Notifications</Text>
                                <View style={styles.settingToggle}>
                                    <View style={styles.toggleSwitch} />
                                </View>
                            </View>

                            <View style={styles.settingItem}>
                                <Ionicons name="location-outline" size={24} color="#374151" />
                                <Text style={styles.settingText}>Localisation</Text>
                                <View style={styles.settingToggle}>
                                    <View style={[styles.toggleSwitch, styles.toggleSwitchActive]} />
                                </View>
                            </View>

                            <View style={styles.settingItem}>
                                <Ionicons name="moon-outline" size={24} color="#374151" />
                                <Text style={styles.settingText}>Mode sombre</Text>
                                <View style={styles.settingToggle}>
                                    <View style={styles.toggleSwitch} />
                                </View>
                            </View>

                            <TouchableOpacity
                                style={styles.closeModalButton}
                                onPress={() => setShowSettings(false)}>
                                <Text style={styles.closeModalButtonText}>Fermer</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 60,
        paddingBottom: 12,
        gap: 8,
    },
    searchBar: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#f2eded',
        borderRadius: 25,
        paddingHorizontal: 16,
        paddingVertical: 12,
    },
    searchIcon: {
        fontSize: 18,
        marginRight: 8,
    },
    searchInput: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
    },
    filterButton: {
        width: 48,
        height: 48,
        backgroundColor: '#f2eded',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    filterIcon: {
        fontSize: 20,
    },
    mapButton: {
        width: 48,
        height: 48,
        backgroundColor: '#f2eded',
        borderRadius: 24,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapIcon: {
        fontSize: 20,
    },
    toggleContainer: {
        flexDirection: 'row',
        marginHorizontal: 16,
        marginTop: 8,
        marginBottom: 16,
        backgroundColor: '#f2eded',
        borderRadius: 25,
        padding: 4,
    },
    toggleButton: {
        flex: 1,
        paddingVertical: 12,
        borderRadius: 20,
        alignItems: 'center',
    },
    toggleButtonActive: {
        backgroundColor: '#c12ec4',
    },
    toggleText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#6B7280',
    },
    toggleTextActive: {
        color: '#ffffff',
    },
    sortContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 16,
    },
    sortLabel: {
        fontSize: 14,
        color: '#374151',
        marginRight: 8,
    },
    sortButton: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    sortText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#c12ec4',
    },
    sortArrow: {
        fontSize: 10,
        color: '#c12ec4',
    },
    listContainer: {
        flex: 1,
        paddingHorizontal: 16,
    },
    barCard: {
        backgroundColor: '#ffffff',
        borderRadius: 16,
        marginBottom: 16,
        overflow: 'hidden',
        borderWidth: 1,
        borderColor: '#E5E7EB',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 2,
    },
    popularBadge: {
        position: 'absolute',
        top: 12,
        left: 12,
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 12,
        zIndex: 10,
    },
    popularText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#c12ec4',
    },
    barImageContainer: {
        height: 180,
        backgroundColor: '#f2eded',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative',
    },
    barImage: {
        width: '100%',
        height: '100%',
    },
    barEmoji: {
        fontSize: 80,
    },
    favoriteButton: {
        position: 'absolute',
        top: 12,
        right: 12,
        width: 40,
        height: 40,
        backgroundColor: 'rgba(255,255,255,0.9)',
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    favoriteIcon: {
        fontSize: 20,
    },
    barInfo: {
        padding: 16,
    },
    barName: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 4,
    },
    barAddress: {
        fontSize: 14,
        color: '#6B7280',
        marginBottom: 12,
    },
    barMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 16,
    },
    starIcon: {
        fontSize: 14,
        marginRight: 4,
    },
    ratingText: {
        fontSize: 14,
        fontWeight: '600',
        color: '#374151',
    },
    distance: {
        fontSize: 14,
        color: '#6B7280',
    },
    hours: {
        fontSize: 13,
        color: '#c12ec4',
        fontWeight: '500',
    },
    mapWrapper: {
        flex: 1,
        marginHorizontal: 16,
        marginBottom: 100,
        borderRadius: 16,
        overflow: 'hidden',
    },
    mapModeToggle: {
        position: 'absolute',
        top: 16,
        right: 16,
        zIndex: 10,
        flexDirection: 'row',
        backgroundColor: '#ffffff',
        borderRadius: 20,
        padding: 4,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    mapModeButton: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 16,
        gap: 4,
    },
    mapModeButtonActive: {
        backgroundColor: '#c12ec4',
    },
    mapModeText: {
        fontSize: 12,
        fontWeight: '600',
        color: '#c12ec4',
    },
    mapModeTextActive: {
        color: '#ffffff',
    },
    map: {
        flex: 1,
    },
    markerContainer: {
        alignItems: 'center',
        justifyContent: 'center',
    },
    markerBubble: {
        backgroundColor: '#ffffff',
        borderRadius: 20,
        width: 40,
        height: 40,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: '#c12ec4',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    markerEmoji: {
        fontSize: 20,
    },
    markerBadge: {
        position: 'absolute',
        top: -5,
        right: -5,
        backgroundColor: '#c12ec4',
        borderRadius: 10,
        width: 20,
        height: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerBadgeText: {
        fontSize: 12,
    },
    mapPlaceholder: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f2eded',
        marginHorizontal: 16,
        borderRadius: 16,
        marginBottom: 100,
    },
    mapPlaceholderEmoji: {
        fontSize: 64,
        marginBottom: 16,
    },
    mapPlaceholderText: {
        fontSize: 16,
        color: '#6B7280',
    },
    floatingButton: {
        position: 'absolute',
        bottom: 32,
        right: 24,
        width: 64,
        height: 64,
        backgroundColor: '#c12ec4',
        borderRadius: 32,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#c12ec4',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        zIndex: 100,
    },
    drawer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        height: DRAWER_HEIGHT,
        backgroundColor: '#ffffff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        zIndex: 101,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -4 },
        shadowOpacity: 0.2,
        shadowRadius: 8,
        elevation: 10,
    },
    drawerHandle: {
        width: 40,
        height: 5,
        backgroundColor: '#E5E7EB',
        borderRadius: 3,
        alignSelf: 'center',
        marginTop: 12,
        marginBottom: 8,
    },
    drawerContent: {
        flex: 1,
    },
    drawerImageContainer: {
        height: 250,
        position: 'relative',
    },
    drawerImage: {
        width: '100%',
        height: '100%',
    },
    drawerPopularBadge: {
        position: 'absolute',
        top: 16,
        left: 16,
        backgroundColor: '#ffffff',
        paddingHorizontal: 12,
        paddingVertical: 6,
        borderRadius: 16,
    },
    drawerFavoriteButton: {
        position: 'absolute',
        top: 16,
        right: 16,
        width: 44,
        height: 44,
        backgroundColor: '#ffffff',
        borderRadius: 22,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    drawerInfo: {
        padding: 20,
    },
    drawerBarName: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 8,
    },
    drawerBarAddress: {
        fontSize: 16,
        color: '#6B7280',
        marginBottom: 16,
    },
    drawerMeta: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16,
        gap: 24,
    },
    drawerRating: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    drawerRatingText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#374151',
    },
    drawerRatingCount: {
        fontSize: 14,
        color: '#9CA3AF',
        marginLeft: 4,
    },
    drawerDistance: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 4,
    },
    drawerDistanceText: {
        fontSize: 14,
        color: '#6B7280',
    },
    drawerHours: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        backgroundColor: '#f2eded',
        padding: 12,
        borderRadius: 12,
        marginBottom: 20,
    },
    drawerHoursText: {
        fontSize: 14,
        color: '#c12ec4',
        fontWeight: '600',
    },
    drawerSection: {
        marginBottom: 20,
    },
    drawerSectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 12,
    },
    drawerDescription: {
        fontSize: 15,
        color: '#6B7280',
        lineHeight: 22,
    },
    amenitiesContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },
    amenityItem: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 6,
        backgroundColor: '#f2eded',
        paddingVertical: 8,
        paddingHorizontal: 12,
        borderRadius: 12,
    },
    amenityText: {
        fontSize: 14,
        color: '#374151',
        fontWeight: '500',
    },
    drawerActions: {
        flexDirection: 'row',
        gap: 12,
        marginTop: 8,
        marginBottom: 20,
    },
    directionButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#c12ec4',
        paddingVertical: 14,
        borderRadius: 12,
        gap: 8,
    },
    directionButtonText: {
        fontSize: 16,
        fontWeight: '600',
        color: '#ffffff',
    },
    callButton: {
        width: 50,
        height: 50,
        backgroundColor: '#f2eded',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    shareButton: {
        width: 50,
        height: 50,
        backgroundColor: '#f2eded',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
    },
    mapButtonActive: {
        backgroundColor: '#c12ec4',
    },
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 24,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        borderRadius: 24,
        padding: 24,
        width: '100%',
        maxWidth: 400,
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#374151',
        marginBottom: 24,
        textAlign: 'center',
    },
    settingItem: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#f2eded',
    },
    settingText: {
        flex: 1,
        fontSize: 16,
        color: '#374151',
        marginLeft: 16,
    },
    settingToggle: {
        width: 50,
        height: 28,
        backgroundColor: '#d1d5db',
        borderRadius: 14,
        padding: 2,
    },
    toggleSwitch: {
        width: 24,
        height: 24,
        backgroundColor: '#ffffff',
        borderRadius: 12,
    },
    toggleSwitchActive: {
        backgroundColor: '#c12ec4',
        marginLeft: 22,
    },
    closeModalButton: {
        backgroundColor: '#c12ec4',
        borderRadius: 12,
        paddingVertical: 14,
        alignItems: 'center',
        marginTop: 24,
    },
    closeModalButtonText: {
        color: '#ffffff',
        fontSize: 16,
        fontWeight: '600',
    },
});

export default HomeScreen;
