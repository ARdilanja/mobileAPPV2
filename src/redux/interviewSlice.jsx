// import { createSlice } from "@reduxjs/toolkit";

// const interviewSlice = createSlice({
//     name: "interview",
//     initialState: {
//         answers: [],
//     },
//     reducers: {
//         saveAnswer: (state, action) => {
//             state.answers.push(action.payload);
//             console.log("📦 [REDUX] Saved Answer:", action.payload);
//         },
//         resetInterview: (state) => {
//             state.answers = [];
//         },
//     },
// });

// export const { saveAnswer, resetInterview } = interviewSlice.actions;
// export default interviewSlice.reducer;




import { createSlice } from "@reduxjs/toolkit";

const interviewSlice = createSlice({
    name: "interview",
    initialState: {
        answers: [],
    },
    reducers: {
        saveAnswer: (state, action) => {
            // Payload includes: questionId, questionText, answer, startTime, endTime, followUpIndex, isFollowUp
            state.answers.push(action.payload);
            console.log("📦 [REDUX] Saved Step:", action.payload);
        },
        resetInterview: (state) => {
            state.answers = [];
        },
    },
});

export const { saveAnswer, resetInterview } = interviewSlice.actions;
export default interviewSlice.reducer;