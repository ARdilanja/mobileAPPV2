// import React from "react";
// import { View } from "react-native";

// import StatsSection from "./StatsSection";
// import QuestionCard from "./QuestionCard";
// import Filters from "./Filters";
// import ContentSection from "./ContentSection";
// import { SECTION_ORDER } from "./contentData";

// export default function SubjectExpertise({
//     activePage,
//     setActivePage,
// }) {
//     const activeFilter = SECTION_ORDER[activePage - 1];

//     return (
//         <View>
//             <StatsSection />
//             <QuestionCard />

//             <Filters
//                 activeFilter={activeFilter}
//                 setActiveFilter={(filter) =>
//                     setActivePage(
//                         SECTION_ORDER.indexOf(filter) + 1
//                     )
//                 }
//             />

//             <ContentSection activeFilter={activeFilter} />
//         </View>
//     );
// }



// import React, { useMemo } from "react";
// import { View } from "react-native";

// import StatsSection from "./StatsSection";
// import QuestionCard from "./QuestionCard";
// import Filters from "./Filters";
// import ContentSection from "./ContentSection";

// export default function SubjectExpertise({
//   activePage,
//   setActivePage,
//   data,
// }) {
//   if (!data) return null;
// console.log('data', data)

//  const { questionsList = [], TestsimilarList = [] } = data;
//  const currentQuestion = questionsList[activePage - 1];

//    const matchedTestSimilar = useMemo(() => {
//     if (!currentQuestion) return null;

//     return TestsimilarList.find(
//       (item) => item.id === currentQuestion._id
//     );
//   }, [currentQuestion, TestsimilarList]);
//  const pageFilters = [
//     "Ideal Answer",
//     "Strengths",
//     "Areas of Improvement",
//     "Recommendations",
//   ];
//    const activeFilter = pageFilters[activePage - 1] || pageFilters[0];

//   if (!currentQuestion) return null;
//   return (
//     <View>
//       <StatsSection
//         finalOverallScore={data.final_overall_score}
//         questionScore={matchedTestSimilar?.overall_evaluation?.rating || 0}
//       />

//       <QuestionCard
//         questionNo={activePage}
//         questionText={currentQuestion.question}
//       />

//       <Filters
//         activeFilter={activeFilter}
//         setActiveFilter={(filter) => {
//           const index = pageFilters.indexOf(filter);
//           if (index !== -1) {
//             setActivePage(index + 1);
//           }
//         }}
//       />

//       <ContentSection
//         activeFilter={activeFilter}
//         content={{
//           "Ideal Answer":
//             currentQuestion?.answer || "",
//           Strengths:
//             matchedTestSimilar?.strengths || "",
//           "Areas of Improvement":
//             matchedTestSimilar?.candidate_answer_analysis || "",
//           Recommendations:
//             matchedTestSimilar?.recommendations || "",
//         }}
//       />
//     </View>
//   );
// }



import React, { useMemo, useEffect, useState } from "react";
import { View } from "react-native";

import StatsSection from "./StatsSection";
import QuestionCard from "./QuestionCard";
import Filters from "./Filters";
import ContentSection from "./ContentSection";

export default function SubjectExpertise({
  activePage,
  setActivePage,
  data,
}) {
  if (!data) return null;

  const { questionsList = [], TestsimilarList = [] } = data;
  const currentQuestion = questionsList[activePage - 1];
  if (!currentQuestion) return null;

  /* MATCH TESTSIMILAR */
  const matchedTestSimilar = useMemo(() => {
    return TestsimilarList.find(
      (item) => item.id === currentQuestion._id
    );
  }, [currentQuestion, TestsimilarList]);

  /* BUILD CONTENT DATA */
  const contentData = useMemo(() => ({
    "Ideal Answer": currentQuestion?.answer || "",
    Strengths: matchedTestSimilar?.strengths || "",
    "Areas of Improvement":
      matchedTestSimilar?.candidate_answer_analysis
        ? Object.values(
            matchedTestSimilar.candidate_answer_analysis
          ).join("\n\n")
        : "",
    Recommendations:
      matchedTestSimilar?.recommendations || "",
  }), [currentQuestion, matchedTestSimilar]);

  /* AVAILABLE FILTERS ONLY */
  const availableFilters = useMemo(() => {
    const keys = Object.keys(contentData).filter(
      (key) => contentData[key]
    );
    return keys.length > 1 ? ["All", ...keys] : keys;
  }, [contentData]);

  const [activeFilter, setActiveFilter] = useState(
    availableFilters[0]
  );

  /* RESET FILTER ON QUESTION CHANGE */
  useEffect(() => {
    setActiveFilter(availableFilters[0]);
  }, [activePage, availableFilters]);

  return (
    <View>
      <StatsSection
        finalOverallScore={data.final_overall_score}
        questionScore={
          matchedTestSimilar?.overall_evaluation?.rating || 0
        }
      />

      <QuestionCard
        questionNo={activePage}
        questionText={currentQuestion.question}
      />

      <Filters
        filters={availableFilters}
        activeFilter={activeFilter}
        setActiveFilter={setActiveFilter}
      />

      <ContentSection
        activeFilter={activeFilter}
        content={contentData}
      />
    </View>
  );
}
