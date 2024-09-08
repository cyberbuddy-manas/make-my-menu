import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import { Button } from 'react-native-paper';

const HomeScreen = () => {
    const restaurants = [
        { id: '1', name: 'Restro Name' },
        { id: '2', name: 'Restro Name' },
        { id: '3', name: 'Restro Name' },
        { id: '4', name: 'Restro Name' },
        { id: '5', name: 'Restro Name' },
        { id: '6', name: 'Restro Name' },
    ];

    const renderRestaurant = ({ item }) => (
        <TouchableOpacity style={styles.restaurantButton}>
            <Text style={styles.restaurantText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <View style={styles.container}>
            {/* Logout Button */}
            <TouchableOpacity style={styles.logoutButton}>
                <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>

            {/* Logo and Title */}
            <View style={styles.header}>
                <Image source={require('../assets/Logo.png')} style={styles.logo} />
                <Text style={styles.title}>Bring Your Restaurant Online</Text>
                <Text style={styles.subtitle}>
                    Effortlessly Add Your Restaurant and Craft Custom Menus in Minutes
                </Text>
            </View>

            {/* Onboard Your Restaurant Button */}
            <TouchableOpacity style={styles.onboardButton}>
                <Image source={require('../assets/bg-home.png')} style={styles.onboardImage} />
                <Text style={styles.onboardText}>Onboard your Restaurant</Text>
            </TouchableOpacity>

            {/* Available Restaurants */}
            <Text style={styles.availableText}>Available Restaurants</Text>
            <FlatList
                data={restaurants}
                renderItem={renderRestaurant}
                keyExtractor={(item) => item.id}
                numColumns={2}
                style={styles.restaurantList}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    logoutButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 30,
    },
    logoutText: {
        color: '#FF6F61',
        fontSize: 16,
        fontWeight: 'bold',
    },
    header: {
        alignItems: 'center',
        marginVertical: 20,
    },
    logo: {
        width: 50,
        height: 50,
        marginBottom: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    onboardButton: {
        alignItems: 'center',
        backgroundColor: '#000',
        borderRadius: 8,
        marginVertical: 20,
        paddingBottom: 10,
    },
    onboardImage: {
        width: '100%',
        height: 120,
        resizeMode: 'cover',
        borderRadius: 8,
    },
    onboardText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 10,
    },
    availableText: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 10,
    },
    restaurantList: {
        marginBottom: 20,
    },
    restaurantButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        margin: 5,
        alignItems: 'center',
    },
    restaurantText: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    publishButton: {
        backgroundColor: '#FC6011',
        paddingVertical: 15,
        borderRadius: 12,
        alignItems: 'center',
        marginTop: 20,
    },
    publishText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default HomeScreen;
