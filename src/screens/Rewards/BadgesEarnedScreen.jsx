import React, { useCallback } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image,
    Pressable,
    Dimensions,
    StatusBar,
    ImageBackground,
} from 'react-native';
import { useFocusEffect, useNavigation } from '@react-navigation/native';
import { Fonts } from '../../constants/fonts';
import GiftScreenGradient from '../../constants/GiftScreenGradient';

const { width } = Dimensions.get('window');
const scale = width / 390;

export default function BadgesEarnedScreen() {
    const navigation = useNavigation();

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent(true);
        }, []),
    );

    return (
        <GiftScreenGradient>
            <View style={styles.container}>

                {/* Top Badge */}
                <View style={styles.topImage}>
                    <Image
                        source={require('../../assets/images/Checkmark_reward.png')}
                        style={styles.badgeImage}
                        resizeMode="contain"
                    />
                </View>

                {/* Title */}
                <View style={styles.textWrapper}>
                    <Text style={styles.title}>
                        You earned{'\n'}
                        <Text style={styles.bold}>3 new badges today!</Text>
                    </Text>
                </View>

                {/* Starter Card */}
                <View style={styles.card}>
                    <ImageBackground
                        source={require('../../assets/images/start_batch_bg_img.png')}
                        style={styles.cardBg}
                        imageStyle={styles.cardBgImage}
                        resizeMode="cover"
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>Starter</Text>
                            <Text style={styles.cardSubtitle}>
                                New achievement unlocked
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* Consistent Card */}
                <View style={styles.card}>
                    <ImageBackground
                        source={require('../../assets/images/arrow_bg_img.png')}
                        style={styles.cardBg}
                        imageStyle={styles.cardBgImage}
                        resizeMode="cover"
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>Consistent</Text>
                            <Text style={styles.cardSubtitle}>
                                New achievement unlocked
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* Communicator Card */}
                <View style={styles.card}>
                    <ImageBackground
                        source={require('../../assets/images/announce_bg_img.png')}
                        style={styles.cardBg}
                        imageStyle={styles.cardBgImage}
                        resizeMode="cover"
                    >
                        <View style={styles.textContainer}>
                            <Text style={styles.cardTitle}>Communicator</Text>
                            <Text style={styles.cardSubtitle}>
                                New achievement unlocked
                            </Text>
                        </View>
                    </ImageBackground>
                </View>

                {/* Button */}
                <Pressable
                    style={styles.button}
                    onPress={() => navigation.navigate('SpeakingInPracticeScreen')}
                >
                    <Text style={styles.buttonText}>Next</Text>
                </Pressable>

            </View>
        </GiftScreenGradient>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        paddingVertical: 24 * scale,
        paddingHorizontal: 16 * scale,
    },

    topImage: {
        width: 240 * scale,
        height: 240 * scale,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 68 * scale,
    },

    badgeImage: {
        width: '100%',
        height: '100%',
    },

    textWrapper: {
        width: '100%',
        alignItems: 'flex-start',
    },

    title: {
        fontSize: 32 * scale,
        lineHeight: 48 * scale,
        fontFamily: Fonts.Regular,
        marginVertical: 16 * scale,
    },

    bold: {
        fontSize: 32 * scale,
        lineHeight: 48 * scale,
        fontFamily: Fonts.Medium,
    },

    card: {
        // width: width - 16 * scale,
        // height: 72 * scale,
        // backgroundColor: '#fff',
        // borderRadius: 16 * scale,
        // overflow: 'hidden', // VERY IMPORTANT
        // marginBottom: 12 * scale,
    },
    cardBg: {
        width: width - 16 * scale,
        height: 72 * scale,
        backgroundColor: '#fff',
        borderRadius: 16 * scale,
        overflow: 'hidden',
        marginBottom: 12 * scale,
    },

    cardBgImage: {
        borderRadius: 16 * scale,
    },

    textContainer: {
        paddingHorizontal: 16 * scale
        ,
        paddingVertical: 12 * scale
    },

    cardTitle: {
        fontFamily: Fonts.Medium,
        fontSize: 18 * scale,
        lineHeight: 24 * scale,
        color: "#000"
    },

    cardSubtitle: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,
        color: '#2A2A2A',
        marginTop: 4 * scale,
        lineHeight: 20 * scale

    },

    button: {
        width: width - 16 * scale,
        height: 56 * scale,
        borderRadius: 48 * scale,
        backgroundColor: '#2F5BFF',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 54 * scale,
    },

    buttonText: {
        color: '#fff',
        fontSize: 16 * scale,
        fontWeight: '600',
    },
});
