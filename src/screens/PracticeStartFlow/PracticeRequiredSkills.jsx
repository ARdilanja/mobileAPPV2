import React, { useEffect, useState } from 'react';
import {
    View,
    Text,
    TextInput,
    StyleSheet,
    TouchableOpacity,
    Dimensions,
    Image,
    StatusBar,
} from 'react-native';
import PracticeTitle from './PracticeTitle';
import { Fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';
import Header from '../../components/Header';

const screenWidth = Dimensions.get('window').width;
const scale = screenWidth / 390;

const suggestedSkills = [
    'java', 'php', 'c++', 'css', 'html', 'javascript', 'python', 'react',
    'nodejs', 'express', 'mongodb', 'sql', 'typescript', 'angular', 'vue',
    'docker', 'kubernetes', 'aws', 'git', 'sass', 'less', 'ruby', 'rails',
    'go', 'swift', 'flutter', 'dart', 'c#', 'unity', 'firebase', 'graphql',
    'rest', 'linux', 'bash', 'html5', 'css3', 'reactnative', 'nextjs', 'nestjs',
    'redux', 'mobx', 'webpack', 'babel', 'jest', 'cypress', 'selenium', 'jira', 'figma', 'photoshop'
];

const PracticeRequiredSkills = () => {
    const navigation = useNavigation();

    const [skills, setSkills] = useState([]);
    const [skillInput, setSkillInput] = useState('');
    const [visibleChips, setVisibleChips] = useState([]);

    const isEnabled = skills.length === 5;

    // Initialize visibleChips with first 5 skills not selected
    useEffect(() => {
        setVisibleChips(suggestedSkills.slice(0, 5));
    }, []);

    const handleChipPress = (skill) => {
        if (skills.includes(skill)) return;
        if (skills.length >= 5) return;

        const updatedSkills = [...skills, skill];
        setSkills(updatedSkills);
        setSkillInput(updatedSkills.join(', '));

        // Remove selected skill from visibleChips
        const newVisibleChips = visibleChips.filter(s => s !== skill);

        // Find next skill from suggestedSkills that's not selected and not visible
        const remainingSkills = suggestedSkills.filter(s => !updatedSkills.includes(s) && !newVisibleChips.includes(s));

        if (remainingSkills.length > 0) {
            newVisibleChips.push(remainingSkills[0]); // add the next skill
        }

        setVisibleChips(newVisibleChips);
    };

    const handleInputChange = (text) => {
        setSkillInput(text);

        const parsedSkills = text
            .split(',')
            .map(s => s.trim().toLowerCase())
            .filter(Boolean);

        const uniqueSkills = [...new Set(parsedSkills)].slice(0, 5);

        setSkills(uniqueSkills);
    };

    const handleSubmit = () => {
        console.log('Selected & Entered Skills:', skills);
        navigation.navigate('PracticeExpScreen');
    };

    return (
        <View style={styles.container}>
             {/* <StatusBar
                barStyle="dark-content" 
              /> */}
                <Header title="Practice interviews" showNotification={true}/>

            {/* Top Spacer */}
            <View style={{ flex: 1 }} />

            {/* Center Title */}
            <PracticeTitle
                title="The JD doesn’t list the needed skills. Choose the skills needed for this role."
            />
            <View style={{ flex: 1 }} />
            <View style={styles.chipsContainer}>
                <View style={styles.chipsWrapper}>
                    {visibleChips.map(skill => {
                        const selected = skills.includes(skill);
                        return (
                            <TouchableOpacity
                                key={skill}
                                onPress={() => handleChipPress(skill)}
                                style={[
                                    styles.chip,
                                    selected && styles.chipSelected,
                                ]}
                            >
                                <Text
                                    style={[
                                        styles.chipText,
                                        selected && styles.chipTextSelected,
                                    ]}
                                >
                                    {skill}
                                </Text>
                            </TouchableOpacity>
                        );
                    })}
                </View>

            </View>



            {/* Bottom Section */}
            <View style={styles.bottomWrapper}>

                {/* Input Card */}
                <View style={styles.chatCard}>
                    <TextInput
                        placeholder="For example java, html, c++"
                        value={skillInput}
                        onChangeText={handleInputChange}
                        style={styles.chatInput}
                        placeholderTextColor="#2A2A2A"
                    />

                    <View style={styles.divider} />

                    <View style={styles.chatActions}>
                        <TouchableOpacity>
                            <Image
                                source={require('../../assets/icons/circle-microphone.png')}
                                style={styles.chatIcon}
                            />
                        </TouchableOpacity>

                        <TouchableOpacity disabled={!isEnabled}
                            onPress={handleSubmit}>
                            <Image
                                source={
                                    isEnabled
                                        ? require('../../assets/icons/arrow-circle-up-active.png')
                                        : require('../../assets/icons/arrow-circle-up.png')
                                }
                                style={styles.chatIcon}
                            />
                        </TouchableOpacity>
                    </View>
                </View>

            </View>
        </View>
    );
};

export default PracticeRequiredSkills;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F9FAFB',
    },
    chipsContainer: {
        paddingHorizontal: 16,
        marginBottom: 16, // 👈 exact gap above bottom wrapper
    },
    chipsWrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        gap: 12,
    },

    chip: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 24,
        paddingHorizontal: 16,
        paddingVertical: 8,
    },

    chipText: {
        fontSize: 18 * scale,
        lineHeight: 28 * scale,
        fontFamily: Fonts.Regular,
        color: '#2A2A2A',
    },

    bottomWrapper: {
        paddingHorizontal: 16,
        backgroundColor: '#fff',
        paddingBottom: 18,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingTop: 16,
    },
    chipSelected: {
        backgroundColor: '#235DFF',
        borderColor: '#235DFF',
    },

    chipTextSelected: {
        color: '#FFFFFF',
    },
    chatCard: {
        borderWidth: 1,
        borderColor: '#D9D9D9',
        borderRadius: 12,
        paddingHorizontal: 16,
        paddingBottom: 16,
        paddingTop: 10,
        backgroundColor: '#fff',
    },

    chatInput: {
        fontSize: 18 * scale,
        lineHeight: 28 * scale,
        fontFamily: Fonts.Regular,
        color: '#2A2A2A',
        paddingBottom: 12,
    },

    divider: {
        height: 1,
        backgroundColor: '#D9D9D9',
        marginBottom: 12,
    },

    chatActions: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
    },

    chatIcon: {
        width: 28,
        height: 28,
        marginLeft: 12,
    },
});
