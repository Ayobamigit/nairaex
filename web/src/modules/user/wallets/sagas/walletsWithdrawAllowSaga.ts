import { call, put } from 'redux-saga/effects';
import { sendError } from 'src/modules/public/errorHandler'
import { withdrawAllowData, withdrawAllowError, WithdrawAllowFetch } from '../actions';
import { API, RequestOptions } from '../../../../api';
import { getCsrfToken } from 'src/helpers';

const withdrawAllowOptions = (csrfToken?: string): RequestOptions => ({
    apiVersion: 'applogic',
    headers: { 'X-CSRF-Token': csrfToken },
});

export function* withdrawAllowSaga(action: WithdrawAllowFetch) {
    try {
        const payload = {
            amount: action.payload.amount,
            currency: action.payload.beneficiary.currency,
        }

        const status = yield call(API.post(withdrawAllowOptions(getCsrfToken())), '/management/withdraws/check_amount', payload);
        yield put(withdrawAllowData({...action.payload, status}));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: withdrawAllowError,
            },
        }));
    }
}
