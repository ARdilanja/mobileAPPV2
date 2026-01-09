// src/screens/EmployerInterviewScreen.jsx

import React, { useEffect, useState } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import EmployerInterviewTabSwitcher from '../components/employerInterview/EmployerInterviewTabSwitcher';
import EmployerInterviewList from '../components/employerInterview/EmployerInterviewList';
import MockInterviewList from '../components/employerInterview/MockInterviewList';
import MobileUnsupportedModal from '../components/employerInterview/MobileUnsupportedModal';
import { API_BASE_URL } from '../config/api';

export default function EmployerInterviewScreen({ navigation }) {
  const [activeTab, setActiveTab] = useState('employer');
  const [showModal, setShowModal] = useState(false);
    const [interviews, setInterviews] = useState([]);
  const [loading, setLoading] = useState(false);


  const CANDIDATE_ID = '6672592aa821dc12db9fc26e';
  useEffect(() => {
    fetchInterviewData();
  }, []);

  const fetchInterviewData = async () => {
    try {
      setLoading(true);
      console.log('first',API_BASE_URL)
      
      const response = await fetch(
        `${API_BASE_URL}/getAllScheduleInterCand/${CANDIDATE_ID}?completed=true`
      );
      const result = await response.json();
console.log('result', result)
      if (result?.data) {
        setInterviews(result.data);
      }
    } catch (error) {
      console.error('API Error:', error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <EmployerInterviewTabSwitcher
        activeTab={activeTab}
        setActiveTab={setActiveTab}
      />
      <View style={{ flex: 1 }}>
        {activeTab === 'employer' ? (
          <EmployerInterviewList onShowUnsupported={() => setShowModal(true)} interviews={interviews} />
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
