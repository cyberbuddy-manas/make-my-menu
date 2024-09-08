import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity, Image, FlatList, ScrollView, RefreshControl } from 'react-native';
import { Button, Text } from 'react-native-paper';
import { useAuthHook, useRestaurantHook } from '../api/hooks';
import { useNavigation } from '@react-navigation/native';
import { AddMenuItemRoute, AddRestaurantRoute } from '../util/routes';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const HomeScreen = () => {
    // const restaurants = [
    //     { id: '1', name: 'Restro Name' },
    //     { id: '2', name: 'Restro Name' },
    //     { id: '3', name: 'Restro Name' },
    //     { id: '4', name: 'Restro Name' },
    //     { id: '5', name: 'Restro Name' },
    //     { id: '6', name: 'Restro Name' },
    // ];
    const navigation = useNavigation();

    const {
        restaurants,
    }: {
        restaurants: {
            _id: string;
            restaurantName: string;
            menu: object;
        }[];
    } = useSelector((state: RootState) => state.global);
    const { getRestaurants } = useRestaurantHook();

    useEffect(() => {
        if (restaurants?.length == 0) {
            getRestaurants();
        }
    }, []);

    const { logoutUser } = useAuthHook();

    const renderRestaurant = ({ item }) => (
        <TouchableOpacity style={styles.restaurantButton}>
            <Text style={styles.restaurantText}>{item.name}</Text>
        </TouchableOpacity>
    );

    return (
        <ScrollView style={styles.container} refreshControl={
            <RefreshControl
                refreshing={false}
                onRefresh={() => {
                    getRestaurants();
                }}
            />
        }>
            {/* Logout Button */}
            <TouchableOpacity onPress={() => { logoutUser() }} style={styles.logoutButton}>
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
            <TouchableOpacity style={styles.onboardButton} onPress={() => { navigation.navigate(AddRestaurantRoute) }}>
                <Image source={require('../assets/bg-home.png')} style={styles.onboardImage} />
                <Text style={styles.onboardText}>Onboard your Restaurant</Text>
            </TouchableOpacity>

            <View style={{ marginBottom: 40 }}>
                {/* Available Restaurants */}
                <Text style={styles.availableText}>Available Restaurants</Text>

                {/* Mapping over restaurants */}
                {restaurants.map((rest, index) => (
                    < TouchableOpacity key={rest._id} style={styles.restaurantButton} onPress={() => navigation.navigate(AddMenuItemRoute, rest)}>
                        {/* Ensure this is a valid string */}
                        <Text style={styles.restaurantText}>{rest.restaurantName || 'Unnamed Restaurant'}</Text>
                    </ TouchableOpacity>
                ))}
            </View>
        </ScrollView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
        paddingVertical: 10,
        // paddingBottom: 50
    },
    logoutButton: {
        alignSelf: 'flex-end',
        marginRight: 10,
        marginTop: 40,
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
        flexGrow: 1,
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
