import { useRoute, RouteProp } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity, Image, Modal, TextInput, ScrollView } from 'react-native';
import { useRestaurantHook } from '../api/hooks';

interface MenuItem {
    id: number;
    name: string;
    price: number;
    description: string;
    category: string;
}

type MenuScreenRouteProp = RouteProp<
    {
        params: {
            menu: MenuItem[];
            restaurantName?: string;
        };
    },
    'params'
>;

export default function MenuScreen() {
    const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
    const route = useRoute<MenuScreenRouteProp>();
    const { params } = route;

    const { updateRestaurant } = useRestaurantHook();

    const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [selectedItemId, setSelectedItemId] = useState<number | null>(null);

    const [dropdownVisible, setDropdownVisible] = useState<boolean>(false); // For custom dropdown visibility

    const [newMenuItem, setNewMenuItem] = useState<MenuItem>({
        id: Date.now(),
        name: '',
        description: '',
        price: 0,
        category: '',
    });

    useEffect(() => {
        if (params?.menu) {
            const tempMenus = params?.menu.map((me) => {
                return me?.id ? me : { ...me, id: new Date().getTime() };
            });
            setMenuItems(tempMenus);
        }
    }, [params]);

    const openAddItemModal = () => {
        setNewMenuItem({ id: Date.now(), name: '', description: '', price: 0, category: '' });
        setIsEditing(false);
        setIsModalVisible(true);
    };

    const openEditItemModal = (item: MenuItem) => {
        setNewMenuItem(item);
        setIsEditing(true);
        setSelectedItemId(item.id);
        setIsModalVisible(true);
    };

    const saveNewItem = () => {
        if (isEditing && selectedItemId !== null) {
            setMenuItems((prevItems) =>
                prevItems.map((item) =>
                    item.id === selectedItemId ? newMenuItem : item
                )
            );
        } else {
            const newItem: MenuItem = {
                id: Date.now(),
                name: newMenuItem.name,
                description: newMenuItem.description,
                price: newMenuItem.price,
                category: newMenuItem.category || "other",
            };
            setMenuItems([...menuItems, newItem]);
        }
        setIsModalVisible(false);
    };

    const handlePublish = () => {
        updateRestaurant({ ...params, menu: menuItems });
    };

    const renderItem = ({ item }: { item: MenuItem }) => (
        <View style={styles.menuItem}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemDescription}>{item.description}</Text>
            <Text style={styles.itemCategory}>Category: {item.category}</Text>
            <Text style={styles.itemPrice}>₹ {item.price}</Text>
            <TouchableOpacity style={styles.editButton} onPress={() => openEditItemModal(item)}>
                <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
        </View>
    );

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/Logo.png')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.header}>
                <Text style={styles.title}>Create Durga’s Menu</Text>
                <Text style={styles.subtitle}>Customize your Dishes and Menu Layout</Text>
            </View>

            <FlatList
                data={menuItems}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                ListFooterComponent={
                    <TouchableOpacity style={styles.addItemButton} onPress={openAddItemModal}>
                        <Text style={styles.addItemText}>+ Add Item</Text>
                    </TouchableOpacity>
                }
            />

            <TouchableOpacity style={styles.publishButton} onPress={handlePublish}>
                <Text style={styles.publishButtonText}>Publish →</Text>
            </TouchableOpacity>

            {/* Modal for adding/editing items */}
            <Modal
                visible={isModalVisible}
                animationType="slide"
                onRequestClose={() => setIsModalVisible(false)}
                transparent={true}
            >
                <View style={styles.modalContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder="Menu Item Name"
                        value={newMenuItem.name}
                        onChangeText={(text) => setNewMenuItem({ ...newMenuItem, name: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Description"
                        value={newMenuItem.description}
                        onChangeText={(text) => setNewMenuItem({ ...newMenuItem, description: text })}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Price"
                        keyboardType="numeric"
                        value={newMenuItem.price.toString()}
                        onChangeText={(text) => setNewMenuItem({ ...newMenuItem, price: parseFloat(text) })}
                    />

                    {/* Custom Dropdown for Category Selection */}
                    <TouchableOpacity
                        style={styles.input}
                        onPress={() => setDropdownVisible(!dropdownVisible)}
                    >
                        <Text>{newMenuItem.category || 'Select Category'}</Text>
                    </TouchableOpacity>
                    {dropdownVisible && (
                        <View style={styles.dropdown}>
                            {['Pizza', 'Pasta', 'Burgers', 'Drinks',"other"].map((category) => (
                                <TouchableOpacity
                                    key={category}
                                    onPress={() => {
                                        setNewMenuItem({ ...newMenuItem, category });
                                        setDropdownVisible(false);
                                    }}
                                    style={styles.dropdownItem}
                                >
                                    <Text>{category}</Text>
                                </TouchableOpacity>
                            ))}
                        </View>
                    )}

                    <TouchableOpacity style={styles.saveButton} onPress={saveNewItem}>
                        <Text style={styles.saveButtonText}>{isEditing ? 'Save Changes' : 'Save Item'}</Text>
                    </TouchableOpacity>
                </View>
            </Modal>
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
        position: 'relative',
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
    itemCategory: {
        fontSize: 14,
        color: '#999',
        marginBottom: 10,
    },
    itemPrice: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000',
    },
    editButton: {
        position: 'absolute',
        right: 10,
        top: 10,
        backgroundColor: '#FF6F61',
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderRadius: 8,
    },
    editButtonText: {
        color: '#fff',
        fontWeight: 'bold',
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
        paddingHorizontal: 30,
        borderRadius: 8,
        alignItems: 'center',
        marginVertical: 20,
    },
    publishButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        backgroundColor: '#fff',
        padding: 10,
        marginVertical: 10,
        width: '80%',
        borderRadius: 8,
    },
    dropdown: {
        backgroundColor: '#fff',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        position: 'absolute',
        // top: 140, // Adjust based on the location in your layout
        width: '80%',
        zIndex: 1,
    },
    dropdownItem: {
        padding: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ddd',
    },
    saveButton: {
        backgroundColor: '#FF6F61',
        padding: 15,
        borderRadius: 8,
        marginTop: 20,
    },
    saveButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
});
