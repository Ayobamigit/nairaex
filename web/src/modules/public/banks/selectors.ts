import { RootState } from '../../';
import { BanksState } from './reducer';

export const selectBanks = (state: RootState): BanksState['list'] =>
    state.public.banks.list;

export const selectBanksLoading = (state: RootState): BanksState['loading'] =>
    state.public.banks.loading;

export const selectBanksSuccess = (state: RootState): BanksState['success'] =>
    state.public.banks.success;

export const selectBanksError = (state: RootState): BanksState['error'] =>
    state.public.banks.error;
