import { WITHDRAW_FETCH, WITHDRAW_DATA, WITHDRAW_ERROR } from './constants';
import { WithdrawPayload, WithdrawDataPayload } from "./types";

export interface WithdrawFetch {
    type: typeof WITHDRAW_FETCH;
    payload: WithdrawPayload;
}

export interface WithdrawData {
    type: typeof WITHDRAW_DATA;
    payload: WithdrawDataPayload;
}

export interface WithdrawError {
    type: typeof WITHDRAW_ERROR;
}

export type WithdrawAction =
    WithdrawFetch
    | WithdrawData
    | WithdrawError;

export const withdrawFetch = (payload: WithdrawFetch['payload']): WithdrawFetch => ({
    type: WITHDRAW_FETCH,
    payload,
});

export const withdrawData = (payload: WithdrawData['payload']): WithdrawData => ({
    type: WITHDRAW_DATA,
    payload,
});

export const withdrawError = (): WithdrawError => ({
    type: WITHDRAW_ERROR,
});