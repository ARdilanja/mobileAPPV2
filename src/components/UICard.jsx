import Text from "../../Text";

import { View, Image, Button } from "react-native";
import react, { useState } from "react";
import assets from "../../../assets";
import { isEmpty } from "lodash";

const NoData = () => {
    return null;
};

export default function UICard({
    dataValue,
    dataType,
    score,
    jobData,
    type,
    cardType,
    usedAt,
    tickType,
}) {
    const [showMore, setShowMore] = useState(false);

    console.log(jobData, "jobDataaa");
    const handleSeeMoreClick = () => {
        setShowMore(!showMore);
        // setDataToShow(data);
    };

    const DisplayData = (props) => {
        console.log(props.dataToShow, "dfsdfsd");
        const data =
            props.card === "strength"
                ? props.dataToShow.slice(0, 2)
                : props.dataToShow;
        return (
            <View style={{ paddingBottom: 15 }}>
                {data.map((recommendation, idx) => (
                    <View
                        style={{
                            marginVertical: 5,
                        }}
                    >
                        <View style={{ flexDirection: "row" }}>
                            <Image
                                source={assets.checked}
                                style={{
                                    width: 12,
                                    height: 12,
                                    marginTop: 3,
                                    marginRight: 7,

                                    tintColor: "#121212",
                                }}
                            />

                            <Text style={{ flex: 1 }}>{recommendation}</Text>
                        </View>
                    </View>
                ))}
            </View>
        );
    };

    return (
        <>
            {cardType === "area_of_improvement" ? (
                <>
                    {/* <View style={{flexDirection:"row"}}>
            <Image
              src={{uri:"https://recroot.io/_next/image?url=%2FCandidateCards%2Fstrengths-icon.png&w=32&q=75"}}
              style={{ height: 30,width:30 }}
            />
            <Text>Areas of Improvement</Text>
          </View> */}
                    <View
                        sx={{
                            mt: "15px",
                        }}
                    >
                        {console.log("areeeea", !isEmpty(jobData))}
                        <View container spacing={1} sx={{ justifyContent: "center" }}>
                            {!isEmpty(jobData) > 0 ? (
                                Object.keys(jobData).map(
                                    (item, idx) =>
                                        !isEmpty(jobData[item].Recommendations) && (
                                            <View item xs={12} sm={6} md={4} key={item} style={{
                                                borderWidth: 1,
                                                borderColor: "#d9d9d9",
                                                paddingHorizontal: 10,
                                                marginVertical: 5,
                                                borderRadius: 5,
                                            }}>
                                                <View container spacing={1}>
                                                    <View
                                                        item
                                                        style={{
                                                            marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#d9d9d9", paddingBottom: 10,
                                                            marginBottom: 7,

                                                        }}
                                                    >
                                                        <Text bold>{item}</Text>
                                                    </View>
                                                    <DisplayData
                                                        dataToShow={jobData[item].Recommendations}
                                                        type={tickType}
                                                    />
                                                </View>
                                            </View>
                                        )
                                )
                            ) : (
                                <NoData warningMessage="No Suggestions Found!" />
                            )}
                        </View>
                    </View>
                </>
            ) : cardType === "actionable_recommendations" ? (
                <>
                    {/* <View style={{flexDirection:"row"}}>
            <Image
              src={"/CandidateCards/actionable-recommendation-icon.png"}
              alt=""
              height={20}
              width={20}
              style={{ height: "30px", width: "30px" }}
            />
            <Text>Recommendation</Text>
          </View> */}
                    <View
                        sx={{
                            mt: "15px",
                        }}
                    >
                        <View>
                            {!isEmpty(jobData) > 0 ? (
                                Object.keys(jobData).map(
                                    (item, idx) =>
                                        !isEmpty(jobData[item].Resources) && (
                                            <View
                                                style={{
                                                    borderWidth: 1,
                                                    borderColor: "#d9d9d9",
                                                    paddingHorizontal: 10,
                                                    marginVertical: 5,
                                                    borderRadius: 5,
                                                }}
                                            >
                                                <View container spacing={1}>
                                                    <View
                                                        item
                                                        style={{
                                                            marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#d9d9d9", paddingBottom: 10,
                                                            marginBottom: 7,
                                                        }}
                                                    >
                                                        <Text bold>{item}</Text>
                                                    </View>
                                                    <DisplayData
                                                        dataToShow={jobData[item].Resources}
                                                        type={tickType}
                                                    />
                                                </View>
                                            </View>
                                        )
                                )
                            ) : (
                                <NoData warningMessage="No Suggestions Found!" />
                            )}
                        </View>
                    </View>
                </>
            ) : (
                <>
                    {/* <View style={{flexDirection:"row"}}>
            <Image
              src={"https://recroot.io/_next/image?url=%2FCandidateCards%2Factionable-recommendation-icon.png&w=32&q=75"}
              alt=""
              height={20}
              width={20}
              style={{ height: "30px", width: "30px" }}
            />
            <Text>Strengths</Text>
          </View> */}
                    <View
                        sx={{
                            mt: "15px",
                        }}
                    >
                        <View container spacing={1} sx={{ justifyContent: "center" }}>
                            {!isEmpty(
                                jobData.filter(
                                    (item) =>
                                        item.goodareas.length > 0 && item.goodareas[0] !== "N/A"
                                )
                            ) ? (
                                jobData
                                    .filter(
                                        (item) =>
                                            item.goodareas.length > 0 && item.goodareas[0] !== "N/A"
                                    )

                                    .map((item, idx) => (
                                        <View item xs={12} sm={6} md={4} key={item} style={{
                                            borderWidth: 1,
                                            borderColor: "#d9d9d9",
                                            paddingHorizontal: 10,
                                            marginVertical: 5,
                                            borderRadius: 5,
                                        }}>
                                            <View container spacing={1}>
                                                <View
                                                    style={{
                                                        marginTop: 10, borderBottomWidth: 1, borderBottomColor: "#d9d9d9", paddingBottom: 10,
                                                        marginBottom: 7,
                                                    }}
                                                >
                                                    <Text
                                                        bold
                                                        sx={{
                                                            fontSize: "16px",
                                                            fontWeight: 600,
                                                            color: "#567FC5",
                                                        }}
                                                    >
                                                        {item?.section}
                                                    </Text>
                                                </View>
                                                <DisplayData
                                                    dataToShow={item?.goodareas}
                                                    type={tickType}
                                                    card={"strength"}
                                                />
                                            </View>
                                        </View>
                                    ))
                            ) : (
                                <NoData warningMessage="No Suggestions Found!" />
                            )}
                        </View>
                    </View>
                </>
            )}
        </>
    );
}