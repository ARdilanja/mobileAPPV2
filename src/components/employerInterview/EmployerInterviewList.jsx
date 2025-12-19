import React, { useMemo, useState } from 'react';
import { View, FlatList , Text, TouchableOpacity } from 'react-native';
import InterviewCard from './InterviewCard';
import MobileUnsupportedModal from './MobileUnsupportedModal';
import infosys from '../../assets/images/infosys.jpg'
import { API_BASE_URL } from '../../config/api';
const EmployerInterviewList = ({ onShowUnsupported , interviews=[]}) => {
  console.log('interviews', interviews)
  // const data = [
  //   {
  //     id: '1',
  //     logo: require('../../assets/images/infosys.jpg'),
  //     company: 'Infosys',
  //     role: 'React Native Developer',
  //     isExpired: true,
  //   },
  //   {
  //     id: '2',
  //     logo: require('../../assets/images/accenture.jpg'),
  //     company: 'Accenture',
  //     role: 'UX Designer',
  //     hasCoding: true,
  //   },
  //   {
  //     id: '3',
  //     logo: require('../../assets/images/zoho.png'),
  //     company: 'Zoho',
  //     role: 'UI Designer',
  //     hasCoding: true,
  //   },
  //   {
  //     id: '4',
  //     logo: require('../../assets/images/sutherland.png'),
  //     company: 'Sutherland',
  //     role: 'Software Engineer',
  //     hasCoding: true,
  //   },
  // ];

  
  const PAGE_SIZE = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(interviews.length / PAGE_SIZE);

  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * PAGE_SIZE;
    return interviews.slice(start, start + PAGE_SIZE);
  }, [interviews, currentPage]);

 const renderPagination = () => {
    if (totalPages <= 1) return null;

    return (
      <View style={styles.paginationContainer}>
        {/* Previous */}
        <TouchableOpacity
          disabled={currentPage === 1}
          onPress={() => setCurrentPage(p => p - 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>{'<'}</Text>
        </TouchableOpacity>

        {/* Page Numbers */}
        {Array.from({ length: totalPages }).map((_, index) => {
          const page = index + 1;
          const isActive = page === currentPage;

          return (
            <TouchableOpacity
              key={page}
              onPress={() => setCurrentPage(page)}
              style={[
                styles.pageButton,
                isActive && styles.activePage,
              ]}
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

        {/* Next */}
        <TouchableOpacity
          disabled={currentPage === totalPages}
          onPress={() => setCurrentPage(p => p + 1)}
          style={styles.pageButton}
        >
          <Text style={styles.pageText}>{'>'}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, paddingTop: 24 }}>
      <FlatList
        data={paginatedData}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => {
          const logoPath = item?.companyId?.companyLogo?.logo;

          const logoUrl = logoPath
            ? `${API_BASE_URL}/openProfpic?photo=${logoPath}`
            : null;
          
           return (
           <InterviewCard
            companyLogo={ logoUrl
                  ? { uri: logoUrl }
                  : infosys}
            companyName={item.companyId.company_name}
            role={item.job_title}
            isExpired={item.status}
            hasCoding={item.hasCoding}
            onStartPress={onShowUnsupported}
          />
            )
        }}
        
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 30 }}
         ListEmptyComponent={
          <View style={{ alignItems: 'center', marginTop: 40 }}>
            <Text>No interviews available</Text>
          </View>
        }
        // ListFooterComponent={
        //   page * PAGE_SIZE < interviews.length ? (
        //     <Text style={{ textAlign: 'center', paddingVertical: 16 }}>
        //       Loading more...
        //     </Text>
        //   ) : null
        // }
      />
       {renderPagination()}
    </View>
  );
};

export default EmployerInterviewList;
const styles = {
  paginationContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 16,
  },
  pageButton: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    marginHorizontal: 4,
    borderRadius: 6,
    backgroundColor: '#eee',
  },
  activePage: {
    backgroundColor: '#0069FF',
  },
  pageText: {
    color: '#333',
    fontSize: 14,
  },
  activePageText: {
    color: '#fff',
    fontWeight: 'bold',
  },
};
