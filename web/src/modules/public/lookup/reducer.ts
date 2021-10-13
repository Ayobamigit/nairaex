import { LookupAction } from './actions';
import { Lookup } from './types';
import { LOOKUP_FETCH, LOOKUP_DATA, LOOKUP_ERROR } from './constants';

export interface LookupState {
    data: Lookup | null;
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const initialLookupState: LookupState = {
    data: null,
    loading: false,
    success: false,
    error: false,
};

export const lookupReducer = (state = initialLookupState, action: LookupAction) => {
    switch (action.type) {
        case LOOKUP_FETCH:
            return {
                ...state,
                success: false,
                error: false,
                loading: true,
            };
        case LOOKUP_DATA:
            return {
                ...state,
                data: action.payload,
                success: true,
                loading: false,
            };
        case LOOKUP_ERROR:
            return {
                ...state,
                data: null,
                error: true,
                loading: false,
            };
        default:
            return state;
    }
};
