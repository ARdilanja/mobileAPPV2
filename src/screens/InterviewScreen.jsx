
// import React, { useState } from "react";
// import { View, StyleSheet } from "react-native";

// import Header from "../components/Header";
// import InterviewTabs from "../components/InterviewTabs";
// import SubjectExpertise from "../components/SubjectExpertise";

// export default function InterviewScreen() {
//     const [activeTab, setActiveTab] = useState("expertise");

//     return (
//         <View style={styles.container}>
//             <Header />

//             <InterviewTabs
//                 activeTab={activeTab}
//                 setActiveTab={setActiveTab}
//             />

//             {/* TAB CONTENT */}
//             {activeTab === "expertise" && <SubjectExpertise />}

//             {activeTab === "communication" && (
//                 <View style={{ padding: 16 }}>
//                     {/* Communication Skills content later */}
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
// });




import React, { useState } from "react";
import {
    View,
    StyleSheet,
    ScrollView,
} from "react-native";

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

            <InterviewTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* SCROLLABLE CONTENT */}
            <ScrollView
                contentContainerStyle={styles.scrollContent}
                showsVerticalScrollIndicator={false}
            >
                {activeTab === "expertise" && (
                    <SubjectExpertise
                        activePage={activePage}
                        setActivePage={setActivePage}
                    />
                )}
            </ScrollView>

            {activeTab === "communication" && (
                <View style={{ padding: 16 }}>
                    <Communication />
                </View>
            )}

            {/* FLOATING PAGINATION */}
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

    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    scrollContent: {
        paddingBottom: 140,
        // enough space for pagination + future bottom nav
    },

    paginationWrapper: {
        position: "absolute",
        left: 0,
        right: 0,
        bottom: 60,
        alignItems: "center",
        backgroundColor: "transparent",
    },

});
