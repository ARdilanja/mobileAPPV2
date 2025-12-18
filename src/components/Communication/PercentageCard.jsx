// import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity } from 'react-native'
// import React, { useState } from 'react'

// // Individual card component
// const PercentageItem = ({ title, percentage, icon, isActive, onPress, cardColor }) => {
//   return (
//     <TouchableOpacity 
//       style={[styles.card, isActive && { backgroundColor: cardColor }]} 
//       onPress={onPress}
//       activeOpacity={0.7}
//     >
//       <View style={styles.iconContainer}>
//         <Image source={icon} style={[styles.icon, isActive]} />
//       </View>
//       <Text style={[styles.percentageText, isActive && styles.activeText]}>{percentage}%</Text>
//       <Text style={[styles.titleText, isActive && styles.activeText]}>{title}</Text>
//     </TouchableOpacity>
//   )
// }

// const PercentageCard = () => {
//   const [selectedCard, setSelectedCard] = useState('1'); // Default selected card

//   const percentageData = [
//     {
//       id: '1',
//       title: 'Fluency and\nCoherence',
//       percentage: 80,
//       icon: require('../../assets/images/card1.png'),
//       color: '#AC0D6C',
//     },
//     {
//       id: '2',
//       title: 'Lexical\nResource',
//       percentage: 80,
//       icon: require('../../assets/images/card2.png'),
//       color: '#8329E3',
//     },
//     {
//       id: '3',
//       title: 'Grammatical\nRange & Accuracy',
//       percentage: 80,
//       icon: require('../../assets/images/card3.png'),
//       color: '#1151EB',
//     },
//     {
//       id: '4',
//       title: 'Pronunciation',
//       percentage: 80,
//       icon: require('../../assets/images/card4.png'),
//       color: '#FF4B4A',
//     },
//   ]

//   const handleCardPress = (id) => {
//     setSelectedCard(id);
//   }

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={percentageData}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         renderItem={({ item }) => (
//           <PercentageItem
//             percentage={item.percentage}
//             title={item.title}
//             icon={item.icon}
//             cardColor={item.color}
//             isActive={selectedCard === item.id}
//             onPress={() => handleCardPress(item.id)}
//           />
//         )}
//       />
//     </View>
//   )
// }

// export default PercentageCard

// const styles = StyleSheet.create({
//   container: {
//     marginTop: 12,
//     alignItems: 'center',
//   },
//   card: {
//     backgroundColor: '#f8f9fa',
//     borderRadius: 12,
//     marginRight: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     width: 80,
//     // height: 115,
//     paddingVertical: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 3,
//   },
//   iconContainer: {
//     marginBottom: 8,
//     width: '100%',
//     alignItems: 'flex-start',
//     paddingLeft:10
//   },
//   icon: {
//     width: 24,
//     height: 24,
//     resizeMode: 'contain',
//   },
//   percentageText: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     color: '#333',
//     marginBottom: 2,
//   },
//   titleText: {
//     fontSize: 9,
//     color: '#666',
//     textAlign: 'center',
//     lineHeight: 11,
//   },
//   activeText: {
//     color: '#FFFFFF',
//     fontWeight: '600',
//   },
// })


import {
  StyleSheet,
  Text,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import React, { useState } from 'react';

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = Math.min(SCREEN_WIDTH * 0.22, 90);
const ICON_SIZE = Math.min(CARD_WIDTH * 0.35, 28);

// Individual card component
const PercentageItem = ({
  title,
  percentage,
  icon,
  isActive,
  onPress,
  cardColor,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.card,
        { width: CARD_WIDTH },
        isActive && { backgroundColor: cardColor },
      ]}
      onPress={onPress}
      activeOpacity={0.7}
    >
      <View style={styles.iconContainer}>
        <Image
          source={icon}
          style={[
            styles.icon,
            { width: ICON_SIZE, height: ICON_SIZE },
          ]}
        />
      </View>

      <Text
        style={[
          styles.percentageText,
          isActive && styles.activeText,
        ]}
      >
        {percentage}%
      </Text>

      <Text
        style={[
          styles.titleText,
          isActive && styles.activeText,
        ]}
        numberOfLines={2}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};

// const PercentageCard = () => {
//   const [selectedCard, setSelectedCard] = useState('1');

//   const percentageData = [
//     {
//       id: '1',
//       title: 'Fluency and\nCoherence',
//       percentage: 80,
//       icon: require('../../assets/images/card1.png'),
//       color: '#AC0D6C',
//     },
//     {
//       id: '2',
//       title: 'Lexical\nResource',
//       percentage: 80,
//       icon: require('../../assets/images/card2.png'),
//       color: '#8329E3',
//     },
//     {
//       id: '3',
//       title: 'Grammatical\nRange & Accuracy',
//       percentage: 80,
//       icon: require('../../assets/images/card3.png'),
//       color: '#1151EB',
//     },
//     {
//       id: '4',
//       title: 'Pronunciation',
//       percentage: 80,
//       icon: require('../../assets/images/card4.png'),
//       color: '#FF4B4A',
//     },
//   ];

//   return (
//     <View style={styles.container}>
//       <FlatList
//         data={percentageData}
//         keyExtractor={(item) => item.id}
//         horizontal
//         showsHorizontalScrollIndicator={false}
//         contentContainerStyle={styles.listContent}
//         renderItem={({ item }) => (
//           <PercentageItem
//             percentage={item.percentage}
//             title={item.title}
//             icon={item.icon}
//             cardColor={item.color}
//             isActive={selectedCard === item.id}
//             onPress={() => setSelectedCard(item.id)}
//           />
//         )}
//       />
//     </View>
//   );
// };

const PercentageCard = ({ data = [] }) => {
  const [selectedCard, setSelectedCard] = useState(0);

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item) => item.key}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContent}
        renderItem={({ item, index }) => (
          <PercentageItem
            title={item.key}
            percentage={item.percentage}
            icon={item.icon}
            cardColor={item.color}
            isActive={selectedCard === index}
            onPress={() => setSelectedCard(index)}
          />
        )}
      />
    </View>
  );
};


export default PercentageCard;

const styles = StyleSheet.create({
  container: {
    marginTop: 12,
  },

  listContent: {
    paddingHorizontal: 16,
  },

  card: {
    backgroundColor: '#f8f9fa',
    borderRadius: 12,
    marginRight: 12,
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,

    // shadow
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.1,
    // shadowRadius: 4,
    // elevation: 3,
  },

  iconContainer: {
    width: '100%',
    alignItems: 'flex-start',
    paddingLeft: 10,
    marginBottom: 6,
  },

  icon: {
    resizeMode: 'contain',
  },

  percentageText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 2,
  },

  titleText: {
    fontSize: 9,
    color: '#666',
    textAlign: 'center',
    lineHeight: 11,
  },

  activeText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});