import { call, put } from 'redux-saga/effects';
import { sendError } from 'src/modules/public/errorHandler';
import { API, RequestOptions } from 'src/api';
import { lookupData, lookupError, LookupFetch } from '../actions';
import { getCsrfToken } from 'src/helpers';

const lookupOptions = (csrfToken?: string): RequestOptions => ({
    apiVersion: 'applogic',
    headers: { 'X-CSRF-Token': csrfToken },
});

export function* lookupFetchSaga(action: LookupFetch) {
    try {
        const lookup = yield call(API.post(lookupOptions(getCsrfToken())), '/account/lookup', action.payload);
        yield put(lookupData(lookup));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: lookupError,
            },
        }));
    }
}

