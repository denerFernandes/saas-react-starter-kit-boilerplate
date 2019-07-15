import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import request from '../../tools/request';
import {CONST} from "../../env";
import {FETCH_CUSTOMER, NEW_CARD_REQUEST, PAYMENT_REQUEST} from "../constants";

import AuthService from "../services/AuthService";
import {toastr} from "react-redux-toastr";
import StripeService from "../services/StripeService";


export function* paymentSaga(action) {
  let REQUEST_ACTION = PAYMENT_REQUEST;
  const stripeService = new StripeService();

  try {
    yield put(REQUEST_ACTION.request());

    const data = yield stripeService.subscribe(action.payload);

    yield put(REQUEST_ACTION.success(data));
    toastr.success('Success', 'You\'ve been subscibed successfully');
  } catch (e) {
    console.log(e);
    yield put(REQUEST_ACTION.failure(e));
    toastr.error('Failure', e.message);
  } finally {
    yield put(REQUEST_ACTION.fulfill());
  }
}

export function* fetchCustomerSaga() {
  let REQUEST_ACTION = FETCH_CUSTOMER;
  const stripeService = new StripeService();

  try {
    yield put(REQUEST_ACTION.request());

    const data = yield stripeService.customer();

    yield put(REQUEST_ACTION.success(data));
  } catch (e) {
    console.log(e);
    yield put(REQUEST_ACTION.failure(e));
    toastr.error('Failure', e.message);
  } finally {
    yield put(REQUEST_ACTION.fulfill());
  }
}

export function* newCardRequestSaga(action) {
  let REQUEST_ACTION = NEW_CARD_REQUEST;
  const stripeService = new StripeService();

  try {
    yield put(REQUEST_ACTION.request());

    const data = yield stripeService.newCard(action.payload.token);

    toastr.success('Success', 'You can now use this new credit card');
    yield put(REQUEST_ACTION.success(data));
  } catch (e) {
    console.log(e);
    yield put(REQUEST_ACTION.failure(e));
    toastr.error('Failure', e.message);
  } finally {
    yield put(REQUEST_ACTION.fulfill());
  }
}
