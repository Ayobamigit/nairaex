import { takeEvery } from 'redux-saga/effects';
import { INTEGRATION_FETCH } from '../constants';
import { integrationFetchSaga } from './integrationFetchSaga';

export function* rootIntegrationSaga() {
    yield takeEvery(INTEGRATION_FETCH, integrationFetchSaga);
}
