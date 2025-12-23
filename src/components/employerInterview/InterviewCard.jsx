// src/components/InterviewCard.jsx
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Fonts } from '../../constants/fonts';
import { useNavigation } from '@react-navigation/native';

const InterviewCard = ({
  interviewId,          // ✅ RECEIVE ID
  companyLogo,
  companyName,
  role,
  isExpired,
  hasCoding = false,
  onStartPress,
}) => {
  const navigation = useNavigation();

  const handlePress = () => {
    if (hasCoding) {
      onStartPress();
    }
  };

  const renderActionButton = () => {
    switch (isExpired) {
      case "expired":
        return (
          <View style={styles.expiredButton}>
            <Text style={styles.expiredText}>Expired</Text>
          </View>
        );

      case "completed":
        return (
          <TouchableOpacity
            style={styles.reportButton}
            onPress={() =>
              navigation.navigate("InterviewScreen", {
                interviewId,   // ✅ NOW VALID
              })
            }
          >
            <Text style={styles.reportText}>View Report</Text>
          </TouchableOpacity>
        );

      case "invited":
      default:
        return (
          <TouchableOpacity
            style={styles.startButton}
            onPress={handlePress}
          >
            <Text style={styles.startText}>Start</Text>
          </TouchableOpacity>
        );
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.left}>
        {companyLogo && (
          <Image source={companyLogo} style={styles.logo} />
        )}
        <View style={styles.textContainer}>
          <Text style={styles.company}>{companyName}</Text>
          <Text style={styles.role}>{role}</Text>
        </View>
      </View>

      {renderActionButton()}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: 375,
    height: 76,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
    marginBottom: 12,
    alignSelf: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 3,
    elevation: 2,
  },
  left: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logo: {
    width: 48,
    height: 48,
    marginRight: 16,
  },
  textContainer: {
    justifyContent: 'center',
  },
  company: {
    fontFamily: Fonts.Bold,
    fontSize: 14,
    color: '#171F38',
    lineHeight: 24,
  },
  role: {
    fontFamily: Fonts.Medium,
    fontSize: 13,
    color: '#5C6363',
    lineHeight: 22,
  },
  startButton: {
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: '#2563EB',
    borderRadius: 6,
    width: 70,
    height: 32,
    paddingHorizontal: 18,
    paddingVertical: 7.5,
  },
  startText: {
    color: '#115CC7',
    fontWeight: '500',
    fontSize: 14,
    lineHeight: 17,
    fontFamily: Fonts.Medium,
  },
  expiredButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    width: 70,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
  },
  expiredText: {
    color: '#6B7280',
    fontFamily: Fonts.Medium,
    fontSize: 14,
  },
});

export default InterviewCard;

// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
// import { Fonts } from '../constants/fonts';

// const InterviewCard = ({ companyLogo, companyName, role, onPress }) => {
//   return (
//     <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
//       <View style={styles.left}>
//         <Image source={companyLogo} style={styles.logo} resizeMode="contain" />
//         <View style={styles.textContainer}>
//           <Text style={styles.company}>{companyName}</Text>
//           <Text style={styles.role}>{role}</Text>
//         </View>
//       </View>

//       <TouchableOpacity style={styles.startButton} onPress={onPress}>
//         <Text style={styles.startText}>Start</Text>
//       </TouchableOpacity>
//     </TouchableOpacity>
//   );
// };

// export default InterviewCard;

// const styles = StyleSheet.create({
//   card: {
//     width: 375,
//     height: 76,
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     paddingHorizontal: 20,
//     backgroundColor: '#FFFFFF',
//     marginBottom: 12,
//     alignSelf: 'center',
//     borderRadius: 8,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 1 },
//     shadowOpacity: 0.05,
//     shadowRadius: 3,
//     elevation: 2,
//   },
//   left: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   logo: {
//     width: 48,
//     height: 48,
//     marginRight: 16,
//   },
//   textContainer: {
//     justifyContent: 'center',
//   },
//   company: {
//     fontFamily: Fonts.Bold,
//     fontSize: 14,
//     color: '#171F38',
//     lineHeight: 24,
//   },
//   role: {
//     fontFamily:Fonts.Medium,
//     fontSize: 13,
//     color: '#5C6363',
//     lineHeight: 22,
//   },
//   startButton: {
//     backgroundColor: 'white',
//     borderWidth: 1,
//     borderColor: '#2563EB',
//     borderRadius: 6,
//     width:70,
//     height:32,
//     paddingHorizontal: 18,
//     paddingVertical: 7.5,
//   },
//   startText: {
//     color: '#115CC7',
//     fontWeight: '500',
//     fontSize: 14,
//     lineHeight: 17,
//     fontFamily: Fonts.Medium,
//   },
// });
