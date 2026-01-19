import React, { useCallback, useRef, useState } from 'react';

import { useFocusEffect } from '@react-navigation/native';

import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    ScrollView,
    Pressable,
    Modal,
    StatusBar,
    Image,
} from 'react-native';
import { Fonts } from '../constants/fonts';
import ReminderModal from '../components/ReminderModal'
import PhaseModal from '../components/PhaseModal'
import planData from '../content/plan30.json'
const { width } = Dimensions.get('window');
const scale = width / 390;

const H_PADDING = 16 * 2;
const GAP = 12;

const SMALL_CARD_WIDTH = (width - H_PADDING - GAP) / 2;
const LARGE_CARD_WIDTH = width - H_PADDING;
const WEEK_TAB_WIDTH = 40 * scale;
const WEEK_TAB_MARGIN = 16 * scale;

const TOTAL_TAB_WIDTH = WEEK_TAB_WIDTH + WEEK_TAB_MARGIN * 2;
const ACTIVE_BAR_WIDTH = TOTAL_TAB_WIDTH;
const STATUS_STYLES = {
    completed: {
        bg: '#E6F9EE',
        text: '#1E9E62',
        line: '#1E9E62',
        strike: false,
    },
    active: {
        bg: '#E9F0FF',
        text: '#235DFF',
        line: '#235DFF',
        strike: false,
    },
    missed: {
        bg: '#F0F0F0',
        text: '#8B8B8B',
        line: '#8B8B8B',
        strike: true,
    },
};

const UPCOMING_COLORS = [
    { bg: '#FFF1E6', text: '#D2691E' },
    { bg: '#E8F8F5', text: '#0E6251' },
    { bg: '#FDEDEC', text: '#C0392B' },
    { bg: '#F4ECF7', text: '#7D3C98' },
    { bg: '#EBF5FB', text: '#2471A3' },
];

const getUpcomingColor = day => {
    const index = day % UPCOMING_COLORS.length;
    return UPCOMING_COLORS[index];
};


const PHASES = [
    { key: 'phase1', title: 'PHASE 1- Foundations (Days 1 - 30)' },
    { key: 'phase2', title: 'PHASE 2- Real-World Application (Days 31 - 60)' },
    { key: 'phase3', title: 'PHASE 3- High-Stakes Readiness (Days 61 - 90)' },
];

