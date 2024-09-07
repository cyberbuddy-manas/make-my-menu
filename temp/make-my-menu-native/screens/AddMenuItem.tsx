import React, { useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image } from 'react-native';

export default function MenuScreen() {
    const [menuItems, setMenuItems] = useState([
        { id: '1', name: 'Item 1', description: 'This is the description of the item.', price: 1200 },
        { id: '2', name: 'Item 1', description: 'This is the description of the item.', price: 1200 },
        { id: '3', name: 'Item 1', description: 'This is the description of the item.', price: 1200 },
        { id: '4', name: 'Item 1', description: 'This is the description of the item.', price: 1200 },
        { id: '5', name: 'Item 1', description: 'This is the description of the item.', price: 1200 },
        { id: '6', name: 'Item 1', description: 'This is the description of the item.', price: 1200 },
    ]);

    // Add a new item to the menu
    const addItem = () => {
        setMenuItems([...menuItems, {
            id: (menuItems.length + 1).toString(),
            name: 'Item 1',
            description: 'This is the description of the item.',
            price: 1200,
        }]);
    };

    const renderItem = ({ item }) => (
        <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemPrice}>₹ {item.price}</Text>
        </View>
    );

    return (
        <View style={styles.container}>
            {/* Back Button */}
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/Logo.png')} // Replace with your logo
                    style={styles.logo}
                />
            </View>

            {/* Title and Subtitle */}
            <View style={styles.header}>
                <Text style={styles.title}>Create Durga’s Menu</Text>
                <Text style={styles.subtitle}>Customize your Dishes and Menu Layout</Text>
            </View>

            {/* Menu Items List */}
            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                numColumns={2}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addItemButton} onPress={addItem}>
                        <Text style={styles.addItemText}>+ Add Item</Text>
                    </TouchableOpacity>
                }
            />

            {/* Publish Button */}
            <TouchableOpacity style={styles.publishButton}>
                <Text style={styles.publishButtonText}>Publish →</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
    },
    backButton: {
        marginTop: 20,
        padding: 10,
        width: 40,
    },
    backButtonText: {
        fontSize: 24,
        color: '#333',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: 10,
    },
    logo: {
        width: 60,
        height: 60,
        resizeMode: 'contain',
    },
    header: {
        alignItems: 'center',
        marginTop: 10,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
    },
    menuItem: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 10,
        margin: 10,
        alignItems: 'center',
    },
    itemName: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 5,
    },
    itemDescription: {
        fontSize: 14,
        color: '#666',
        textAlign: 'center',
        marginBottom: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    addItemButton: {
        flex: 1,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        padding: 20,
        margin: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    addItemText: {
        fontSize: 18,
        color: '#333',
    },
    publishButton: {
        backgroundColor: '#FF6F61',
        paddingVertical: 15,
        borderRadius: 12,
        marginTop: 20,
        alignItems: 'center',
    },
    publishButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
