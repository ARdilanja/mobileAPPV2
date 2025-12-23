// import React, { useState } from "react";
// import {  Text, StyleSheet, SafeAreaView, StatusBar } from "react-native";
// import InterviewTabSwitcher from "../components/employerInterview/EmployerInterviewTabSwitcher";
// import CompleteCardData from "../components/CompleteCardData";

// const CompletedInterviewsScreen = ({ navigation }) => {
//   const [activeTab, setActiveTab] = useState("employer");
// // https://api.arinnovate.io/api/getScheduleInterCandByStatus/6672592aa821dc12db9fc26e?status=completed&page=1
//   const employerCount = 0;
//   const mockCount = 0;

//   const getLargeTitle = () => {
//     return activeTab === "employer" ? "Employer Interview" : "Mock Interview";
//   };

//   return (
//     <SafeAreaView style={styles.container}>
//       <InterviewTabSwitcher
//         activeTab={activeTab}
//         setActiveTab={setActiveTab}
//         employerCount={employerCount}
//         mockCount={mockCount}
//       />

//       <Text style={styles.largeTabTitle}>{getLargeTitle()}</Text>

//       <CompleteCardData activeTab={activeTab} />
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#fff",
//   },
//   largeTabTitle: {
//     fontFamily: "Inter",
//     fontWeight: "700",
//     fontSize: 18,
//     color: "#000",
//     // textAlign: "center",
//     marginLeft:24,
//     marginTop: 32,
//     marginBottom: 8,
//   },
// });

// export default CompletedInterviewsScreen;

import React, { useEffect, useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import axios from "axios";

import InterviewTabSwitcher from "../components/employerInterview/EmployerInterviewTabSwitcher";
import InterviewCard from "../components/employerInterview/InterviewCard";
import CompleteCardData from "../components/CompleteCardData";
import { Fonts } from "../constants/fonts";
import { API_BASE_URL } from "../config/api";
// import infosys from "../assets/images/infosys.png";

const PAGE_SIZE = 12;

const CompletedInterviewsScreen = () => {
  const [activeTab, setActiveTab] = useState("employer");
  const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  console.log('totalPages', totalPages)
  const candidateId = "6672592aa821dc12db9fc26e";

  // 🔹 Fetch completed interviews
  const fetchCompletedInterviews = async (page = 1) => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API_BASE_URL}/getScheduleInterCandByStatus/${candidateId}`,
        {
          params: {
            status: "completed",
            page,
            limit: PAGE_SIZE,
            // employer | mock
          },
        }
      );

      const data = res?.data || [];
      console.log('data', data)
      const total = data?.totalItems;

      setInterviews(data.data);
      setTotalPages(Math.ceil(total / PAGE_SIZE));
    } catch (error) {
      console.error("Completed interviews error:", error);
      setInterviews([]);
    } finally {
      setLoading(false);
    }
  };

  // 🔹 Fetch on tab / page change
  useEffect(() => {
    setCurrentPage(1);
    fetchCompletedInterviews(1);
  }, [activeTab]);

  useEffect(() => {
    fetchCompletedInterviews(currentPage);
  }, [currentPage]);

  const getLargeTitle = () =>
    activeTab === "employer" ? "Employer Interview" : "Mock Interview";

  // 🔹 Pagination UI
  const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(p => p - 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>{"<"}</Text>
        </TouchableOpacity>

        {Array.from({ length: totalPages }).map((_, i) => {
          const page = i + 1;
          const isActive = page === currentPage;

          return (
            <TouchableOpacity
              key={page}
              onPress={() => setCurrentPage(page)}
              style={[styles.pageButton, isActive && styles.activePage]}
            >
              <Text
                style={[
                  styles.pageText,
                  isActive && styles.activePageText,
                ]}
              >
                {page}
              </Text>
            </TouchableOpacity>
          );
        })}

        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(p => p + 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>{">"}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <InterviewTabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />

      <Text style={styles.largeTabTitle}>{getLargeTitle()}</Text>

      {loading ? (
        <ActivityIndicator style={{ marginTop: 40 }} size="large" />
      ) : (
        <FlatList
          data={interviews}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const logoPath = item?.companyId?.companyLogo?.logo;
            const logoUrl = logoPath
              ? `${API_BASE_URL}/openProfpic?photo=${logoPath}`
              : null;

            return (
              <InterviewCard
                interviewId={item._id}          // ✅ PASS ID HERE
                companyLogo={logoUrl ? { uri: logoUrl } : null}
                companyName={item?.companyId?.company_name}
                role={item?.job_title}
                isExpired={item?.status}
                hasCoding={item?.hasCoding}
                onStartPress={() => { }}
              />
            );
          }}
        />

      )}

      {renderPagination()}
    </SafeAreaView>
  );
};

export default CompletedInterviewsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  largeTabTitle: {
    fontFamily: Fonts.Medium,
    fontSize: 18,
    color: "#000",
    marginLeft: 24,
    marginTop: 32,
    marginBottom: 8,
  },

  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 16,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: "#eee",
  },
  activePage: {
    backgroundColor: "#0069FF",
  },
  pageText: {
    color: "#333",
    fontSize: 14,
  },
  activePageText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

