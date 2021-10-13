import { takeEvery } from 'redux-saga/effects';
import { BANKS_FETCH } from '../constants';
import { banksFetchSaga } from './banksFetchSaga';

export function* rootBanksSaga() {
    yield takeEvery(BANKS_FETCH, banksFetchSaga);
}
