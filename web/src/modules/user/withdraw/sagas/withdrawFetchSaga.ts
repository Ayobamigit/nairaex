import { call, put } from 'redux-saga/effects';
import { sendError } from 'src/modules/public/errorHandler';
import { API, RequestOptions } from 'src/api';
import {
    WithdrawFetch,
    withdrawData,
    withdrawError,
} from '../actions';
import { alertPush, withdrawAllowClear } from 'src/modules';
import { getCsrfToken } from 'src/helpers';

const withdrawOptions = (csrfToken?: string): RequestOptions => ({
    apiVersion: 'applogic',
    headers: { 'X-CSRF-Token': csrfToken },
});

export function* withdrawFetchSaga(action: WithdrawFetch) {
    try {
        const withdraw = yield call(API.post(withdrawOptions(getCsrfToken())), '/management/withdraws/new', action.payload);
        yield put(withdrawData(withdraw));
        yield put(withdrawAllowClear());
        yield put(alertPush({message: ['success.withdraw.action'], type: 'success'}));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: withdrawError,
            },
        }));
    }
}
