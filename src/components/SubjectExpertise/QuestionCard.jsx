// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Dimensions,
//     TouchableOpacity,
// } from "react-native";
// import { Fonts } from "../../constants/fonts";

// /* ---------- Responsive width logic ---------- */
// const SCREEN_WIDTH = Dimensions.get("window").width;
// const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 360); // safe max width

// export default function QuestionCard() {
//     return (
//         <View style={styles.wrapper}>
//             <View style={styles.card}>
//                 {/* TOP ROW */}
//                 <View style={styles.topRow}>
//                     <Text style={styles.questionNo}>Question 1</Text>

//                     <TouchableOpacity activeOpacity={0.7}>
//                         <Text style={styles.playVideo}>Play Video</Text>
//                     </TouchableOpacity>
//                 </View>

//                 {/* QUESTION TEXT */}
//                 <Text style={styles.questionText}>
//                     How would you approach developing a marketing strategy for
//                     a new product?
//                 </Text>
//             </View>
//         </View>
//     );
// }

// /* ---------- STYLES ---------- */
// const styles = StyleSheet.create({
//     wrapper: {
//         width: CARD_WIDTH,
//         alignSelf: "center",
//         marginTop: 20,
//     },

//     card: {
//         backgroundColor: "#fff",
//         borderRadius: 12,
//         padding: 16,

//         // subtle shadow (iOS + Android)
//         shadowColor: "#000",
//         shadowOpacity: 0.08,
//         shadowRadius: 8,
//         shadowOffset: { width: 0, height: 4 },
//         elevation: 4,
//     },

//     topRow: {
//         flexDirection: "row",
//         justifyContent: "space-between",
//         alignItems: "center",
//         marginBottom: 8,
//     },

//     questionNo: {
//         fontSize: 12,
//         fontFamily: Fonts.Medium,
//         color: "#DF9300", // orange
//         fontWeight: "500",
//     },

//     playVideo: {
//         fontSize: 12,
//         fontFamily: Fonts.Medium,
//         color: "#4CA261", // green
//         fontWeight: "500",
//     },

//     questionText: {
//         fontSize: 16,
//         fontFamily: Fonts.Medium,
//         color: "#232C2E",
//         lineHeight: 22,
//     },
// });



import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Fonts } from "../../constants/fonts";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CARD_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

export default function QuestionCard({
  questionNo = "",
  questionText = "",
}) {
  return (
    <View style={styles.wrapper}>
      <View style={styles.card}>
        <View style={styles.topRow}>
          <Text style={styles.questionNo}>
            Question {questionNo}
          </Text>

          <TouchableOpacity>
            <Text style={styles.playVideo}>Play Video</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.questionText}>
          {questionText}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: CARD_WIDTH,
    alignSelf: "center",
    marginTop: 20,
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 16,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  questionNo: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: "#DF9300",
  },
  playVideo: {
    fontSize: 12,
    fontFamily: Fonts.Medium,
    color: "#4CA261",
  },
  questionText: {
    fontSize: 16,
    fontFamily: Fonts.Medium,
    color: "#232C2E",
    lineHeight: 22,
  },
});
