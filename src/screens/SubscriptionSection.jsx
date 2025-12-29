import React from 'react';
import { View, Text, StyleSheet, ScrollView, Linking, StatusBar } from 'react-native';
import { subscriptionContent } from '../content/subscriptionContent';
import { Fonts } from '../constants/fonts';

const SubscriptionAgreementScreen = () => {
    return (
        <View style={styles.container}>
            <StatusBar barStyle="dark-content" backgroundColor="transparent"
                translucent={true} />
            <ScrollView
                contentContainerStyle={styles.content}
                showsVerticalScrollIndicator={false}
            >
                <Text style={styles.heading}>Subscription Agreement</Text>

                {subscriptionContent.map(item => {
                    if (item.type === 'paragraph') {
                        return (
                            <Text key={item.id} style={styles.paragraph}>
                                {item.text}
                            </Text>
                        );
                    }

                    if (item.type === 'section') {
                        return (
                            <SubscriptionSection
                                key={item.id}
                                title={item.title}
                                description={item.description}
                                items={item.items}
                            />
                        );
                    }

                    if (item.type === 'glossary') {
                        return (
                            <GlossarySection
                                key={item.id}
                                title={item.title}
                                items={item.items}
                            />
                        );
                    }
                    return null;
                })}
            </ScrollView>
        </View>
    );
};

export default SubscriptionAgreementScreen;
const SubscriptionSection = ({ title, description, items }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>
            {description && (
                <Text style={styles.sectionDescription}>{description}</Text>
            )}

            {items.map(item => (
                <Text key={item.index} style={styles.text}>
                    <Text style={styles.indexInline}>{item.index} </Text>
                    {item.bold && <Text style={styles.bold}>{item.bold} </Text>}
                    {item.text}
                </Text>
            ))}
        </View>
    );
};

const GlossarySection = ({ title, items }) => {
    return (
        <View style={styles.section}>
            <Text style={styles.sectionTitle}>{title}</Text>

            {items.map(item => (
                <View key={item.term} style={styles.glossaryItem}>
                    <Text style={styles.glossaryText}>
                        <Text style={styles.glossaryTerm}>{item.term} </Text>
                        {item.definition}
                        {item.link && (
                            <Text
                                style={styles.link}
                                onPress={() => Linking.openURL(item.link.url)}
                            >
                                {item.link.text}
                            </Text>
                        )}
                    </Text>
                </View>
            ))}
        </View>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

    },
    content: {
        padding: 20,
        paddingBottom: 40,
    },
    heading: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        marginBottom: 16,
        color: '#000',
    },
    paragraph: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: Fonts.Regular,
        textAlign: 'justify',
        color: '#555',
    },
    section: {
        marginTop: 20,
    },
    sectionTitle: {
        fontSize: 18,
        fontFamily: Fonts.Medium,
        marginBottom: 10,
        color: '#000',
    },
    sectionDescription: {
        fontSize: 14,
        color: '#555',
        fontFamily: Fonts.Regular,
        marginBottom: 10,
    },

    bold: {
        color: '#000',
        fontFamily: Fonts.Medium,
    },
    indexInline: {
        fontSize: 14,
        fontWeight: '600',
        color: '#000', fontFamily: Fonts.Regular,

    },
    text: {
        fontSize: 14,
        lineHeight: 22,
        color: '#444',
        marginBottom: 12,
        textAlign: 'justify',
        marginLeft: 5, fontFamily: Fonts.Regular,

    },

    glossaryItem: {
        textAlign: 'justify',
        marginBottom: 9,
    },

    glossaryTerm: {
        fontSize: 14,
        fontWeight: '500',
        color: '#000',
        fontFamily: Fonts.Regular,
    },
    link: {
        color: '#1a73e8',
        fontFamily: Fonts.Regular,
        textDecorationLine: 'underline',
    },
    glossaryText: {
        fontSize: 14,
        lineHeight: 22,
        fontFamily: Fonts.Regular,
        color: '#444',
        textAlign: 'justify',

    },

});
