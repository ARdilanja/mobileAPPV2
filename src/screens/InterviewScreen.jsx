
// import React, { useState } from "react";
// import {
//     View,
//     StyleSheet,
//     ScrollView,
// } from "react-native";

// import Header from "../components/Header";
// import InterviewTabs from "../components/InterviewTabs";
// import SubjectExpertise from "../components/SubjectExpertise";
// import Pagination from "../components/SubjectExpertise/Pagination";
// import { SECTION_ORDER } from "../components/SubjectExpertise/contentData";

// export default function InterviewScreen() {
//     const [activeTab, setActiveTab] = useState("expertise");
//     const [activePage, setActivePage] = useState(2); // Ideal Answer

//     return (
//         <View style={styles.container}>
//             <Header />

//             <InterviewTabs
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//             />

//             {/* SCROLLABLE CONTENT */}
//             <ScrollView
//                 contentContainerStyle={styles.scrollContent}
//                 showsVerticalScrollIndicator={false}
//             >
//                 {activeTab === "expertise" && (
//                     <SubjectExpertise
//                         activePage={activePage}
//                         setActivePage={setActivePage}
//                     />
//                 )}
//             </ScrollView>

//             {/* FLOATING PAGINATION */}
//             {activeTab === "expertise" && (
//                 <View style={styles.paginationWrapper}>
//                     <Pagination
//                         activePage={activePage}
//                         totalPages={SECTION_ORDER.length}
//                         onPageChange={setActivePage}
//                     />
//                 </View>
//             )}
//         </View>
//     );
// }


// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: "#fff",
//     },

//     scrollContent: {
//         paddingBottom: 140, 
//         // enough space for pagination + future bottom nav
//     },

//     paginationWrapper: {
//         position: "absolute",
//         left: 0,
//         right: 0,
//         bottom: 70, 
//         alignItems: "center",
//         backgroundColor: "transparent",
//     },
// });



import React, { useState } from "react";
import { View, StyleSheet, ScrollView } from "react-native";

import Header from "../components/Header";
import InterviewTabs from "../components/InterviewTabs";
import SubjectExpertise from "../components/SubjectExpertise";
import Communication from "../components/Communication";
import Pagination from "../components/SubjectExpertise/Pagination";
import { SECTION_ORDER } from "../components/SubjectExpertise/contentData";

export default function InterviewScreen() {
    const [activeTab, setActiveTab] = useState("expertise");
    const [activePage, setActivePage] = useState(2); // Ideal Answer

    return (
        <View style={styles.container}>

            <Header />

            <ScrollView
                style={styles.scrollView}
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                <InterviewTabs
                    activeTab={activeTab}
                    setActiveTab={setActiveTab}
                />

                <View style={styles.contentContainer}>
                    {activeTab === "expertise" ? (
                        <SubjectExpertise
                            activePage={activePage}
                            setActivePage={setActivePage}
                        />
                    ) : (
                        <Communication />
                    )}
                </View>
            </ScrollView>

            {/* 4. Floating Pagination (Only for Expertise) */}
            {activeTab === "expertise" && (
                <View style={styles.paginationWrapper}>
                    <Pagination
                        activePage={activePage}
                        totalPages={SECTION_ORDER.length}
                        onPageChange={setActivePage}
                    />
                </View>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    scrollView: {
        flex: 1, 
    },
    scrollContent: {
        flexGrow: 1, 
        paddingBottom: 140, 
    },
    contentContainer: {
        marginTop: 10, 
    },
    paginationWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 60,
        alignItems: "center",
        backgroundColor: "transparent",
        zIndex: 10, 
    },
});