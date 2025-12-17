import React, { useState } from 'react';
import { View, FlatList } from 'react-native';
import InterviewCard from './InterviewCard';
import MobileUnsupportedModal from './MobileUnsupportedModal';

const EmployerInterviewList = ({ onShowUnsupported }) => {
  const data = [
    {
      id: '1',
      logo: require('../../assets/images/infosys.jpg'),
      company: 'Infosys',
      role: 'React Native Developer',
      isExpired: true,
    },
    {
      id: '2',
      logo: require('../../assets/images/accenture.jpg'),
      company: 'Accenture',
      role: 'UX Designer',
      hasCoding: true,
    },
    {
      id: '3',
      logo: require('../../assets/images/zoho.png'),
      company: 'Zoho',
      role: 'UI Designer',
      hasCoding: true,
    },
    {
      id: '4',
      logo: require('../../assets/images/sutherland.png'),
      company: 'Sutherland',
      role: 'Software Engineer',
      hasCoding: true,
    },
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
            isExpired={item.isExpired}
            hasCoding={item.hasCoding}
            onStartPress={onShowUnsupported}
          />
        )}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
      />
    </View>
  );
};

export default EmployerInterviewList;
