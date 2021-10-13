import { CommonError } from '../../types';
import {
    P2P_WALLETS_FETCH,
    P2P_WALLETS_DATA,
    P2P_WALLETS_ERROR,
    P2P_WALLETS_DATA_WS,
    SET_MOBILE_WALLET_UI,
    WALLETS_ADDRESS_DATA,
    WALLETS_ADDRESS_DATA_WS,
    WALLETS_ADDRESS_ERROR,
    WALLETS_ADDRESS_FETCH,
    WALLETS_DATA,
    WALLETS_DATA_WS,
    WALLETS_ERROR,
    WALLETS_FETCH,
    WALLETS_RESET,
    WALLETS_WITHDRAW_CCY_DATA,
    WALLETS_WITHDRAW_CCY_ERROR,
    WALLETS_WITHDRAW_CCY_FETCH,
    WITHDRAW_ALLOW_DATA,
    WITHDRAW_ALLOW_ERROR,
    WITHDRAW_ALLOW_FETCH,
    WITHDRAW_ALLOW_CLEAR,
} from './constants';
import { Wallet, WalletAddress, WalletWithdrawCCY } from './types';
import { Beneficiary } from 'src/modules';

export interface WalletsFetch {
    type: typeof WALLETS_FETCH;
}

export interface WalletsData {
    type: typeof WALLETS_DATA;
    payload: Wallet[];
}

export interface WalletsDataByRanger {
    type: typeof WALLETS_DATA_WS;
    payload: {
        ws: boolean;
        balances;
    };
}

export interface WalletsError {
    type: typeof WALLETS_ERROR;
    error: CommonError;
}

export interface WalletsReset {
    type: typeof WALLETS_RESET;
}

export interface WalletsAddressFetch {
    type: typeof WALLETS_ADDRESS_FETCH;
    payload: {
        currency: string;
    };
}

export interface WalletsAddressData {
    type: typeof WALLETS_ADDRESS_DATA;
    payload: WalletAddress;
}

export interface WalletsAddressDataWS {
    type: typeof WALLETS_ADDRESS_DATA_WS;
    payload: WalletAddress;
}

export interface WalletsAddressError {
    type: typeof WALLETS_ADDRESS_ERROR;
    error: CommonError;
}

export interface WalletsWithdrawCcyFetch {
    type: typeof WALLETS_WITHDRAW_CCY_FETCH;
    payload: WalletWithdrawCCY;
}

export interface WalletsWithdrawCcyData {
    type: typeof WALLETS_WITHDRAW_CCY_DATA;
}

export interface WalletsWithdrawCcyError {
    type: typeof WALLETS_WITHDRAW_CCY_ERROR;
    error: CommonError;
}

export interface SetMobileWalletUi {
    type: typeof SET_MOBILE_WALLET_UI;
    payload: string;
}

export interface P2PWalletsFetch {
    type: typeof P2P_WALLETS_FETCH;
}

export interface P2PWalletsData {
    type: typeof P2P_WALLETS_DATA;
    payload: Wallet[];
}

export interface P2PWalletsError {
    type: typeof P2P_WALLETS_ERROR;
    error: CommonError;
}

export interface P2PWalletsDataByRanger {
    type: typeof P2P_WALLETS_DATA_WS;
    payload: {
        ws: boolean;
        balances;
    };
}

export interface WithdrawAllowFetch {
    type: typeof WITHDRAW_ALLOW_FETCH,
    payload: {
        amount: string;
        beneficiary: Beneficiary;
        otpCode: string;
        total: string;
        fee: string;
    };
}

export interface WithdrawAllowData {
    type: typeof WITHDRAW_ALLOW_DATA
    payload:{
        status: number;
        amount: string;
        beneficiary: Beneficiary;
        otpCode: string;
        total: string;
        fee: string;
    };
}

export interface WithdrawAllowError {
    type: typeof WITHDRAW_ALLOW_ERROR
}

export interface WithdrawAllowClear {
    type: typeof WITHDRAW_ALLOW_CLEAR
}

