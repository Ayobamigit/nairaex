import { WithdrawAction } from './actions';
import { WithdrawDataPayload } from './types';
import { WITHDRAW_FETCH, WITHDRAW_DATA, WITHDRAW_ERROR } from './constants';

export interface WithdrawState {
    data: Array<WithdrawDataPayload>;
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const initialWithdrawState: WithdrawState = {
    data: [],
    loading: false,
    success: false,
    error: false,
};

export const withdrawReducer = (state = initialWithdrawState, action: WithdrawAction) => {
    switch (action.type) {
        case WITHDRAW_FETCH:
            return {
                ...state,
                success: false,
                error: false,
                loading: true,
            };
        case WITHDRAW_DATA:
            return {
                ...state,
                data: [...state.data, action.payload],
                success: true,
                loading: false,
            };
        case WITHDRAW_ERROR:
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
