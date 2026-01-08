import React from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    Image,
    Dimensions,
} from 'react-native';
import { Fonts } from '../../constants/fonts';

const { width } = Dimensions.get('window');
const scale = width / 390;
const DAY_SIZE = Math.round(scale * 42);

/* SIMPLIFIED ICON LOGIC */
const getDayIcon = day => {
    if (day === 1) return require('../../assets/images/finish_task.png');
    if (day === 2 || day === 3)
        return require('../../assets/images/day_pending.png');
    return require('../../assets/images/snooze.png');
};

const DayCompleScrolComponent = ({ totalDays = 9 }) => {
    return (
        <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.row}
        >
            {Array.from({ length: totalDays }).map((_, index) => {
                const day = index + 1;
                const isCompleted = day === 1;

                return (
                    <View key={day} style={styles.dayWrapper}>
                        <View
                            style={[
                                styles.dayItem,
                                isCompleted && styles.completedDayBox,
                            ]}
                        >
                            <Image
                                source={getDayIcon(day)}
                                style={[
                                    styles.dayIcon,
                                    isCompleted && styles.completedIcon,
                                ]}
                            />

                            <Text
                                style={[
                                    styles.dayText,
                                    isCompleted && styles.completedDayText,
                                ]}
                            >
                                Day {day}
                            </Text>
                        </View>
                    </View>
                );
            })}
        </ScrollView>
    );
};

export default DayCompleScrolComponent;
const styles = StyleSheet.create({
    row: {
        marginTop: 8 * scale,
        flexDirection: 'row',
        alignItems: 'center',
    },

    dayWrapper: {
        alignItems: 'center',
        marginRight: 10 * scale,
    },

    dayItem: {
        width: DAY_SIZE,
        height: 48 * scale,
        borderRadius: 8 *scale,
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFFFFF', 
        borderRadius:4 *scale

    },

    completedDayBox: {
        backgroundColor: '#E7FDEA', 
        borderRadius:4 *scale

    },

    dayIcon: {
        width: DAY_SIZE * 0.38,
        height: DAY_SIZE * 0.38,
        resizeMode: 'contain',
    },

    completedIcon: {
        tintColor: '#2E7D32', 
    },

    dayText: {
        fontFamily: Fonts.Regular,
        fontSize: 14 * scale,
        lineHeight: 20 *scale,
        color: '#8E8E93',
    },

    completedDayText: {
        color: '#2E7D32',
        fontFamily: Fonts.Medium,
        fontSize: 14 * scale,
        lineHeight: 20 *scale,
    },
});
