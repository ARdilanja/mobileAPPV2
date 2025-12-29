// import React from 'react';
// import { View, Text, StyleSheet, FlatList } from 'react-native';
// import NotificationItem from '../components/NotificationItem';

// const NotificationsScreen = () => {

//     const notifications = {
//   thisWeek: [
//     {
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//       time: '1 hour ago',
//     },
//     {
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//       time: '2 days ago',
//     },
//     {
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//       time: '1 hour ago',
//     },
//     {
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut',
//       time: '2 days ago',
//     },
//   ],
//   older: [
//     {
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       time: '8 days ago',
//     },
//      {
//       description:
//         'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
//       time: '8 days ago',
//     },
//   ],
// };

//   const renderItem = ({ item }) => (
//     <NotificationItem
//       title={item.title}
//       description={item.description}
//       time={item.time}
//     />
//   );

//   return (
//     <View style={styles.container}>
//       {/* This Week */}
//       <Text style={styles.sectionTitle}>This week</Text>
//       <FlatList
//         data={notifications.thisWeek}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         scrollEnabled={false}
//       />

//       {/* Older */}
//       <Text style={styles.sectionTitle}>Older</Text>
//       <FlatList
//         data={notifications.older}
//         keyExtractor={(item) => item.id}
//         renderItem={renderItem}
//         scrollEnabled={false}
//       />
//     </View>
//   );
// };

// export default NotificationsScreen;

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#FFF',
//     paddingHorizontal: 16,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: '500',
//     marginTop: 16,
//     lineHeight:24
//   },
// });
import React from 'react';
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native';
import NotificationItem from '../components/NotificationItem';

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

 const renderItem = ({ item, index }) => {
  if (item.type === 'header') {
    return <Text style={styles.sectionTitle}>{item.title}</Text>;
  }

  const isLastInSection =
    index === data.length - 1 || data[index + 1]?.type === 'header';

  return (
    <NotificationItem
      item={item}
      isLast={isLastInSection}
    />
  );
};


  return (
    <FlatList
      data={data}
      keyExtractor={(_, index) => index.toString()}
      renderItem={renderItem}
      contentContainerStyle={styles.container}
    />
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    paddingHorizontal: 16,
    paddingBottom: 16,
    height:screenHeight,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginTop:12,
    lineHeight: 24,
  },
});
