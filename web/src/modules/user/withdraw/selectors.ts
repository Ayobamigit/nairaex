import { RootState } from '../../';
import { WithdrawState } from './reducer';

export const selectWithdrawFiatData = (state: RootState): WithdrawState['data'] =>
    state.user.withdraw?.data;

export const selectWithdrawFiatLoading = (state: RootState): WithdrawState['loading'] =>
    state.user.withdraw.loading;

export const selectWithdrawFiatSuccess = (state: RootState): WithdrawState['success'] =>
    state.user.withdraw.success;

export const selectWithdrawFiatError = (state: RootState): WithdrawState['error'] =>
    state.user.withdraw.error;
