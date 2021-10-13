import { takeEvery } from 'redux-saga/effects';
import { LOOKUP_FETCH } from '../constants';
import { lookupFetchSaga } from './lookupFetchSaga';

export function* rootLookupSaga() {
    yield takeEvery(LOOKUP_FETCH, lookupFetchSaga);
}