export default function NinetyDayPlanScreen() {
    const scrollRef = useRef(null);
    const [scrollX, setScrollX] = useState(0);
    const [showReminderSuccess, setShowReminderSuccess] = useState(false);

    useFocusEffect(
        useCallback(() => {
            StatusBar.setBarStyle('dark-content');
            StatusBar.setBackgroundColor('transparent');
            StatusBar.setTranslucent(true);
        }, []),
    );

    const [selectedWeek, setSelectedWeek] = useState(1);
    const [phase, setPhase] = useState(PHASES[0]);
    const [showPhaseModal, setShowPhaseModal] = useState(false);
    const [showReminder, setShowReminder] = useState(false);
    const WEEK_TAB_WIDTH = 40 * scale;
    const WEEK_TAB_MARGIN = 16 * scale;

    const TOTAL_TAB_WIDTH = WEEK_TAB_WIDTH + WEEK_TAB_MARGIN * 2;
    const ACTIVE_BAR_WIDTH = 60;


    const days = planData.days.map(d => {
        const dateObj = new Date(d.date);
        return {
            id: d.dayNumber,
            day: d.dayNumber,
            title: d.title,
            status: d.status,
            date: dateObj.toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
            }),
            label: dateObj.toLocaleDateString('en-US', { weekday: 'long' }),
        };
    });
    const getWeekDays = (allDays, week) => {
        const start = (week - 1) * 7;
        const end = start + 7;
        return allDays.slice(start, end);
    };

    const visibleDays = getWeekDays(days, selectedWeek);
    return (
        <View style={styles.container}>
            <Text style={styles.headerTitle}>Your 90-day plan</Text>

            {/* ================= WEEK TABS ================= */}
            <View style={styles.weekTabsWrapper}>
                <ScrollView
                    ref={scrollRef}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.weekTabs}
                    scrollEventThrottle={16}
                    onScroll={e => {
                        setScrollX(e.nativeEvent.contentOffset.x);
                    }}
                >
                    {Array.from({ length: 7 }).map((_, index) => {
                        const week = index + 1;
                        return (
                            <Pressable
                                key={week}
                                onPress={() => setSelectedWeek(week)}
                                style={[styles.weekTab, { width: WEEK_TAB_WIDTH }]}
                            >
                                <Text
                                    style={[
                                        styles.weekLabel,
                                        selectedWeek === week && styles.weekTabTextActive,
                                    ]}
                                >
                                    Week
                                </Text>
                                <Text
                                    style={[
                                        styles.weekNumber,
                                        selectedWeek === week && styles.weekTabTextActive,
                                    ]}
                                >
                                    {week}
                                </Text>
                            </Pressable>
                        );
                    })}
                </ScrollView>

                {/* Bottom Divider */}
                <View style={styles.weekBottomBar} />

                {/* Active Indicator */}
                <View
                    style={[
                        styles.activeIndicator,
                        {
                            width: ACTIVE_BAR_WIDTH,
                            left: (selectedWeek - 1) * TOTAL_TAB_WIDTH - scrollX,
                        },
                    ]}
                />
            </View>

            <Pressable
                style={styles.phaseRow}
                onPress={() => setShowPhaseModal(true)}
            >
                <Text style={styles.phaseText}>{phase.title}</Text>

                <Image
                    source={require('../assets/images/angle-small.png')}
                    style={styles.phaseArrowImage}
                    resizeMode="contain"
                />
            </Pressable>

            <View style={styles.verticalTimeline} />

            {/* ================= DAYS ================= */}
            <ScrollView contentContainerStyle={styles.dayList} scrollEnabled={false}>
                {visibleDays.map(item => (
                    <DayCard key={item.day} data={item} />
                ))}
            </ScrollView>

            <Pressable
                style={styles.setReminderBtn}
                onPress={() => setShowReminder(true)}
            >
                <Text style={styles.reminderButtonText}>Set reminder</Text>
            </Pressable>

            <PhaseModal
                visible={showPhaseModal}
                phases={PHASES}
                selectedPhase={phase}
                onClose={() => setShowPhaseModal(false)}
                onSelect={p => {
                    setPhase(p);
                    setShowPhaseModal(false);
                }}
            />
            <ReminderModal
                visible={showReminder}
                onClose={() => setShowReminder(false)}
                onSuccess={() => setShowReminderSuccess(true)}
            />

            <ReminderSuccessModal
                visible={showReminderSuccess}
                onClose={() => setShowReminderSuccess(false)}
            />
        </View>
    );
}

// function DayCard({ data }) {
//     const isCompleted = data.status === 'completed';
//     const isSkipped = data.status === 'skipped';

//     const dayColors = DAY_COLOR_MAP[data.day];
//     const bgColor = isSkipped ? SKIPPED_STYLE.bg : dayColors.bg;
//     const textColor = isSkipped ? SKIPPED_STYLE.text : dayColors.text;

//     return (
//         <View style={styles.dayRow}>
//             {/* Date column */}
//             <View style={styles.dateColumn}>
//                 <Text style={styles.dateText}>{data.date}</Text>
//                 <Text style={styles.dayLabel}>{data.label}</Text>
//             </View>

//             {/* Timeline + Card */}
//             <View style={styles.timelineWrapper}>
//                 <View style={[styles.card, { backgroundColor: bgColor }]}>
//                     <View
//                         style={[styles.verticalAccent, { backgroundColor: textColor }]}
//                     />

//                     <View style={styles.cardContent}>
//                         <View style={styles.cardHeader}>
//                             <Text
//                                 style={[
//                                     styles.dayTitle,
//                                     { color: textColor },
//                                     isSkipped && styles.strikeText,
//                                 ]}
//                             >
//                                 Day {data.day}
//                             </Text>

//                             {isCompleted && (
//                                 <Text style={[styles.completedText, { color: textColor }]}>
//                                     Completed
//                                 </Text>
//                             )}
//                         </View>

//                         <Text
//                             style={[
//                                 styles.taskText,
//                                 isSkipped && styles.strikeText,
//                                 { color: isSkipped ? SKIPPED_STYLE.text : '#000' },
//                             ]}
//                         >
//                             {data.title}
//                         </Text>
//                     </View>
//                 </View>

//                 {data.day !== 7 && <View style={styles.horizontalLine} />}
//             </View>
//         </View>
//     );
// }

