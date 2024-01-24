import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  allCustomersData: {},
  allCustomersList: {},
  sellerAreaList: {},
  userDetailsAndOrder: {},
  userMarketingStatus: { userId: null, status: false },
  loading: false,
};

export const customersSlice = createSlice({
  name: "customers",
  initialState,
  reducers: {
    getAllCustomers: (state) => {
      state.loading = true;
    },
    setAllCustomers: (state, action) => {
      state.loading = false;
      state.allCustomersData = action?.payload;
    },
    getAllCustomersList: (state) => {
      state.loading = true;
    },
    setAllCustomersList: (state, action) => {
      state.loading = false;
      state.allCustomersList = action?.payload;
    },
    getSellerAreaList: (state) => {
      state.loading = true;
    },
    setSellerAreaList: (state, action) => {
      state.loading = true;
      state.sellerAreaList = action.payload;
    },
    getUserDetailsAndOrders: (state) => {
      state.loading = true;
    },
    setUserDetailsAndOrders: (state, action) => {
      state.loading = false;
      state.userDetailsAndOrder = action.payload;
    },
    getUserMarketingStatus: (state) => {
      state.loading = true;
    },
    setUserMarketingStatus: (state, action) => {
      state.loading = false;
      state.userMarketingStatus = action.payload;
    },
    onErrorStopLoad: (state) => {
      state.loading = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getAllCustomers,
  setAllCustomers,
  onErrorStopLoad,
  getSellerAreaList,
  setSellerAreaList,
  getAllCustomersList,
  setAllCustomersList,
  getUserDetailsAndOrders,
  setUserDetailsAndOrders,
  getUserMarketingStatus,
  setUserMarketingStatus,
} = customersSlice.actions;

export const selectCustomersData = (state) => state.customers;

export default customersSlice.reducer;
