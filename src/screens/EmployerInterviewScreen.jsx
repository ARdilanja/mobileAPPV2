// src/screens/EmployerInterviewScreen.jsx

import React, { useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';

import EmployerInterviewHeader from '../components/employerInterview/EmployerInterviewHeader';
import EmployerInterviewTabSwitcher from '../components/employerInterview/EmployerInterviewTabSwitcher';
import EmployerInterviewList from '../components/employerInterview/EmployerInterviewList';
import MockInterviewList from '../components/employerInterview/MockInterviewList';
import MobileUnsupportedModal from '../components/employerInterview/MobileUnsupportedModal';

export default function EmployerInterviewScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('employer');
  const [showModal, setShowModal] = useState(false);
  // const handleBack = () => {
  //   if (navigation) {
  //     navigation.goBack();
  //   }
  // };

  return (
    <SafeAreaView style={styles.container}>
      <EmployerInterviewHeader />
      <EmployerInterviewTabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View style={{ flex: 1 }}>
        {activeTab === 'employer' ? (
          <EmployerInterviewList onShowUnsupported={() => setShowModal(true)} />
        ) : (
          <MockInterviewList />
        )}
      </View>
      <MobileUnsupportedModal
        visible={showModal}
        onClose={() => setShowModal(false)}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
});
