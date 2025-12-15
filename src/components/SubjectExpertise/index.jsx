import React from "react";
import { View } from "react-native";

import StatsSection from "./StatsSection";
import QuestionCard from "./QuestionCard";
import Filters from "./Filters";
import ContentSection from "./ContentSection";
import { SECTION_ORDER } from "./contentData";

export default function SubjectExpertise({
    activePage,
    setActivePage,
}) {
    const activeFilter = SECTION_ORDER[activePage - 1];

    return (
        <View>
            <StatsSection />
            <QuestionCard />

            <Filters
                activeFilter={activeFilter}
                setActiveFilter={(filter) =>
                    setActivePage(
                        SECTION_ORDER.indexOf(filter) + 1
                    )
                }
            />

            <ContentSection activeFilter={activeFilter} />
        </View>
    );
}
