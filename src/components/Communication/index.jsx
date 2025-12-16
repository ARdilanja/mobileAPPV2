import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import StatsSection from './StatsSection'
import PercentageCard from './PercentageCard'
import ContentSection from './ContentSection'
import CommunicationFilters from './CommunicationFilters'

const Communication = () => {
    const [activeFilter, setActiveFilter] = useState("All");
    return (
        <View>
            <StatsSection />
            <PercentageCard />
            <CommunicationFilters
                activeFilter={activeFilter}
                setActiveFilter={setActiveFilter}
            />

            <ContentSection activeFilter={activeFilter} />
        </View>
    )
}

export default Communication

const styles = StyleSheet.create({})