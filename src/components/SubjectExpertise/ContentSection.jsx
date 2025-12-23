// import React from "react";
// import {
//     View,
//     Text,
//     StyleSheet,
//     Dimensions,
//     TouchableOpacity,
// } from "react-native";
// import { CONTENT_DATA, SECTION_ORDER } from "./contentData";
// import { Fonts } from "../../constants/fonts";

// const SCREEN_WIDTH = Dimensions.get("window").width;
// const CONTENT_WIDTH = Math.min(SCREEN_WIDTH - 32, 360);

// export default function ContentSection({
//     activeFilter,
//     activePage,
//     onPageChange,
// }) {
//     const renderSections =
//         activeFilter === "All"
//             ? Object.keys(CONTENT_DATA)
//             : [activeFilter];

//     return (
//         <View style={styles.wrapper}>
//             {/* CONTENT */}
//             {renderSections.map((key) => {
//                 const section = CONTENT_DATA[key];
//                 return (
//                     <View key={key} style={styles.section}>
//                         <View style={styles.headingRow}>
//                             <View style={styles.line} />
//                             <Text style={styles.heading}>
//                                 {section.title}
//                             </Text>
//                             <View style={styles.line} />
//                         </View>

//                         <Text style={styles.contentText}>
//                             {section.text}
//                         </Text>
//                     </View>
//                 );
//             })}
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     wrapper: {
//         width: CONTENT_WIDTH,
//         alignSelf: "center",
//         marginTop: 24,
//         marginBottom: 24,
//     },

//     section: {
//         marginBottom: 24,
//     },

//     headingRow: {
//         flexDirection: "row",
//         alignItems: "center",
//         marginBottom: 12,
//     },

//     heading: {
//         marginHorizontal: 12,
//         fontSize: 12,
//         fontFamily: Fonts.Medium,
//         letterSpacing: 2,
//         color: "#115CC7",
//     },

//     line: {
//         flex: 1,
//         height: 1,
//         backgroundColor: "#B5B5B5",
//     },

//     contentText: {
//         fontSize: 12,
//         fontFamily: Fonts.Regular,
//         lineHeight: 20,
//         color: "#000000",
//     },
// });



import React from "react";
import { View, Text, StyleSheet } from "react-native";

const cleanBulletText = (text = "") => {
  if (typeof text !== "string") return "";

  return text
    .replace(/<\/?p>/gi, "")
    .replace(/^[-•]\s*/, "")
    .trim();
};

export default function ContentSection({
  activeFilter,
  content,
}) {
  if (!content) return null;

  const sections =
    activeFilter === "All"
      ? Object.entries(content).filter(
        ([_, value]) => value
      )
      : [[activeFilter, content[activeFilter]]];

  return (
    <View style={styles.wrapper}>
      {sections.map(([title, text]) => {
  const safeText =
    Array.isArray(text)
      ? text
      : typeof text === "string"
        ? text.split("\n")
        : [];

  const points = safeText
    .map(cleanBulletText)
    .filter(item => item.length > 0);

  if (points.length === 0) return null;

        return (
          <View key={title} style={styles.section}>
            {/* Heading */}
            <View style={styles.headingRow}>
              <View style={styles.line} />
              <Text style={styles.heading}>
                {title.toUpperCase()}
              </Text>
              <View style={styles.line} />
            </View>

            {/* Bullet Content */}
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
    marginTop: 24,
    paddingHorizontal: 20,
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
    letterSpacing: 2,
    color: "#115CC7",
    fontWeight: "600",
  },

  line: {
    flex: 1,
    height: 1,
    backgroundColor: "#B5B5B5",
  },

  /* 🔹 Bullet row */
  bulletRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  /* 🔹 Green outlined bullet */
  bulletCircle: {
    width: 12,
    height: 12,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#1BA94C",
    marginTop: 4,
    marginRight: 12,
    alignSelf: 'center'
  },

  contentText: {
    flex: 1,
    fontSize: 13,
    lineHeight: 20,
    color: "#000",
  },
});
