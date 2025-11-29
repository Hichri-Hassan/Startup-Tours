import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

const bars = [
  {
    id: 1,
    name: 'Le Central Bar',
    address: 'Place Jean Jaurès, Tours',
    distance: '120 m',
    rating: 4.5,
    image: '🍺',
    hours: 'Ouvert jusqu\'à 02:00',
    popular: true,
  },
  {
    id: 2,
    name: 'Café des Arts',
    address: 'Rue Nationale, Tours',
    distance: '250 m',
    rating: 4.2,
    image: '🎨',
    hours: 'Ouvert jusqu\'à 00:00',
    popular: false,
  },
  {
    id: 3,
    name: 'Le Temps des Cerises',
    address: 'Place Plumereau, Tours',
    distance: '380 m',
    rating: 4.7,
    image: '🍷',
    hours: 'Ouvert jusqu\'à 01:00',
    popular: true,
  },
  {
    id: 4,
    name: 'Pub Saint Patrick',
    address: 'Rue Colbert, Tours',
    distance: '450 m',
    rating: 4.3,
    image: '🍀',
    hours: 'Ouvert jusqu\'à 02:00',
    popular: false,
  },
];

const HomeScreen = ({onScanPress}) => {
  const [viewMode, setViewMode] = useState('liste');
  const [searchQuery, setSearchQuery] = useState('');

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

        <TouchableOpacity style={styles.filterButton}>
          <Text style={styles.filterIcon}>⚙️</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.mapButton}>
          <Text style={styles.mapIcon}>📍</Text>
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
            ]}>
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
          {bars.map(bar => (
            <TouchableOpacity
              key={bar.id}
              style={styles.barCard}
              activeOpacity={0.8}>
              {bar.popular && (
                <View style={styles.popularBadge}>
                  <Text style={styles.popularText}>Populaire</Text>
                </View>
              )}

              <View style={styles.barImageContainer}>
                <View style={styles.barImage}>
                  <Text style={styles.barEmoji}>{bar.image}</Text>
                </View>
                <TouchableOpacity style={styles.favoriteButton}>
                  <Text style={styles.favoriteIcon}>🤍</Text>
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
        <View style={styles.mapPlaceholder}>
          <Text style={styles.mapPlaceholderEmoji}>🗺️</Text>
          <Text style={styles.mapPlaceholderText}>Vue carte à venir</Text>
        </View>
      )}

      {/* Floating QR Button */}
      <TouchableOpacity
        style={styles.floatingButton}
        onPress={onScanPress}
        activeOpacity={0.8}>
        <Text style={styles.floatingButtonIcon}>📷</Text>
      </TouchableOpacity>
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
    backgroundColor: '#006666',
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
    color: '#006666',
  },
  sortArrow: {
    fontSize: 10,
    color: '#006666',
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
    shadowOffset: {width: 0, height: 2},
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
    color: '#374151',
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
    justifyContent: 'center',
    alignItems: 'center',
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
    color: '#059669',
    fontWeight: '500',
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
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  floatingButtonIcon: {
    fontSize: 28,
  },
});

export default HomeScreen;
