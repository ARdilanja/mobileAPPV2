import React from 'react';
import {
    View,
    Text,
    Modal,
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    Image,
} from 'react-native';
import { Fonts } from '../constants/fonts';
import CheckIcon from '../assets/images/Group.png'; // adjust path

const { width } = Dimensions.get('window');
const scale = width / 390;
export default function PhaseModal({
    visible,
    onClose,
    onSelect,
    selectedPhase,
    phases,
}) {
    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.modalOverlay}>
                <View style={styles.phaseModalBox}>
                    {phases.map((p, index) => {
                        const isSelected = selectedPhase?.key === p.key;

                        return (
                            <TouchableOpacity
                                key={p.key}
                                style={[
                                    styles.phaseItem,
                                    index !== phases.length - 1 && styles.itemDivider,
                                ]}
                                onPress={() => onSelect(p)}
                                activeOpacity={0.7}
                            >
                                {/* Left Text */}
                                <Text style={styles.phaseItemText}>{p.title}</Text>

                                {/* Right Check Image (only if selected) */}
                                {isSelected && (
                                    <Image
                                        source={CheckIcon}
                                        style={styles.checkImage}
                                        resizeMode="contain"
                                    />
                                )}
                            </TouchableOpacity>
                        );
                    })}
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalOverlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },

    phaseModalBox: {
        width: width - 32 * scale,
        backgroundColor: '#FFF',
        backgroundColor: '#FFF',
        borderRadius: 24 *scale,
        marginHorizontal: 16 * scale,
        paddingHorizontal: 16 * scale,
        paddingVertical:12*scale,
    },

    phaseItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: 16 * scale,
    },

    itemDivider: {
        borderBottomWidth: 1,
        borderBottomColor: '#EAEAEA',
    },

    phaseItemText: {
        fontSize: 18 * scale,
        color: '#000',
        flex: 1,
        lineHeight: 24 * scale,
        fontFamily: Fonts.Regular,
    },

    checkImage: {
        width: 24 * scale,
        height: 24 * scale,
    },
});
