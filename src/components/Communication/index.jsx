// import { StyleSheet, Text, View } from 'react-native'
// import React, { useState } from 'react'
// import StatsSection from './StatsSection'
// import PercentageCard from './PercentageCard'
// import ContentSection from './ContentSection'
// import CommunicationFilters from './CommunicationFilters'

// const Communication = () => {
//     const [activeFilter, setActiveFilter] = useState("All");
//     return (
//         <View>
//             <StatsSection />
//             <PercentageCard />
//             <CommunicationFilters
//                 activeFilter={activeFilter}
//                 setActiveFilter={setActiveFilter}
//             />

//             <ContentSection activeFilter={activeFilter} />
//         </View>
//     )
// }

// export default Communication

// const styles = StyleSheet.create({})





import React, { useState } from "react";
import { View, ActivityIndicator } from "react-native";

import StatsSection from "./StatsSection";
import PercentageCard from "./PercentageCard";
import ContentSection from "./ContentSection";
import CommunicationFilters from "./CommunicationFilters";

const Communication = ({ data }) => {
  const [activeFilter, setActiveFilter] = useState("All");

  if (!data) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  // ✅ Percentage Cards
  const percentageData = [
    {
      key: "Fluency & Coherence",
      percentage: data.Fluency_and_coherence_score ?? 0,
      icon: require("../../assets/images/card1.png"),
      color: "#AC0D6C",
    },
    {
      key: "Lexical Resource",
      percentage: data.Lexical_resource_score ?? 0,
      icon: require("../../assets/images/card2.png"),
      color: "#8329E3",
    },
    {
      key: "Grammatical Range & Accuracy",
      percentage: data.Grammatical_Range_and_Accuracy_score ?? 0,
      icon: require("../../assets/images/card3.png"),
      color: "#1151EB",
    },
    {
      key: "Pronunciation",
      percentage: data.Pronounciation_score ?? 0,
      icon: require("../../assets/images/card4.png"),
      color: "#FF4B4A",
    },
  ];

  // ✅ Helpers
  const buildTextFromObject = (obj) => {
    if (!obj || typeof obj !== "object") return "";

    return Object.entries(obj)
      .map(([title, points]) =>
        Array.isArray(points)
          ? `• ${title}\n${points.map(p => `- ${p}`).join("\n")}`
          : ""
      )
      .join("\n\n");
  };

  const strengthsText = buildTextFromObject(data.overAllStrengths);
  const improvementText = buildTextFromObject(data.overAllWeaknesses);

  const recommendationsText =
    data.Comm_Overall_Recommendation?.[0]
      ? [
          ...(data.Comm_Overall_Recommendation[0].strengths || []),
          ...(data.Comm_Overall_Recommendation[0].weaknesses || []),
        ]
          .map(item => `• ${item}`)
          .join("\n")
      : "";

  const feedback = {
    Strengths: strengthsText,
    "Areas of Improvement": improvementText,
    Recommendations: recommendationsText,
  };

  return (
    <View>
      {/* OVERALL SCORE */}
      <StatsSection Overall_score={data.Overall_score} />

      {/* PERCENTAGE CARDS */}
      <PercentageCard data={percentageData} />

      {/* FILTERS */}
      <CommunicationFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* CONTENT */}
      <ContentSection
        activeFilter={activeFilter}
        feedback={feedback}
      />
    </View>
  );
};

export default Communication;
