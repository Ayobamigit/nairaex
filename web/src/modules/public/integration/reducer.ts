import { IntegrationAction } from './actions';
import { INTEGRATION_DATA, INTEGRATION_ERROR, INTEGRATION_FETCH } from './constants';
import { Integration } from './types';


export interface IntegrationState {
    integration_params: Integration | null;
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const initialIntegrationState: IntegrationState = {
    integration_params: null,
    loading: false,
    success: false,
    error: false
};

export const integrationReducer = (state = initialIntegrationState, action: IntegrationAction) => {
    switch (action.type) {
        case INTEGRATION_FETCH:
            return {
                ...state,
                success: false,
                error: false,
                loading: true,
            };
        case INTEGRATION_DATA:
            return {
                ...state,
                integration_params: action.payload,
                success: true,
                loading: false,
            };
        case INTEGRATION_ERROR:
            return {
                ...state,
                integration_params: null,
                error: true,
                loading: false,
            };
        default:
            return state;
    }
};
