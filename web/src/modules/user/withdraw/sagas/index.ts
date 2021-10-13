import { takeEvery } from 'redux-saga/effects';
import { WITHDRAW_FETCH } from '../constants';
import { withdrawFetchSaga } from './withdrawFetchSaga';

export function* rootWithdrawSaga() {
    yield takeEvery(WITHDRAW_FETCH, withdrawFetchSaga);
}
