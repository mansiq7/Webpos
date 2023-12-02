import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    orderDeliveries: "",
    todaySales:"",
    drawerSession:"",
    loading: false,
};

export const dashboardSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        getAllOrderDeliveries: (state) => {
            state.loading = true;
        },
        setGetAllOrderDeliveries: (state, action) => {
            state.loading = false;
            state.orderDeliveries = action?.payload
        },
        getTodaySales: (state) => {
            state.loading = true;
        },
        setGetTodaySales: (state, action) => {
            state.loading = false;
            state.todaySales = action?.payload
        },
        getDrawerSessionInfo: (state) => {
            state.loading = true;
        },
        setGetDrawerSessionInfo: (state, action) => {
            state.loading = false;
            state.drawerSession = action?.payload
        },
        getPosLoginDetails: (state) => {
            state.loading = true;
        },
        setGetPosLoginDetails: (state, action) => {
            state.loading = false;
        },
        dashboardLogout: (state) => {
            state.orderDeliveries = "";
            state.todaySales = "";
            state.drawerSession = "";
            state.loading= false;
          },
        onErrorStopLoad: (state) => {
            state.loading = false;
        },
    },
});

// Action creators are generated for each case reducer function
export const {
    getAllOrderDeliveries,
    setGetAllOrderDeliveries,
    getTodaySales,
    setGetTodaySales,
    getDrawerSessionInfo,
    setGetDrawerSessionInfo,
    getPosLoginDetails,
    setGetPosLoginDetails,
    dashboardLogout,
    onErrorStopLoad
} = dashboardSlice.actions;

export const dashboardDetails = (state) => state.dashboard;

export default dashboardSlice.reducer;


