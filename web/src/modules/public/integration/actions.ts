import { Integration } from './types';
import { INTEGRATION_DATA, INTEGRATION_ERROR, INTEGRATION_FETCH } from './constants';

export interface IntegrationFetch {
    type: typeof INTEGRATION_FETCH;
    payload: {
        currency: string;
    }
}

export interface IntegrationData {
    type: typeof INTEGRATION_DATA;
    payload: Integration;
}

export interface IntegrationError {
    type: typeof INTEGRATION_ERROR;
}

export type IntegrationAction =
    IntegrationFetch
    | IntegrationData
    | IntegrationError

export const integrationFetch = (payload: IntegrationFetch['payload']): IntegrationFetch => ({
    payload,
    type: INTEGRATION_FETCH,
});

export const integrationData = (payload: IntegrationData['payload']): IntegrationData => ({
    payload,
    type: INTEGRATION_DATA,
});

export const integrationError = (): IntegrationError => ({
    type: INTEGRATION_ERROR,
});