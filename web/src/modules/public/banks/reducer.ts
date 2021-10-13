import { BanksAction } from './actions';
import { BANKS_DATA, BANKS_ERROR, BANKS_FETCH } from './constants';
import { BeneficiaryBank } from 'src/modules';

export interface BanksState {
    list: BeneficiaryBank[];
    loading: boolean;
    success: boolean;
    error: boolean;
}

export const initialBanksState: BanksState = {
    list: [],
    loading: false,
    success: false,
    error: false,
};

export const banksReducer = (state = initialBanksState, action: BanksAction) => {
    switch (action.type) {
        case BANKS_FETCH:
            return {
                ...state,
                success: false,
                error: false,
                loading: true,
            };
        case BANKS_DATA:
            return {
                ...state,
                list: action.payload,
                success: true,
                loading: false,
            };
        case BANKS_ERROR:
            return {
                ...state,
                list: [],
                error: true,
                loading: false,
            };
        default:
            return state;
    }
};
