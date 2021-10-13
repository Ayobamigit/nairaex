import { RootState } from '../../';
import { LookupState } from './reducer';

export const selectLookupData = (state: RootState): LookupState['data'] =>
    state.public.lookup?.data;

export const selectLookupLoading = (state: RootState): LookupState['loading'] =>
    state.public.lookup.loading;

export const selectLookupSuccess = (state: RootState): LookupState['success'] =>
    state.public.lookup.success;

export const selectLookupError = (state: RootState): LookupState['error'] =>
    state.public.lookup.error;
