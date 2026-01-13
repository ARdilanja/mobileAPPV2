
import React, { useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions, StatusBar } from 'react-native';
import NotificationItem from '../components/NotificationItem';
import { Fonts } from '../constants/fonts';
import Header from '../components/Header';
import { useFocusEffect } from '@react-navigation/native';

const screenHeight = Dimensions.get("window").height;

const NotificationsScreen = () => {

  const data = [
    { type: 'header', title: 'This week' },
    ...[
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '1 hour ago' },
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '2 days ago' },
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '1 hour ago' },
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '2 days ago' },
    ],
    { type: 'header', title: 'Older' },
    ...[
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', time: '8 days ago' },
      { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', time: '8 days ago' },
    ],
  ];

  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(false);
    }, []),
  );

  const renderItem = ({ item, index }) => {
    if (item.type === 'header') {
      return <Text style={styles.sectionTitle}>{item.title}</Text>;
    }

    const isLastInSection =
      index === data.length - 1 || data[index + 1]?.type === 'header';

    return (
      <View>
        <NotificationItem
          item={item}
          isLast={isLastInSection}
        /></View>
    );
  };


  return (
    <View>
      <Header title="Notification" />
      <FlatList
        data={data}
        keyExtractor={(_, index) => index.toString()}
        renderItem={renderItem}
        contentContainerStyle={styles.container}
      />
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    minHeight: screenHeight,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

  },
  sectionTitle: {
    fontSize: 18,
    marginTop: 12,
    lineHeight: 24,
    fontFamily: Fonts.Medium,

  },
});
