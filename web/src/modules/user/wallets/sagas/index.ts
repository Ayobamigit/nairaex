import { takeEvery, takeLatest, takeLeading } from 'redux-saga/effects';
import { 
    P2P_WALLETS_FETCH, 
    WALLETS_ADDRESS_FETCH,
    WALLETS_FETCH,
    WALLETS_WITHDRAW_CCY_FETCH,
    WITHDRAW_ALLOW_FETCH,
} from '../constants';
import { walletsAddressSaga } from './walletsAddressSaga';
import { walletsSaga } from './walletsSaga';
import { walletsWithdrawCcySaga } from './walletsWithdrawSaga';
import { p2pWalletsSaga } from './p2pWalletsSaga';
import { withdrawAllowSaga } from './withdrawSaga';


export function* rootWalletsSaga() {
    yield takeLeading(WALLETS_FETCH, walletsSaga);
    yield takeLatest(WALLETS_ADDRESS_FETCH, walletsAddressSaga);
    yield takeEvery(WALLETS_WITHDRAW_CCY_FETCH, walletsWithdrawCcySaga);
    yield takeLeading(P2P_WALLETS_FETCH, p2pWalletsSaga);
    yield takeEvery(WITHDRAW_ALLOW_FETCH, withdrawAllowSaga)
}
