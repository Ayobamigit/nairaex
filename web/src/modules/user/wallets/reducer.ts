import { CommonError } from '../../types';
import { WalletsAction } from './actions';
import {
    P2P_WALLETS_DATA,
    P2P_WALLETS_DATA_WS,
    P2P_WALLETS_ERROR,
    P2P_WALLETS_FETCH,
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
    WITHDRAW_ALLOW_CLEAR,
    WITHDRAW_ALLOW_DATA,
    WITHDRAW_ALLOW_ERROR,
    WITHDRAW_ALLOW_FETCH,
} from './constants';
import { Wallet, WalletAddress } from './types';
import { Beneficiary } from 'src/modules';

export interface WalletsState {
    wallets: {
        list: Wallet[];
        loading: boolean;
        withdrawSuccess: boolean;
        error?: CommonError;
        mobileWalletChosen: string;
        timestamp?: number;
    };
    p2pWallets: {
        list: Wallet[];
        loading: boolean;
        error?: CommonError;
        timestamp?: number;
    };
    withdrawAllow: {
        status: number | null;
        beneficiary: Beneficiary;
        otpCode: string;
        total: string;
        amount: string;
        fee: string;
        loading: boolean;
        error: boolean;
        success: boolean;
    };
}

export const initialWalletsState: WalletsState = {
    wallets: {
        list: [],
        loading: false,
        withdrawSuccess: false,
        mobileWalletChosen: '',
    },
    p2pWallets: {
        list: [],
        loading: false,
    },
    withdrawAllow: {
        status: null,
        beneficiary: null,
        otpCode: '',
        total: '',
        amount: '',
        fee: '',
        loading: false,
        error: false,
        success: false,
    },
};

const getUpdatedWalletsList = (list: Wallet[], payload: WalletAddress) => {
    if (list.length && payload.currencies?.length) {
        return list.map(wallet => {
            if (payload.currencies.includes(wallet.currency)) {
                let depositAddress: WalletAddress = {
                    address: payload.address,
                    currencies: payload.currencies,
                };

                if (payload.state) {
                    depositAddress = {
                        ...depositAddress,
                        state: payload.state,
                    };
                }

                return {
                    ...wallet,
                    deposit_address: depositAddress,
                };
            }

            return wallet;
        });
    }

    return list;
};

const updatedList = (wallets: Wallet[], balances: any) => {
    return wallets.map(wallet => {
        let updatedWallet = wallet;
        const payloadCurrencies = Object.keys(balances);

        if (payloadCurrencies.length) {
            payloadCurrencies.some(value => {
                const targetWallet = balances[value];

                if (value === wallet.currency && (targetWallet && targetWallet[2] === wallet.account_type)) {
                    updatedWallet = {
                        ...updatedWallet,
                        balance: targetWallet[0] ? targetWallet[0] : updatedWallet.balance,
                        locked: targetWallet[1] ? targetWallet[1] : updatedWallet.locked,
                    };

                    return true;
                }

                return false;
            });
        }

        return updatedWallet;
    });
};

const walletsListReducer = (state: WalletsState['wallets'], action: WalletsAction): WalletsState['wallets'] => {
    switch (action.type) {
        case WALLETS_ADDRESS_FETCH:
        case WALLETS_FETCH:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case WALLETS_WITHDRAW_CCY_FETCH:
            return {
                ...state,
                loading: true,
                withdrawSuccess: false,
            };
        case WALLETS_DATA: {
            return {
                ...state,
                loading: false,
                list: action.payload,
            };
        }
        case WALLETS_DATA_WS: {
            return {
                ...state,
                loading: false,
                list: updatedList(state.list, action.payload.balances),
            };
        }
        case WALLETS_ADDRESS_DATA: {
            return {
                ...state,
                list: getUpdatedWalletsList(state.list, action.payload),
                loading: false,
            };
        }
        case WALLETS_WITHDRAW_CCY_DATA:
            return {
                ...state,
                loading: false,
                withdrawSuccess: true,
            };
        case WALLETS_ADDRESS_DATA_WS: {
            // if (action.payload.currencies.includes(state.selectedWalletCurrency)) {
            //     return {
            //         ...state,
            //         loading: false,
            //         selectedWalletAddress: action.payload.address,
            //     };
            // }

            return {
                ...state,
                list: getUpdatedWalletsList(state.list, action.payload),
                loading: false,
            };
        }
        case WALLETS_WITHDRAW_CCY_ERROR:
            return {
                ...state,
                loading: false,
                withdrawSuccess: false,
                error: action.error,
            };
        case WALLETS_ADDRESS_ERROR:
        case WALLETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };

        case SET_MOBILE_WALLET_UI:
            return { ...state, mobileWalletChosen: action.payload };
        default:
            return state;
    }
};

