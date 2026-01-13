import React, { useState } from 'react';
import { View, StyleSheet, ScrollView, Pressable, Text } from 'react-native';
import PopupCard from '../components/PopupCard';

const PopupDummyScreen = () => {
    const [activePopup, setActivePopup] = useState(null);

    return (
        <View style={styles.container}>
            {/* 🔘 Buttons */}
            <View style={styles.buttonGroup}>
                <Pressable
                    style={styles.triggerBtn}
                    onPress={() => setActivePopup('trial')}
                >
                    <Text style={styles.triggerBtnText}>Show Trial Ended</Text>
                </Pressable>

                <Pressable
                    style={styles.triggerBtn}
                    onPress={() => setActivePopup('plan')}
                >
                    <Text style={styles.triggerBtnText}>Show 90-Day Plan</Text>
                </Pressable>

                <Pressable
                    style={styles.triggerBtn}
                    onPress={() => setActivePopup('welcome')}
                >
                    <Text style={styles.triggerBtnText}>Show Welcome Back</Text>
                </Pressable>
            </View>

            {/* 📦 Popup Area */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {activePopup === 'trial' && (
                    <PopupCard
                        title="Your trial has ended!"
                        // imageSource={require('../assets/images/boy_img_signup.png')}
                        description="To keep practicing and unlock all scenarios, upgrade now and continue your growth journey!"
                        primaryButtonText="Upgrade Now"
                        onPrimaryPress={() => setActivePopup(null)}
                    />
                )}

                {activePopup === 'plan' && (
                    <PopupCard
                        title="Your 90-Day Plan Period Has Ended"
                        // imageSource={require('../assets/images/boy_img_signup.png')}

                        description="You missed some sessions, but you can start a new plan or continue practicing."
                        secondaryButtonText="Extra Practice"
                        primaryButtonText="Start a New 90-Day Plan"
                        cardHeight={444}
                        onPrimaryPress={() => setActivePopup(null)}
                        onSecondaryPress={() => setActivePopup(null)}
                    />
                )}

                {activePopup === 'welcome' && (
                    <PopupCard
                        title="Welcome back"
                        // imageSource={require('../assets/images/boy_img_signup.png')}

                        description="Life happens. Let’s pick up from where you left off."
                        secondaryButtonText="View plan"
                        primaryButtonText="Resume today’s session"
                        onPrimaryPress={() => setActivePopup(null)}
                        onSecondaryPress={() => setActivePopup(null)}
                    />
                )}
            </ScrollView>
        </View>
    );
};

export default PopupDummyScreen;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E6E6E6',
        marginTop: 40
    },

    buttonGroup: {
        paddingVertical: 20,
        display: 'flex',
        gap: 12,
        alignItems: 'center',
    },

    triggerBtn: {
        height: 44,
        width: '80%',
        borderRadius: 8,
        backgroundColor: '#4A2AC9',
        justifyContent: 'center',
        alignItems: 'center',
    },

    triggerBtnText: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '600',
    },

    scrollContent: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 24,
    },
});
