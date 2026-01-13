import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Image,
} from 'react-native';
import { Fonts } from '../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;

const PopupCard = ({
    title,
    description,
    imageSource,
    primaryButtonText,
    secondaryButtonText,
    onPrimaryPress,
    onSecondaryPress,
    cardHeight = 420,
}) => {
    return (
        <View style={styles.overlay}>
            <View style={[styles.card, { height: cardHeight * scale }]}>

                {/* 🔝 IMAGE SECTION */}
                <View style={styles.imageSection}>
                    <Image
                        source={imageSource}
                        style={styles.image}
                        resizeMode="contain"
                    />
                </View>

                {/* 🔽 BOTTOM SECTION */}
                <View style={styles.bottomSection}>
                    <View style={styles.content}>
                        <Text style={styles.title}>{title}</Text>
                        <Text style={styles.description}>{description}</Text>
                    </View>

                    <View style={styles.buttonContainer}>
                        {secondaryButtonText && (
                            <TouchableOpacity
                                style={styles.secondaryButton}
                                onPress={onSecondaryPress}
                                activeOpacity={0.8}
                            >
                                <Text style={styles.secondaryButtonText}>
                                    {secondaryButtonText}
                                </Text>
                            </TouchableOpacity>
                        )}

                        <TouchableOpacity
                            style={styles.primaryButton}
                            onPress={onPrimaryPress}
                            activeOpacity={0.8}
                        >
                            <Text style={styles.primaryButtonText}>
                                {primaryButtonText}
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
};

export default PopupCard;
const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    card: {
        width: width * 0.9 > 340 * scale ? 340 * scale : width * 0.9,
        borderRadius: 16 * scale,
        backgroundColor: '#fff',
        overflow: 'hidden',
    },

    /* IMAGE SECTION */
    imageSection: {
        width: '100%',
        height: 160 * scale,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: "#D9D9D9"
    },

    image: {
        width: '100%',
        height: '100%',
    },
    bottomSection: {
        flex: 1,
        justifyContent: 'space-between',
        paddingBottom: 24 * scale,
        paddingTop: 16 * scale,
    },

    content: {
        paddingHorizontal: 20 * scale,
        gap: 12 * scale,
    },

    title: {
        fontSize: 18 * scale,
        fontFamily: Fonts.Medium, color: '#000', marginBottom: 12 * scale
    },

    description: {
        fontSize: 18 * scale,
        color: '#000',
        lineHeight: 24 * scale,
        fontFamily: Fonts.Regular,
    },

    buttonContainer: {
        paddingHorizontal: 20 * scale,
        gap: 12 * scale,
    },

    primaryButton: {
        height: 48 * scale,
        borderRadius: 24 * scale,
        backgroundColor: '#235DFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    primaryButtonText: {
        color: '#fff',
         fontSize: 18 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 24 * scale
    },

    secondaryButton: {
        height: 48 * scale,
        borderRadius: 24 * scale,
        borderWidth: 1,
        borderColor: '#2D5BFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    secondaryButtonText: {
        color: '#000',
        fontSize: 18 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 24 * scale
    },
});
