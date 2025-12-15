// import React from "react";
// import { View, StyleSheet } from "react-native";
// import Header from "../components/Header";
// import InterviewTabs from "../components/InterviewTabs";

// export default function InterviewScreen() {
//     return (
//         <View style={styles.container}>
//             <Header />
//             <InterviewTabs />
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
import { View, StyleSheet } from "react-native";

import Header from "../components/Header";
import InterviewTabs from "../components/InterviewTabs";
import SubjectExpertise from "../components/SubjectExpertise";

export default function InterviewScreen() {
    const [activeTab, setActiveTab] = useState("expertise");

    return (
        <View style={styles.container}>
            <Header />

            <InterviewTabs
                activeTab={activeTab}
                setActiveTab={setActiveTab}
            />

            {/* TAB CONTENT */}
            {activeTab === "expertise" && <SubjectExpertise />}

            {activeTab === "communication" && (
                <View style={{ padding: 16 }}>
                    {/* Communication Skills content later */}
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
});
