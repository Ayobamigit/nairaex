import { call, put } from 'redux-saga/effects';
import { sendError } from '../../../';
import { API, RequestOptions } from '../../../../api';
import { signInRequire2FA } from '../../auth';
import { resetHistory } from '../../history';
import { userOpenOrdersReset } from '../../openOrders';
import { userReset } from '../../profile';
import { logoutError, LogoutFetch } from '../actions';

const requestOptions: RequestOptions = {
    apiVersion: 'barong',
};

export function* logoutSaga(action: LogoutFetch) {
    try {
        console.log("Inside saga 'LOGOUT'");
        yield call(API.delete(requestOptions), '/identity/sessions');
        console.log(1);
        yield put(userReset());
        console.log(2);
        localStorage.removeItem('csrfToken');
        console.log(3);
        yield put(userOpenOrdersReset());
        console.log(4);
        yield put(signInRequire2FA({ require2fa: false }));
        console.log(5);
        yield put(resetHistory());
        console.log(6);
    } catch (error) {
        console.log('Error Logout saga', error);
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: logoutError,
            },
        }));
    }
}
