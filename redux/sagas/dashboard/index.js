import { all, call, put, takeLatest } from "redux-saga/effects";
import { ApiClient } from "../../../utilities/api";
import {
  onErrorStopLoad,
  setGetAllOrderDeliveries,
  setGetTodaySales,
  setGetDrawerSessionInfo,
  setGetPosLoginDetails,
  setGetProfile
} from "../../slices/dashboard";
import { toast } from "react-toastify";
import { ORDER_API_URL, AUTH_API_URL } from "../../../utilities/config"

// Worker saga will be fired on USER_FETCH_REQUESTED actions

function* getAllOrderDeliveries(action) {
  const dataToSend = { ...action.payload }
  delete dataToSend.cb
  try {
    const resp = yield call(ApiClient.get, (`${ORDER_API_URL}/api/v1/orders?seller_id=${action.payload.seller_id}`));
    if (resp.status) {
      yield put(setGetAllOrderDeliveries(resp.data));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp?.data?.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e?.error?.response?.data?.msg);
  }
}

function* getTodaySales(action) {
  const dataToSend = { ...action.payload }
  delete dataToSend.cb
  try {
    const resp = yield call(ApiClient.get, (`${ORDER_API_URL}/api/v1/orders/pos/transaction-count?seller_id=${action.payload.seller_id}&filter=${action.payload.filter}`));
    if (resp.status) {
      yield put(setGetTodaySales(resp.data));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp?.data?.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e?.error?.response?.data?.msg);
  }
}

function* getDrawerSessionInfo(action) {
  // const dataToSend = { ...action.payload }
  // delete dataToSend.cb
  try {
    const resp = yield call(ApiClient.post, (`${AUTH_API_URL}/api/v1/drawer_management/drawer-session`), (action.payload = action.payload))
    if (resp.status) {
      yield put(setGetDrawerSessionInfo(resp.data));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp?.data?.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e?.error?.response?.data?.msg);
  }
}

function* getPosLoginDetails(action) {
  const dataToSend = { ...action.payload }
  delete dataToSend.cb
  try {
    const resp = yield call(ApiClient.get, (`${AUTH_API_URL}/api/v1/users/pos/login-details`))
    if (resp.status) {
      yield put(setGetPosLoginDetails(resp.data));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp?.data?.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e?.error?.response?.data?.msg);
  }
}

function* getProfile(action) {
  const dataToSend = { ...action.payload }
  delete dataToSend.cb
  try {
    const resp = yield call(ApiClient.get, (`${AUTH_API_URL}/api/v1/users/${action.payload.id}`))
    if (resp.status) {
      yield put(setGetProfile(resp.data));
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp?.data?.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e?.error?.response?.data?.msg);
  }
}

function* getOrderDetailsById(action) {
  console.log(action,"actioneeeeeeeeeeeee");
  const dataToSend = { ...action.payload }
  console.log(action,'data to send');
  delete dataToSend.cb
  try {
    const resp = yield call(ApiClient.get, (`${ORDER_API_URL}/api/v1/orders/${action.payload.id}`));
    if (resp.status) {
      yield call(action.payload.cb, (action.res = resp));
      // toast.success(resp?.data?.msg);
    }
    else {
      throw resp
    }
  } catch (e) {
    yield put(onErrorStopLoad())
    toast.error(e?.error?.response?.data?.msg);
  }
}

function* dashboardSaga() {
  yield all([
    takeLatest("dashboard/getAllOrderDeliveries", getAllOrderDeliveries),
    takeLatest("dashboard/getTodaySales", getTodaySales),
    takeLatest("dashboard/getDrawerSessionInfo", getDrawerSessionInfo),
    takeLatest("dashboard/getPosLoginDetails", getPosLoginDetails),
    takeLatest("dashboard/getProfile", getProfile),
    takeLatest("dashboard/getOrderDetailsById", getOrderDetailsById),
  ]);
}

export default dashboardSaga;