const p2pWalletsListReducer = (state: WalletsState['p2pWallets'], action: WalletsAction): WalletsState['p2pWallets'] => {
    switch (action.type) {
        case P2P_WALLETS_FETCH:
            return {
                ...state,
                loading: true,
                timestamp: Math.floor(Date.now() / 1000),
            };
        case P2P_WALLETS_DATA: {
            return {
                ...state,
                loading: false,
                list: action.payload,
            };
        }
        case P2P_WALLETS_DATA_WS: {
            return {
                ...state,
                loading: false,
                list: updatedList(state.list, action.payload.balances),
            };
        }
        case P2P_WALLETS_ERROR:
            return {
                ...state,
                loading: false,
                error: action.error,
            };
        default:
            return state;
    }
};

export const withdrawAllowReducer = (state: WalletsState['withdrawAllow'], action: WalletsAction): WalletsState['withdrawAllow'] => {
    switch (action.type) {
        case WITHDRAW_ALLOW_FETCH:
            return {
                ...state,
                success: false,
                error: false,
                loading: true,
            };
        case WITHDRAW_ALLOW_DATA:
            return {
                ...state,
                ...action.payload,
                success: true,
                loading: false,
            };
        case WITHDRAW_ALLOW_ERROR:
            return {
                ...state,
                status: null,
                error: true,
                loading: false,
            };
        case WITHDRAW_ALLOW_CLEAR:
            return {
                ...initialWalletsState.withdrawAllow,
                error: false,
                loading: false,
            };
        default:
            return state;
    }
}

export const walletsReducer = (state = initialWalletsState, action: WalletsAction): WalletsState => {
    switch (action.type) {
        case WALLETS_FETCH:
        case WALLETS_DATA:
        case WALLETS_DATA_WS:
        case WALLETS_ERROR:
        case WALLETS_ADDRESS_FETCH:
        case WALLETS_ADDRESS_DATA:
        case WALLETS_ADDRESS_DATA_WS:
        case WALLETS_ADDRESS_ERROR:
        case WALLETS_WITHDRAW_CCY_FETCH:
        case WALLETS_WITHDRAW_CCY_DATA:
        case SET_MOBILE_WALLET_UI:
        case WALLETS_WITHDRAW_CCY_ERROR:
            const walletsListState = { ...state.wallets };

            return {
                ...state,
                wallets: walletsListReducer(walletsListState, action),
            };
        case P2P_WALLETS_FETCH:
        case P2P_WALLETS_DATA:
        case P2P_WALLETS_ERROR:
        case P2P_WALLETS_DATA_WS:
            const p2pWalletsListState = { ...state.p2pWallets };

            return {
                ...state,
                p2pWallets: p2pWalletsListReducer(p2pWalletsListState, action),
            };
        case WITHDRAW_ALLOW_FETCH:
        case WITHDRAW_ALLOW_DATA:
        case WITHDRAW_ALLOW_ERROR:
        case WITHDRAW_ALLOW_CLEAR:
            const withdrawAllowState = { ...state.withdrawAllow };

            return {
                ...state,
                withdrawAllow: withdrawAllowReducer(withdrawAllowState, action),
            }
        case WALLETS_RESET:
            return {
                ...state,
                wallets: {
                    list: [],
                    loading: false,
                    withdrawSuccess: false,
                    mobileWalletChosen: '',
                },
            };
        default:
            return state;
    }
};
