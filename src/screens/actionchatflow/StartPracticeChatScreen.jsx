import React, { useState } from 'react';
import { ImageBackground, Dimensions, StyleSheet } from 'react-native';
import EmojiScreen from './EmojiScreen';
import ChatScreen from './ActionChatScreen';


const { width } = Dimensions.get('window');
const scale = width / 390;


export default function StartPracticeChatScreen() {
    const [screen, setScreen] = useState('emoji');


    return (
        <ImageBackground
            source={require('../../assets/images/Notes_bg.png')}
            style={styles.bg}
            resizeMode="cover"
        >
            {screen === 'emoji' ? (
                <EmojiScreen onComplete={() => setScreen('chat')} />
            ) : (
                <ChatScreen onBack={() => setScreen('emoji')} />
            )}
        </ImageBackground>
    );
}


const styles = StyleSheet.create({
    bg: { flex: 1 },
});