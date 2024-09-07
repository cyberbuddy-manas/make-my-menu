import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image } from 'react-native';
import { SegmentedButtons } from 'react-native-paper';

export default function App() {
    const [name, setName] = useState('');
    const [subDomain, setSubDomain] = useState('');
    const [address, setAddress] = useState('');
    const [value, setValue] = useState('');

    return (
        <View style={styles.container}>

            {/* Back Button */}
            <TouchableOpacity style={styles.backButton}>
                <Text style={styles.backButtonText}>←</Text>
            </TouchableOpacity>

            {/* Logo */}
            <View style={styles.logoContainer}>
                <Image
                    source={require('../assets/Logo.png')}  // Assuming logo.png is placed in the assets folder
                    style={styles.logo}
                />
            </View>

            {/* Title and Subtitle */}
            <View style={styles.header}>
                <Text style={styles.title}>Create Restaurant’s Identity</Text>
                <Text style={styles.subtitle}>Establish your unique Online Presence</Text>
            </View>

            {/* Name Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your Input"
                    value={name}
                    onChangeText={setName}
                />
            </View>

            {/* Subdomain Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Subdomain</Text>
                <TextInput
                    style={styles.input}
                    placeholder="restaurant.makemymenu.online"
                    value={subDomain}
                    onChangeText={setSubDomain}
                />
            </View>

            {/* Segmented Buttons */}
            <View style={styles.segmentedButtonsContainer}>
                <SegmentedButtons
                    value={value}
                    onValueChange={setValue}
                    buttons={[
                        {
                            value: 'restro1',
                            label: 'Restro 1',
                        },
                        {
                            value: 'restro2',
                            label: 'Restro 2',
                        },
                        {
                            value: 'restro3',
                            label: 'Restro 3',
                        },
                    ]}
                    style={styles.segmentedButtons}
                />
            </View>

            {/* Address Input */}
            <View style={styles.inputContainer}>
                <Text style={styles.label}>Address</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Your street address"
                    value={address}
                    onChangeText={setAddress}
                />
            </View>

            {/* Submit Button */}
            <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitButtonText}>Let’s Digitalize your menu →</Text>
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
        marginTop: 40,
        padding: 10,
        width: 40,
    },
    backButtonText: {
        fontSize: 30,
        color: '#333',
        transform: 'scale(1.5)'
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
    },
    inputContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 16,
        color: '#666',
        marginBottom: 5,
    },
    input: {
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
    },
    segmentedButtonsContainer: {
        marginTop: 20,
    },
    segmentedButtons: {
        borderRadius: 10,
        backgroundColor: '#f2f2f2',
    },
    submitButton: {
        backgroundColor: '#FC6011',
        paddingVertical: 15,
        borderRadius: 12,
        marginTop: 'auto',
        alignItems: 'center',
    },
    submitButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: 'bold',
    },
});
