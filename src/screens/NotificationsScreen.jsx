
// import React from 'react';
// import { View, Text, StyleSheet, FlatList, Dimensions, StatusBar } from 'react-native';
// import NotificationItem from '../components/NotificationItem';
// import { Fonts } from '../constants/fonts';

// const screenHeight = Dimensions.get("window").height;

// const NotificationsScreen = () => {

//   const data = [
//     { type: 'header', title: 'This week' },
//     ...[
//       { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '1 hour ago' },
//       { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '2 days ago' },
//       { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '1 hour ago' },
//       { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut', time: '2 days ago' },
//     ],
//     { type: 'header', title: 'Older' },
//     ...[
//       { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', time: '8 days ago' },
//       { description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.', time: '8 days ago' },
//     ],
//   ];

//   const renderItem = ({ item, index }) => {
//     if (item.type === 'header') {
//       return <Text style={styles.sectionTitle}>{item.title}</Text>;
//     }

//     const isLastInSection =
//       index === data.length - 1 || data[index + 1]?.type === 'header';

//     return (
//       <View>
//         <StatusBar barStyle="dark-content" backgroundColor="transparent"
//           translucent={true} />

//         <NotificationItem
//           item={item}
//           isLast={isLastInSection}
//         /></View>
//     );
//   };


//   return (
//     <FlatList
//       data={data}
//       keyExtractor={(_, index) => index.toString()}
//       renderItem={renderItem}
//       contentContainerStyle={styles.container}
//     />
//   );
// };

// export default NotificationsScreen;

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFF',
//     paddingHorizontal: 16,
//     paddingBottom: 16,
//     minHeight: screenHeight,
//     paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,

//   },
//   sectionTitle: {
//     fontSize: 18,
//     marginTop: 12,
//     lineHeight: 24,
//     fontFamily: Fonts.Medium,

//   },
// });




import React, { useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  Dimensions,
  StatusBar,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

import NotificationItem from '../components/NotificationItem';
import Header from '../components/Header';
import { Fonts } from '../constants/fonts';

import {
  getNotifications,
  getNotificationHistory,
} from '../services/notificationApi';
import { API_BASE } from '@env';

const screenHeight = Dimensions.get('window').height;

const NotificationsScreen = () => {
  const [notifications, setNotifications] = useState([]);
  const [page, setPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  /* ================= LOAD REDIS NOTIFICATIONS ================= */
  useFocusEffect(
    useCallback(() => {
      StatusBar.setBarStyle('dark-content');
      StatusBar.setBackgroundColor('transparent');
      StatusBar.setTranslucent(false);

      const loadNotifications = async () => {
        try {
          const list = await getNotifications(); // Redis (latest 20)
          setNotifications(list);
          setPage(1);
          list.length === 5
        } catch (err) {
          console.log('❌ Failed to load notifications', err.message);
        }
      };

      loadNotifications();
    }, [])
  );

  /* ================= LOAD OLDER FROM DB ================= */
  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    try {
      setLoadingMore(true);

      const older = await getNotificationHistory(page);

      if (older.length > 0) {
        setNotifications(prev => [...prev, ...older]);
        setPage(prev => prev + 1);
        setHasMore(older.length === 5);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.log('❌ Failed to load older notifications', err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  /* ================= MARK ALL AS READ (ONCE) ================= */
  useFocusEffect(
    useCallback(() => {
      const markAllRead = async () => {
        try {
          const token = await AsyncStorage.getItem("token");

          await axios.put(
            `${API_BASE}/notifications/mark-all-read`,
            {},
            { headers: { Authorization: `Bearer ${token}` } }
          );
        } catch (err) {
          console.log('❌ mark-all-read failed', err.message);
        }
      };

      markAllRead();
    }, [])
  );

  /* ================= RENDER ITEM ================= */
  const renderItem = ({ item }) => (
    <NotificationItem
      item={{
        description: item.body,
        time: new Date(item.createdAt).toLocaleString(),
      }}
    />
  );

  return (
    <View style={styles.container}>
      <Header title="Notification" />

      <FlatList
        data={notifications}
        keyExtractor={(item) => item._id}
        renderItem={renderItem}
        contentContainerStyle={{ paddingBottom: 20 }}
        onEndReached={loadMore}
        onEndReachedThreshold={0.5}
      />
    </View>
  );
};

export default NotificationsScreen;

/* ================= STYLES ================= */
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    minHeight: screenHeight,
  },
});
