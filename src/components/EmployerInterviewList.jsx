import React from "react";
import { View, FlatList } from "react-native";
import InterviewCard from "./InterviewCard";

const EmployerInterviewList = () => {
  const data = [
    { id: "1", logo: require("../assets/images/infosys.jpg"), company: "Infosys", role: "React Native Developer" },
    { id: "2", logo: require("../assets/images/accenture.jpg"), company: "Accenture", role: "UX Designer" },
    { id: "3", logo: require("../assets/images/zoho.png"), company: "Zoho", role: "UI Designer" },
    { id: "4", logo: require("../assets/images/sutherland.png"), company: "Sutherland", role: "Software Engineer" },
    // { id: "5", logo: require("../assets/images/cts.png"), company: "CTS", role: "Software Developer" },
    // { id: "6", logo: require("../assets/images/infosys.png"), company: "Infosys", role: "React Native Developer" },
  ];

  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
      <FlatList
        data={data}
        renderItem={({ item }) => (
          <InterviewCard
            companyLogo={item.logo}
            companyName={item.company}
            role={item.role}
            onPress={() => console.log("Start:", item.company, item.role)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default EmployerInterviewList;