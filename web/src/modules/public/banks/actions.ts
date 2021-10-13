import { BANKS_DATA, BANKS_ERROR, BANKS_FETCH } from './constants';
import { BeneficiaryBank } from 'src/modules';

export interface BanksFetch {
    type: typeof BANKS_FETCH;
}

export interface BanksData {
    type: typeof BANKS_DATA;
    payload: BeneficiaryBank[];
}

export interface BanksError {
    type: typeof BANKS_ERROR;
}

export type BanksAction = BanksFetch | BanksData | BanksError;

export const banksFetch = (): BanksFetch => ({
    type: BANKS_FETCH,
});

export const banksData = (payload: BanksData['payload']): BanksData => ({
    payload,
    type: BANKS_DATA,
});

export const banksError = (): BanksError => ({
    type: BANKS_ERROR,
});