// import React from "react";
// import { View, Text, StyleSheet, Dimensions } from "react-native";
// // import { CONTENT_DATA, SECTION_ORDER } from "./ContentData";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const CONTENT_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

// const SECTION_ORDER = [
//   "Strengths",
//   "Areas of Improvement",
//   "Recommendations",
// ];

// export default function ContentSection({ activeFilter, feedback = {} }) {
//   const sections =
//     activeFilter === "All"
//       ? SECTION_ORDER
//       : [activeFilter];

//   return (
//     <View style={styles.wrapper}>
//       {sections.map((key) => {
//         const text = feedback[key];
//         if (!text) return null;

//         return (
//           <View key={key} style={styles.section}>
//             <View style={styles.headingRow}>
//               <View style={styles.line} />
//               <Text style={styles.heading}>{key.toUpperCase()}</Text>
//               <View style={styles.line} />
//             </View>

//             <Text style={styles.contentText}>{text}</Text>
//           </View>
//         );
//       })}
//     </View>
//   );
// }



// const styles = StyleSheet.create({
//   wrapper: {
//     width: CONTENT_WIDTH,
//     alignSelf: "center",
//     marginTop: 24,
//     marginBottom: 24,
//   },

//   section: {
//     marginBottom: 24,
//   },

//   headingRow: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//   },

//   heading: {
//     marginHorizontal: 12,
//     fontSize: 12,
//     letterSpacing: 2,
//     color: "#115CC7",
//     fontWeight: "600",
//   },

//   line: {
//     flex: 1,
//     height: 1,
//     borderBottomColor: '#00000033',
//     borderWidth: 0.5
//   },

//   contentText: {
//     fontSize: 12,
//     lineHeight: 20,
//     color: "#000",
//   },
// });



import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";

const SCREEN_WIDTH = Dimensions.get("window").width;
const CONTENT_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

const SECTION_ORDER = [
  "Strengths",
  "Areas of Improvement",
  "Recommendations",
];

export default function ContentSection({ activeFilter, feedback = {} }) {
  const sections =
    activeFilter === "All"
      ? SECTION_ORDER
      : [activeFilter];

  const cleanBulletText = (text) => {
    return text
      .replace(/<\/?p>/gi, "")   // remove <p> tags
      .replace(/^[-•]\s*/, "")   // remove - or •
      .trim();
  };

  return (
    <View style={styles.wrapper}>
      {sections.map((key) => {
        const text = feedback[key];
        if (!text) return null;

        const points = (Array.isArray(text) ? text : text.split("\n"))
          .map(cleanBulletText)
          .filter(item => item.length > 0);

        return (
          <View key={key} style={styles.section}>
            {/* Heading */}
            <View style={styles.headingRow}>
              <View style={styles.line} />
              <Text style={styles.heading}>{key.toUpperCase()}</Text>
              <View style={styles.line} />
            </View>

            {/* Bullet list */}
            {points.map((item, index) => (
              <View key={index} style={styles.bulletRow}>
                <View style={styles.bulletCircle} />
                <Text style={styles.contentText}>{item}</Text>
              </View>
            ))}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: CONTENT_WIDTH,
    alignSelf: "center",
    marginTop: 24,
    marginBottom: 24,
  },

  section: {
    marginBottom: 24,
  },

  headingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  heading: {
    marginHorizontal: 12,
    fontSize: 12,
    letterSpacing: 3,
    color: "#115CC7",
    fontWeight: "600",
  },

  line: {
    flex: 1,
    height: 1,
    borderBottomColor: "#00000033",
    borderWidth: 0.5,
  },

  /* 🔹 Figma-style bullet row */
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  /* 🔹 Green outlined circle */
  bulletCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#1BA94C", // Figma green
    marginTop: 4,
    marginRight: 12,
    alignSelf: 'center'
  },

  contentText: {
    flex: 1,
    fontSize: 12,
    lineHeight: 20,
    color: "#000",
  },
});
