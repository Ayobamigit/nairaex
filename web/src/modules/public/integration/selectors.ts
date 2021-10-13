import { RootState } from '../../';
import { IntegrationState } from './reducer';

export const selectIntegration = (state: RootState): IntegrationState['integration_params'] =>
    state.public.integration?.integration_params;

export const selectIntegrationLoading = (state: RootState): IntegrationState['loading'] =>
    state.public.integration.loading;

export const selectIntegrationSuccess = (state: RootState): IntegrationState['success'] =>
    state.public.integration.success;

export const selectIntegrationError = (state: RootState): IntegrationState['error'] =>
    state.public.integration.error;
