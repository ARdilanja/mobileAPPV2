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
  "https://api.arinnovate.io/api/getTestReportcand/690992d53679680155cb6923";

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

  return (
    <View>
      <StatsSection score={report.communicationScore} />

      <PercentageCard data={report.breakdown} />

      <CommunicationFilters
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ContentSection
        activeFilter={activeFilter}
        feedback={report.feedback}
      />
    </View>
  );
};

export default Communication;