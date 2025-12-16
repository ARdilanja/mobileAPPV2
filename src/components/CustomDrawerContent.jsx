import React from 'react';
import {
    View,
    Text,
    Image,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';
import { DrawerContentScrollView } from '@react-navigation/drawer';

const CustomDrawerContent = ({ navigation }) => {
    return (
        <DrawerContentScrollView contentContainerStyle={styles.container}>

            {/* 🔵 TOP IMAGE SECTION */}
            <View style={styles.header}>
                <Image
                    source={require('../assets/images/profile.png')} // your image
                    style={styles.profileImage}
                />
                <Text style={styles.name}>Kaviyarasan</Text>
                <Text style={styles.subText}>Digital Marketing</Text>
            </View>

            {/* 🔵 MENU ITEMS */}
            <TouchableOpacity
                style={styles.item}
                onPress={() => {
                    navigation.closeDrawer();
                    navigation.navigate('MainApp', {
                        screen: 'DeleteAccountScreen',
                    });
                }}
            >
                <Text style={styles.itemText}>Delete Account</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('StartInterview')}
            >
                <Text style={styles.itemText}>Start Interview</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('CompletedInterview')}
            >
                <Text style={styles.itemText}>Completed Interview</Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={styles.item}
                onPress={() => navigation.navigate('MyProfile')}
            >
                <Text style={styles.itemText}>My Profile</Text>
            </TouchableOpacity>

        </DrawerContentScrollView>
    );
};

export default CustomDrawerContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },

    header: {
        paddingVertical: 30,
        alignItems: 'center',
        backgroundColor: '#2563EB',
        marginBottom: 20,
    },

    profileImage: {
        width: 80,
        height: 80,
        borderRadius: 40,
        marginBottom: 10,
        borderWidth: 2,
        borderColor: '#fff',
    },

    name: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '600',
    },

    subText: {
        color: '#E5E7EB',
        fontSize: 12,
        marginTop: 2,
    },

    item: {
        paddingVertical: 14,
        paddingHorizontal: 20,
    },

    itemText: {
        fontSize: 14,
        color: '#111827',
    },
});
