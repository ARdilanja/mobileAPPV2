import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const clipboardImage = require('../assets/images/Group_icon.png');

const CompleteCardData = ({ activeTab = "employer" }) => {

  return (
    <View style={styles.card}>
      {/* Clipboard Image */}
      <Image source={clipboardImage} style={styles.clipboardImage} resizeMode="contain" />
<Text style={styles.noDataTitle}>No Data Found</Text>
      <Text style={styles.noDataDescription}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
        malesuada elit justo, at porta lorem luctus in.
      </Text>
      {/* Start Button */}
      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Interview</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 32, // Reduced top margin since title is now outside
    marginHorizontal: 27,
    width: 320,
    height: 438,
    backgroundColor: '#fff',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
    alignItems: 'center',
    paddingTop: 40,
  },
  clipboardImage: {
    width: 120,
    height: 170,
    marginBottom: 24,
  },
  noDataTitle: {
    fontFamily: 'Inter',
    fontWeight: '700',
    fontSize: 14,
    color: '#000',
    marginBottom: 12,
  },
  noDataDescription: {
    fontFamily: 'Inter',
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    paddingHorizontal: 40,
    marginBottom: 40,
    lineHeight: 18,
  },
  startButton: {
    width: 280,
    height: 42,
    backgroundColor: '#0069FF',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButtonText: {
    fontFamily: 'Inter',
    fontWeight: '500',
    fontSize: 14,
    color: '#fff',
  },
});

export default CompleteCardData;



// import React from 'react';
// import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

// // Import your clipboard image
// const clipboardImage = require('../assets/images/Group_icon.png'); // Adjust path if needed

// const CompleteCardData = () => {
//   return (
//     <View style={styles.card}>
//       <Image source={clipboardImage} style={styles.clipboardImage} resizeMode="contain" />

//       <Text style={styles.noDataTitle}>No Data Found</Text>
//       <Text style={styles.noDataDescription}>
//         Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent
//         malesuada elit justo, at porta lorem luctus in.
//       </Text>

//       <TouchableOpacity style={styles.startButton}>
//         <Text style={styles.startButtonText}>Start Interview</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   card: {
//     marginTop: 40,
//     marginHorizontal: 27,
//     width: 320,
//     height: 438,
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.08,
//     shadowRadius: 10,
//     elevation: 5,
//     alignItems: 'center',
//     paddingTop: 40,
//   },
//   clipboardImage: {
//     width: 120,
//     height: 170,
//     marginBottom: 20,
//   },
//   noDataTitle: {
//     fontFamily: 'Inter',
//     fontWeight: '700',
//     fontSize: 14,
//     marginBottom: 12,
//   },
//   noDataDescription: {
//     fontFamily: 'Inter',
//     fontSize: 12,
//     color: '#666',
//     textAlign: 'center',
//     paddingHorizontal: 40,
//     marginBottom: 40,
//     lineHeight: 18,
//   },
//   startButton: {
//     width: 280,
//     height: 42,
//     backgroundColor: '#0069FF',
//     borderRadius: 8,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   startButtonText: {
//     fontFamily: 'Inter',
//     fontWeight: '500',
//     fontSize: 14,
//     color: '#fff',
//   },
// });

// export default CompleteCardData;