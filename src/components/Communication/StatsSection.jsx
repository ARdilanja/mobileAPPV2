// import { StyleSheet, Text, View, Image } from 'react-native'
// import React from 'react'

// const StatsSection = () => {
//     return (
//         <View style={styles.container}>
//             <View style={styles.card}>

//                 <View style={styles.leftContent}>
//                     <Text style={styles.title}>Communication Skills</Text>
//                     <Text style={styles.percentage}>80%</Text>
//                 </View>

//                 <View style={styles.iconWrapper}>
//                     <Image
//                         source={require('../../assets/images/Statsicon.png')} 
//                         style={styles.icon}
//                         resizeMode="contain"
//                     />
//                 </View>

//             </View>
//         </View>
//     )
// }

// export default StatsSection
// const styles = StyleSheet.create({
//     container: {
//         padding: 16,
//     },

//     card: {
//         width:325,
//         height: 70,
//         borderRadius: 12,
//         paddingHorizontal: 16,
//         backgroundColor: '#E9F5FF',
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'space-between',

//         elevation: 3,

//         // iOS shadow
//         shadowColor: '#000',
//         shadowOffset: { width: 0, height: 2 },
//         shadowOpacity: 0.15,
//         shadowRadius: 4,
//     },

//     leftContent: {
//         justifyContent: 'center',
//     },

//     title: {
//         fontSize: 14,
//         color: '#1F2937',
//         fontWeight: '500',
//         marginBottom: 6,
//     },

//     percentage: {
//         fontSize: 28,
//         fontWeight: '700',
//         color: '#000',
//     },

//     iconWrapper: {
//         width: 44,
//         height: 44,
//         borderRadius: 22,
//         color:'',
//         // backgroundColor: '#4F9DFF',
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     icon: {
//         width: 36,
//         height: 36,
//         tintColor: '#fff',
//     },
// })



import { StyleSheet, Text, View, Image, Dimensions } from 'react-native'
import React from 'react'
import LinearGradient from 'react-native-linear-gradient'

const { width } = Dimensions.get('window')

// const StatsSection = () => {
//   return (
//     <View style={styles.container}>
//       <LinearGradient
//         colors={['#E9F5FF', '#0087FF']}
//         start={{ x: 0, y: 4 }}
//         end={{ x: 1, y: 5 }}
//         style={styles.card}
//       >
//         {/* Left content */}
//         <View>
//           <Text style={styles.title}>Communication Skills</Text>
//           <Text style={styles.percentage}>80%</Text>
//         </View>

//         {/* Right image */}
//         <View style={styles.iconWrapper}>
//           <Image
//             source={require('../../assets/images/Statsicon.png')} // update path
//             style={styles.icon}
//             resizeMode="contain"
//           />
//         </View>
//       </LinearGradient>
//     </View>
//   )
// }

const StatsSection = ({ Overall_score }) => {
  return (
    <View style={styles.container}>
      <LinearGradient
        colors={["#E9F5FF", "#0087FF"]}
        start={{ x: 0, y: 4 }}
        end={{ x: 1, y: 5 }}
        style={styles.card}
      >
        <View>
          <Text style={styles.title}>Communication Skills</Text>
          <Text style={styles.percentage}>
            {Math.round(Number(Overall_score || 0))}%
          </Text>
        </View>

        <Image
          source={require("../../assets/images/Statsicon.png")}
          style={styles.icon}
        />
      </LinearGradient>
    </View>
  );
};


export default StatsSection
const styles = StyleSheet.create({
  container: {
    padding: 16,
    borderBottomColor:'#00000033',
    borderBottomWidth:0.5
  },

  card: {
    height: 70,
    borderRadius: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',

    // Android shadow
    elevation: 3,

    // iOS shadow
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 4,
  },

  title: {
    fontSize: 14,
    color: '#1F2937',
    fontWeight: '500',
    marginBottom: 6,
  },

  percentage: {
    fontSize: 28,
    fontWeight: '700',
    color: '#000',
  },

  iconWrapper: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: 'center',
    justifyContent: 'center',
  },

  icon: {
    width: 36,
    height: 36,
    tintColor: '#fff',
  },
})
