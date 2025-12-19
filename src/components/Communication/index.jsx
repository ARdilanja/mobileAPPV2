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





import React, { useEffect, useState } from "react";
import { View, ActivityIndicator } from "react-native";
import StatsSection from "./StatsSection";
import PercentageCard from "./PercentageCard";
import ContentSection from "./ContentSection";
import CommunicationFilters from "./CommunicationFilters";

const REPORT_API =
  "https://api.arinnovate.io/api/getTestReportcand/690c41c310dd9af2591d89de";

const Communication = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchReport = async () => {
      try {
        const res = await fetch(REPORT_API);
        const json = await res.json();
        setReport(json);
      } catch (e) {
        console.log("API error:", e);
      } finally {
        setLoading(false);
      }
    };

    fetchReport();
  }, []);

  if (loading) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  if (!report) return null;

  // ✅ MAP API → Percentage cards
  const percentageData = [
    {
      key: "Fluency & Coherence",
      percentage: report.Fluency_and_coherence_score ?? 0,
      icon: require("../../assets/images/card1.png"),
      color: "#AC0D6C",
    },
    {
      key: "Lexical Resource",
      percentage: report.Lexical_resource_score ?? 0,
      icon: require("../../assets/images/card2.png"),
      color: "#8329E3",
    },
    {
      key: "Grammatical Range & Accuracy",
      percentage: report.Grammatical_Range_and_Accuracy_score ?? 0,
      icon: require("../../assets/images/card3.png"),
      color: "#1151EB",
    },
    {
      key: "Pronunciation",
      percentage: report.Pronounciation_score ?? 0,
      icon: require("../../assets/images/card4.png"),
      color: "#FF4B4A",
    },
  ];

  // ✅ MAP API → Content filters
 const buildTextFromObject = (obj) => {
  if (!obj || typeof obj !== "object") return "";

  return Object.entries(obj)
    .map(([title, points]) => {
      if (!Array.isArray(points)) return "";
      return `• ${title}\n${points.map(p => `- ${p}`).join("\n")}`;
    })
    .join("\n\n");
};

const strengthsText = buildTextFromObject(report.overAllStrengths);
const improvementText = buildTextFromObject(report.overAllWeaknesses);

const recommendationsText =
  report.Comm_Overall_Recommendation?.[0]
    ? [
        ...(report.Comm_Overall_Recommendation[0].strengths || []),
        ...(report.Comm_Overall_Recommendation[0].weaknesses || []),
      ].map(item => `• ${item}`).join("\n")
    : "";

const feedback = {
  Strengths: strengthsText,
  "Areas of Improvement": improvementText,
  Recommendations: recommendationsText,
};


  return (
    <View>
      {/* OVERALL SCORE */}
      <StatsSection Overall_score={report.Overall_score} />

      {/* PERCENTAGE CARDS */}
      <PercentageCard data={percentageData} />

      {/* FILTERS */}
      <CommunicationFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      {/* FILTERED CONTENT */}
      <ContentSection
        activeFilter={activeFilter}
        feedback={feedback}
      />
    </View>
  );
};

export default Communication;
