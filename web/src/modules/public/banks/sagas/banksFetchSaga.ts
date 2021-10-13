import { call, put } from 'redux-saga/effects';
import { sendError } from 'src/modules/public/errorHandler';
import { API, RequestOptions } from 'src/api';
import { banksData, banksError } from '../actions';

const banksOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* banksFetchSaga() {
    try {
        const banks = yield call(API.get(banksOptions), '/bank/list');
        yield put(banksData(banks));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: banksError,
            },
        }));
    }
}