function DayCard({ data }) {
    const isUpcoming = data.status === 'upcoming';

    const statusStyle = isUpcoming
        ? getUpcomingColor(data.day)
        : STATUS_STYLES[data.status];

    const bgColor = statusStyle.bg;
    const textColor = statusStyle.text;
    const lineColor = statusStyle.line || statusStyle.text;
    const isStrike = statusStyle.strike;

    return (
        <View style={styles.dayRow}>
            {/* Date column */}
            <View style={styles.dateColumn}>
                <Text style={styles.dateText}>{data.date}</Text>
                <Text style={styles.dayLabel}>{data.label}</Text>
            </View>

            <View style={styles.timelineWrapper}>
                <View style={[styles.card, { backgroundColor: bgColor }]}>
                    <View
                        style={[styles.verticalAccent, { backgroundColor: lineColor }]}
                    />

                    <View style={styles.cardContent}>
                        <View style={styles.cardHeader}>
                            <Text
                                style={[
                                    styles.dayTitle,
                                    { color: textColor },
                                    isStrike && styles.strikeText,
                                ]}
                            >
                                Day {data.day}
                            </Text>

                            {data.status === 'completed' && (
                                <Text style={[styles.completedText, { color: textColor }]}>
                                    Completed
                                </Text>
                            )}
                            {data.status === 'missed' && (
                                <Text style={[styles.completedText, { color: textColor }]}>
                                    Missed
                                </Text>
                            )}
                            {data.status === 'active' && (
                                <Text style={[styles.completedText, { color: textColor }]}>
                                    Active
                                </Text>
                            )}
                        </View>

                        <Text
                            style={[
                                styles.taskText,
                                { color: isStrike ? '#8B8B8B' : '#000' },
                                isStrike && styles.strikeText,
                            ]}
                        >
                            {data.title}
                        </Text>
                    </View>
                </View>

                {data.day !== 30 && (
                    <View style={[styles.horizontalLine, { backgroundColor: lineColor }]} />
                )}
            </View>
        </View>
    );
}

