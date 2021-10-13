import { LOOKUP_DATA, LOOKUP_ERROR, LOOKUP_FETCH } from './constants';
import { Lookup } from './types';

export interface LookupFetch {
    type: typeof LOOKUP_FETCH;
    payload: {
        bank_code: string;
        account_no: string;
    }
}

export interface LookupData {
    type: typeof LOOKUP_DATA;
    payload: Lookup;
}

export interface LookupError {
    type: typeof LOOKUP_ERROR;
}

export type LookupAction =
    LookupFetch
    | LookupData
    | LookupError

export const lookupFetch = (payload: LookupFetch['payload']): LookupFetch => ({
    payload,
    type: LOOKUP_FETCH,
});

export const lookupData = (payload: LookupData['payload']): LookupData => ({
    payload,
    type: LOOKUP_DATA,
});

export const lookupError = (): LookupError => ({
    type: LOOKUP_ERROR,
});