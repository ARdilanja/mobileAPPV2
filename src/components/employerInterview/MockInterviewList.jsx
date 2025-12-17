import React from "react";
import { View, FlatList } from "react-native";
import InterviewCard from "./InterviewCard";

const MockInterviewList = () => {
  const data = [
    { id: "1", logo: require("../../assets/images/recroot_img.png"), company: "Recroot", role: "React Native Developer" },
    { id: "2", logo: require("../../assets/images/recroot_img.png"), company: "Recroot", role: "UX Designer" },
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
            onPress={() => console.log("Start Mock:", item.role)}
          />
        )}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default MockInterviewList;