function ReminderSuccessModal({ visible, onClose }) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.successOverlay}>
                <View style={styles.successContainer}>
                    <Text style={styles.successTitle}>
                        Reminder set successfully!
                    </Text>

                    {/* Circle Tick */}
                    <View style={styles.successCircle}>
                        <Image
                            source={require('../assets/images/mic-cam-check.png')}
                            style={styles.successTick}
                        />
                    </View>

                    <Pressable style={styles.successBtn} onPress={onClose}>
                        <Text style={styles.successBtnText}>Go to dashboard</Text>
                    </Pressable>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 16 * scale,
        paddingVertical: 50 * scale,
        backgroundColor: '#FFF',
    },

    headerTitle: {
        fontSize: 18 * scale,
        textAlign: 'center',
        fontFamily: Fonts.Medium,
    },

    weekTabsWrapper: {
        marginTop: 24 * scale,
        position: 'relative',
    },

    weekTabs: {
        flexDirection: 'row',
        paddingBottom: 12 * scale,
    },

    weekTab: {
        alignItems: 'center',
        width: WEEK_TAB_WIDTH,
        marginHorizontal: WEEK_TAB_MARGIN,
    },

    weekLabel: {
        fontSize: 14 * scale,
        color: '#2A2A2A',
        fontFamily: Fonts.Medium,
    },

    weekNumber: {
        fontSize: 14 * scale,
        color: '#2A2A2A',
        fontFamily: Fonts.Medium,
    },

    weekTabTextActive: {
        color: 'rgba(35, 93, 255, 1)',
    },

    weekBottomBar: {
        height: 2,
        backgroundColor: 'rgba(0,0,0,0.15)',
        borderRadius: 5 * scale,
    },
    activeIndicator: {
        position: 'absolute',
        bottom: 0,
        height: 2,
        backgroundColor: 'rgba(35, 93, 255, 1)',
        marginHorizontal: 5 * scale,
        borderRadius: 5 * scale,
    },

    phaseRow: {
        flexDirection: 'row',
        justifyContent: "space-around",
        alignItems: 'center',
        paddingVertical: 12 * scale,
        // marginTop:16*scale,
        // marginVertical: 16 * scale,
    },

    phaseText: {
        fontSize: 18 * scale,
        lineHeight: 24 * scale,
        fontFamily: Fonts.Medium,
    },

    phaseArrowImage: {
        width: 24,
        height: 24,
        opacity: 1,

    },
    verticalTimeline: {
        position: 'absolute',
        top: 200 * scale,
        bottom: 81 * scale,
        left: 96 * scale,
        width: 2 * scale,
        backgroundColor: '#D9D9D9',
    },
    timelineWrapper: {
        flex: 1,
        position: 'relative',
        justifyContent: 'center',
    },

    horizontalLine: {
        height: 2 * scale,
        backgroundColor: '#D9D9D9',
        marginTop: 3 * scale,
        marginLeft: -20 * scale,
    },

    dayList: {
        gap: 4 * scale,
        paddingRight: 7 * scale,
    },

    dayRow: {
        flexDirection: 'row',
        gap: 8,
    },

    dateColumn: {
        width: 80 * scale,
        display: 'flex',
        justifyContent: 'center',
    },

    dateText: {
        fontSize: 12 * scale, fontFamily: Fonts.Regular,
        lineHeight: 16 * scale, color: '#2A2A2A',
    },
    dayLabel: { fontSize: 12,fontFamily: Fonts.Regular,
        lineHeight: 16 * scale, color: '#2A2A2A', marginTop: 8 },

    card: {
        // width: 270 * scale, 
        height: 72 * scale,
        flexDirection: 'row',
        paddingVertical: 12 * scale,
        // paddingLeft: 2 * scale,
        borderRadius: 12,
        backgroundColor: '#EEF3FF',
        gap: 12,
    },

    completedCard: { backgroundColor: '#FFF2D9' },
    skippedCard: { backgroundColor: '#EFEFEF' },

    cardContent: { flex: 1, gap: 4 },
    verticalAccent: {
        width: 4 * scale,
        height: 48 * scale,
        borderRadius: 8,
        backgroundColor: '#E26A00',
        marginTop: 4 * scale,
    },

    cardHeader: { flexDirection: 'row', justifyContent: 'space-between' },

    strikeText: { textDecorationLine: 'line-through', color: '#999' },
    dayTitle: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 20 * scale,
        color: '#E26A00',
    },
    completedText: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 20 * scale,
        color: '#E26A00',
        paddingRight: 12 * scale,
    },
    taskText: {
        fontSize: 14 * scale,
        fontFamily: Fonts.Regular,
        lineHeight: 20 * scale,
        color: '#000',
    },
    reminderTick: {
        width: 24,
        height: 24,
        borderRadius: 12,
        borderWidth: 2,
        borderColor: '#1E5BFF',
        alignItems: 'center',
        justifyContent: 'center',
    },

    reminderTickText: { color: '#1E5BFF', fontWeight: '600' },

    reminderButton: {
        backgroundColor: '#1E5BFF',
        borderRadius: 24,
        paddingVertical: 14,
        alignItems: 'center',
        marginVertical: 16,
    },

    reminderButtonText: { color: '#FFF', fontWeight: '600' },

    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.3)',
        justifyContent: 'center',
        padding: 16,
    },

    phaseItem: { paddingVertical: 12 },
    phaseItemText: {
        fontSize: 18 * scale,
        fontFamily: Fonts.Medium,
        lineHeight: 24 * scale,
    },

    reminderOverlay: { flex: 1, justifyContent: 'flex-end' },
    reminderSheet: {
        width: 390 * scale,
        height: 484 * scale,
        backgroundColor: '#FFF',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        padding: 20,
    },

    reminderTitle: { fontSize: 16, fontWeight: '600', textAlign: 'center' },
    reminderDesc: { fontSize: 13, textAlign: 'center', color: '#666' },
    successOverlay: {
        flex: 1,
        backgroundColor: '#FFF',
    },

    successContainer: {
        flex: 1,
        alignItems: 'center',
        paddingTop: 80 * scale,
    },

    successTitle: {
        fontSize: 28 * scale,
        fontFamily: Fonts.Medium,
        textAlign: 'left',
        width: '100%',
        paddingHorizontal: 16 * scale,
    },

    successCircle: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'top',
        marginTop: 94 * scale,
    },

    successTick: {
        width: 280 * scale,
        height: 280 * scale,
    },

    successBtn: {
        position: 'absolute',
        bottom: 40 * scale,
        width: 358 * scale,
        height: 56 * scale,
        backgroundColor: 'rgba(35,93,255,1)',
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },

    successBtnText: {
        color: '#FFF',
        fontSize: 16 * scale,
        fontFamily: Fonts.Medium,
    },
    setReminderBtn: {
        position: 'absolute',
        bottom: 16 * scale,
        left: 16 * scale,
        width: 358 * scale,
        height: 56 * scale,
        backgroundColor: 'rgba(35, 93, 255, 1)',
        borderRadius: 48,
        alignItems: 'center',
        justifyContent: 'center',
    },
    timerHandle: {
        width: 180 * scale,
        height: 8 * scale,
        backgroundColor: 'rgba(217, 217, 217, 1)',
        borderRadius: 24,
        alignSelf: 'center',
        marginBottom: 16 * scale,
    },
});
