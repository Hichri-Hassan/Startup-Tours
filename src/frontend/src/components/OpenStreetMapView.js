import React from 'react';
import { View, StyleSheet, Platform } from 'react-native';
import MapView, { Marker, PROVIDER_DEFAULT } from './MapView';

const OpenStreetMapView = ({ 
    style, 
    initialRegion, 
    children, 
    markers = [],
    ...props 
}) => {
    return (
        <MapView
            style={style}
            provider={PROVIDER_DEFAULT}
            mapType={Platform.OS === 'android' ? 'none' : 'standard'}
            customMapStyle={Platform.OS === 'android' ? osmMapStyle : []}
            initialRegion={initialRegion}
            {...props}>
            {children}
            {markers.map((marker, index) => (
                <Marker
                    key={marker.id || index}
                    coordinate={marker.coordinate}
                    title={marker.title}
                    description={marker.description}>
                    {marker.customMarker}
                </Marker>
            ))}
        </MapView>
    );
};

// Style pour simuler OpenStreetMap sur Android
const osmMapStyle = [
    {
        "elementType": "geometry",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "elementType": "labels.icon",
        "stylers": [{ "visibility": "off" }]
    },
    {
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "elementType": "labels.text.stroke",
        "stylers": [{ "color": "#f5f5f5" }]
    },
    {
        "featureType": "administrative.land_parcel",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#bdbdbd" }]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "poi",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [{ "color": "#c8e6c9" }]
    },
    {
        "featureType": "poi.park",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#558b2f" }]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffffff" }]
    },
    {
        "featureType": "road.arterial",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#757575" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry",
        "stylers": [{ "color": "#ffd54f" }]
    },
    {
        "featureType": "road.highway",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#616161" }]
    },
    {
        "featureType": "road.local",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#9e9e9e" }]
    },
    {
        "featureType": "transit.line",
        "elementType": "geometry",
        "stylers": [{ "color": "#e5e5e5" }]
    },
    {
        "featureType": "transit.station",
        "elementType": "geometry",
        "stylers": [{ "color": "#eeeeee" }]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [{ "color": "#aadaff" }]
    },
    {
        "featureType": "water",
        "elementType": "labels.text.fill",
        "stylers": [{ "color": "#6699cc" }]
    }
];

export default OpenStreetMapView;
