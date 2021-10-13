import { call, put } from 'redux-saga/effects';
import { sendError } from 'src/modules/public/errorHandler';
import { API, RequestOptions } from 'src/api';
import { integrationData, integrationError, IntegrationFetch } from '../actions';
import { buildQueryString } from 'src/helpers';

const integrationOptions: RequestOptions = {
    apiVersion: 'applogic',
};

export function* integrationFetchSaga(action: IntegrationFetch) {
    try {
        let params = '';
        if (action.payload) {
            params = `?${buildQueryString(action.payload)}`;
        }

        const integration = yield call(API.get(integrationOptions), `/management/integration_settings${params}`);
        yield put(integrationData(integration));
    } catch (error) {
        yield put(sendError({
            error,
            processingType: 'alert',
            extraOptions: {
                actionError: integrationError,
            },
        }));
    }
}