export type WalletsAction = WalletsFetch
    | WalletsData
    | WalletsDataByRanger
    | WalletsError
    | WalletsAddressFetch
    | WalletsAddressData
    | WalletsAddressDataWS
    | WalletsAddressError
    | WalletsWithdrawCcyFetch
    | WalletsWithdrawCcyData
    | WalletsWithdrawCcyError
    | WalletsReset
    | SetMobileWalletUi
    | P2PWalletsFetch
    | P2PWalletsData
    | P2PWalletsError
    | P2PWalletsDataByRanger
    | WithdrawAllowFetch
    | WithdrawAllowData
    | WithdrawAllowError
    | WithdrawAllowClear;

export const walletsFetch = (): WalletsFetch => ({
    type: WALLETS_FETCH,
});

export const walletsData = (payload: WalletsData['payload']): WalletsData => ({
    type: WALLETS_DATA,
    payload,
});

export const updateWalletsDataByRanger = (payload: WalletsDataByRanger['payload']): WalletsDataByRanger => ({
    type: WALLETS_DATA_WS,
    payload,
});

export const walletsError = (error: CommonError): WalletsError => ({
    type: WALLETS_ERROR,
    error,
});

export const walletsAddressFetch = (payload: WalletsAddressFetch['payload']): WalletsAddressFetch => ({
    type: WALLETS_ADDRESS_FETCH,
    payload,
});

export const walletsAddressData = (payload: WalletsAddressData['payload']): WalletsAddressData => ({
    type: WALLETS_ADDRESS_DATA,
    payload,
});

export const walletsAddressError = (error: CommonError): WalletsAddressError => ({
    type: WALLETS_ADDRESS_ERROR,
    error,
});

export const walletsAddressDataWS = (payload: WalletsAddressDataWS['payload']): WalletsAddressDataWS => ({
    type: WALLETS_ADDRESS_DATA_WS,
    payload,
});

export const walletsWithdrawCcyFetch = (payload: WalletsWithdrawCcyFetch['payload']): WalletsWithdrawCcyFetch => ({
    type: WALLETS_WITHDRAW_CCY_FETCH,
    payload,
});

export const walletsWithdrawCcyData = (): WalletsWithdrawCcyData => ({
    type: WALLETS_WITHDRAW_CCY_DATA,
});

export const walletsWithdrawCcyError = (error: CommonError): WalletsWithdrawCcyError => ({
    type: WALLETS_WITHDRAW_CCY_ERROR,
    error,
});

export const walletsReset = (): WalletsReset => ({
    type: WALLETS_RESET,
});

export const setMobileWalletUi = (payload: SetMobileWalletUi['payload']): SetMobileWalletUi => ({
    type: SET_MOBILE_WALLET_UI,
    payload,
});

export const p2pWalletsFetch = (): P2PWalletsFetch => ({
    type: P2P_WALLETS_FETCH,
});

export const p2pWalletsData = (payload: P2PWalletsData['payload']): P2PWalletsData => ({
    type: P2P_WALLETS_DATA,
    payload,
});

export const p2pWalletsError = (error: CommonError): P2PWalletsError => ({
    type: P2P_WALLETS_ERROR,
    error,
});

export const updateP2PWalletsDataByRanger = (payload: P2PWalletsDataByRanger['payload']): P2PWalletsDataByRanger => ({
    type: P2P_WALLETS_DATA_WS,
    payload,
});

export const withdrawAllowFetch = (payload: WithdrawAllowFetch['payload']): WithdrawAllowFetch => ({
    type: WITHDRAW_ALLOW_FETCH,
    payload,
});

export const withdrawAllowData = (payload: WithdrawAllowData['payload']): WithdrawAllowData => ({
    type: WITHDRAW_ALLOW_DATA,
    payload,
});

export const withdrawAllowError = (): WithdrawAllowError => ({
    type: WITHDRAW_ALLOW_ERROR,
});

export const withdrawAllowClear = (): WithdrawAllowClear => ({
    type: WITHDRAW_ALLOW_CLEAR,
});
