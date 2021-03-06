import classnames from 'classnames';
import * as React from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { FormattedMessage, injectIntl } from 'react-intl';
import { connect, MapDispatchToProps } from 'react-redux';
import { RouterProps } from 'react-router';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';
import { IntlProps } from 'src';
import {
    Blur,
    CurrencyInfo,
    DepositCrypto,
    DepositFiat,
    TabPanel,
    WalletList,
} from 'src/components';
import { DEFAULT_CCY_PRECISION } from 'src/constants';
import { Withdraw, WithdrawProps } from 'src/custom/containers';
import { ModalWithdrawConfirmation } from 'src/custom/containers/ModalWithdrawConfirmation';
import { ModalWithdrawSubmit } from 'src/containers/ModalWithdrawSubmit';
import { WalletsHeader } from 'src/components/WalletsHeader';
import { WalletHistory } from '../History';
import {
    alertPush,
    banksFetch,
    beneficiariesFetch,
    Beneficiary,
    BeneficiaryBank,
    currenciesFetch,
    Currency,
    integrationFetch,
    Market,
    marketsFetch,
    marketsTickersFetch,
    MemberLevels,
    memberLevelsFetch,
    RootState,
    selectBanks,
    selectBanksLoading,
    selectBeneficiaries,
    selectBeneficiariesActivateSuccess,
    selectBeneficiariesCreateSuccess,
    selectBeneficiariesDeleteSuccess,
    selectCurrencies,
    selectHistory,
    selectIntegration,
    selectMarkets,
    selectMarketTickers,
    selectMemberLevels,
    selectMobileWalletUi,
    selectUserInfo,
    selectWallets,
    selectWalletsLoading,
    selectWithdrawAllow,
    selectWithdrawFiatData,
    selectWithdrawSuccess,
    setMobileWalletUi,
    Ticker,
    User,
    Wallet,
    WalletHistoryList,
    walletsAddressFetch,
    walletsData,
    walletsFetch,
    walletsWithdrawCcyFetch,
    withdrawAllowClear,
    WithdrawAllowData,
    withdrawAllowFetch,
    withdrawFetch,
} from 'src/modules';
import { Integration } from 'src/modules/public/integration/types';
import { WithdrawDataPayload } from 'src/modules/user/withdraw/types';
import { WarningMessage } from 'src/custom/components/WarningMessage';

interface ReduxProps {
    user: User;
    wallets: Wallet[];
    withdrawSuccess: boolean;
    walletsLoading?: boolean;
    historyList: WalletHistoryList;
    mobileWalletChosen: string;
    beneficiariesActivateSuccess: boolean;
    beneficiariesDeleteSuccess: boolean;
    beneficiariesAddSuccess: boolean;
    memberLevels: MemberLevels;
    currencies: Currency[];
    markets: Market[];
    tickers: {
        [key: string]: Ticker,
    };
    banks: BeneficiaryBank[];
    isFetchingBanks: boolean;
    beneficiaries: Beneficiary[];
    integration: Integration;
    withdrawAllow: WithdrawAllowData['payload'];
    withdrawData: WithdrawDataPayload;
}

interface DispatchProps {
    fetchMarkets: typeof marketsFetch;
    fetchTickers: typeof marketsTickersFetch;
    fetchBeneficiaries: typeof beneficiariesFetch;
    fetchAddress: typeof walletsAddressFetch;
    fetchWallets: typeof walletsFetch;
    clearWallets: () => void;
    walletsWithdrawCcy: typeof walletsWithdrawCcyFetch;
    fetchSuccess: typeof alertPush;
    setMobileWalletUi: typeof setMobileWalletUi;
    currenciesFetch: typeof currenciesFetch;
    memberLevelsFetch: typeof memberLevelsFetch;
    fetchBanks: typeof banksFetch;
    fetchIntegration: typeof integrationFetch;
    fetchWithdrawAllow: typeof withdrawAllowFetch;
    fetchWithdraw: typeof withdrawFetch;
    clearWithdrawAllow: typeof withdrawAllowClear;
}

const defaultBeneficiary: Beneficiary = {
    id: 0,
    currency: '',
    name: '',
    state: '',
    data: {
        address: '',
    },
};

const defaultCryptoBeneficiary: Beneficiary = {
    id: 0,
    currency: '',
    name: '',
    state: '',
    blockchain_key: '',
    blockchain_name: '',
    data: {
        address: '',
        full_name: '',
    },
};

const defaultWallet: Wallet = {
    name: '',
    currency: '',
    balance: '',
    type: 'coin',
    fixed: 0,
    fee: 0,
    account_type: '',
};

interface WalletsState {
    activeIndex: number;
    otpCode: string;
    amount: string;
    fee: string;
    beneficiary: Beneficiary;
    selectedWalletIndex: number;
    withdrawSubmitModal: boolean;
    withdrawConfirmModal: boolean;
    nonZeroSelected: boolean;
    bchAddress?: string;
    filterValue: string;
    filteredWallets?: Wallet[];
    tab: string;
    withdrawDone: boolean;
    total: string;
    currentTabIndex: number;
    isIntegrationFetched: boolean;
}

interface OwnProps {
    walletsError: {
        message: string;
    };
    currency?: string;
    action?: string;
}

type Props = ReduxProps & DispatchProps & RouterProps & IntlProps & OwnProps;

class WalletsSpotComponent extends React.Component<Props, WalletsState> {
    constructor(props: Props) {
        super(props);

        this.state = {
            activeIndex: 0,
            selectedWalletIndex: -1,
            withdrawSubmitModal: false,
            withdrawConfirmModal: false,
            otpCode: '',
            amount: '',
            fee: '',
            beneficiary: defaultBeneficiary,
            tab: this.translate('page.body.wallets.tabs.deposit'),
            withdrawDone: false,
            total: '',
            currentTabIndex: 0,
            filterValue: '',
            filteredWallets: [],
            nonZeroSelected: false,
            isIntegrationFetched: false
        };
    }

    //tslint:disable member-ordering
    public translate = (id: string) => this.props.intl.formatMessage({ id });
    public tabMapping = ['deposit', 'withdraw'];

    private title = this.translate('page.body.wallets.tabs.deposit.fiat.message1');
    private description = this.translate('page.body.wallets.tabs.deposit.fiat.message2');

    public componentDidMount() {
        const { wallets, currency, action, markets, tickers, currencies, memberLevels, banks, isFetchingBanks } = this.props;
        const { currentTabIndex, selectedWalletIndex } = this.state;

        if (!this.props.wallets.length) {
            this.props.fetchWallets();
        }

        if (wallets.length && selectedWalletIndex === -1) {
            const walletToSet = wallets.find(i => i.currency?.toLowerCase() === currency?.toLowerCase()) || wallets[0];

            this.setState({
                selectedWalletIndex: wallets.indexOf(walletToSet),
                activeIndex: wallets.indexOf(walletToSet),
                filteredWallets: wallets,
            });

            walletToSet?.currency && this.props.fetchBeneficiaries({ currency_id: walletToSet.currency?.toLowerCase() });

            wallets[selectedWalletIndex]?.type === 'fiat' && this.handleIntegrationFetching(walletToSet.currency?.toLowerCase())

            if (walletToSet?.currency && currency !== walletToSet?.currency) {
                this.props.history.push(`/wallets/spot/${walletToSet.currency.toLowerCase()}/${this.tabMapping[currentTabIndex]}`);
            }

            const tabIndex = this.tabMapping.indexOf(action);

            if (tabIndex !== -1 && tabIndex !== currentTabIndex) {
                this.onTabChange(this.translate(`page.body.wallets.tabs.${action}`))
                this.onCurrentTabChange(tabIndex);
            }
        }

        if (!memberLevels) {
            this.props.memberLevelsFetch();
        }

        if (!markets.length) {
            this.props.fetchMarkets();
        }

        if (!tickers.length) {
            this.props.fetchTickers();
        }

        if (!currencies.length) {
            this.props.currenciesFetch();
        }

        if(!banks.length && isFetchingBanks){
            this.props.fetchBanks();
        }

    }

    public componentWillReceiveProps(next: Props) {
        const {
            wallets,
            beneficiariesActivateSuccess,
            beneficiariesDeleteSuccess,
            withdrawSuccess,
            beneficiariesAddSuccess,
            currency,
            action,
        } = this.props;
        const { selectedWalletIndex, currentTabIndex, isIntegrationFetched } = this.state;

        if (!wallets.length && next.wallets.length && selectedWalletIndex === -1) {
            const walletToSet = next.wallets.find(i => i.currency?.toLowerCase() === currency?.toLowerCase()) || next.wallets[0];

            this.setState({
                selectedWalletIndex: next.wallets.indexOf(walletToSet),
                activeIndex: next.wallets.indexOf(walletToSet),
                filteredWallets: next.wallets,
            });

            walletToSet?.currency && this.props.fetchBeneficiaries({ currency_id: walletToSet.currency?.toLowerCase() });

            if (walletToSet?.currency && currency !== walletToSet?.currency) {
                this.props.history.push(`/wallets/spot/${walletToSet.currency.toLowerCase()}/${this.tabMapping[currentTabIndex]}`);
            }
            const tabIndex = this.tabMapping.indexOf(action);

            if (tabIndex !== -1 && tabIndex !== currentTabIndex) {
                this.onTabChange(this.translate(`page.body.wallets.tabs.${action}`))
                this.onCurrentTabChange(tabIndex);
            }
        }

        window.console.log('integration fetch:', isIntegrationFetched)
        if (wallets.length && selectedWalletIndex !== -1 && !isIntegrationFetched) {
            wallets[selectedWalletIndex]?.type === 'fiat' && this.handleIntegrationFetching(currency)
        }

        if (!withdrawSuccess && next.withdrawSuccess) {
            this.toggleSubmitModal();
        }

        if ((next.beneficiariesActivateSuccess && !beneficiariesActivateSuccess) ||
            (next.beneficiariesDeleteSuccess && !beneficiariesDeleteSuccess) ||
            (next.beneficiariesAddSuccess && !beneficiariesAddSuccess)) {
            const selectedCurrency = (next.wallets[selectedWalletIndex] || { currency: '' }).currency;

            this.props.fetchBeneficiaries({ currency_id: selectedCurrency.toLowerCase() });
        }

        if (next.withdrawAllow.status !== this.props.withdrawAllow.status) {
            if (next.withdrawAllow.status === 200) {
                const { amount, beneficiary, otpCode, total, fee } = next.withdrawAllow;
                this.setState((state: WalletsState) => ({
                    amount: amount || '',
                    beneficiary: beneficiary || defaultCryptoBeneficiary,
                    otpCode: otpCode || '',
                    withdrawConfirmModal: !state.withdrawConfirmModal,
                    total: total || '',
                    fee: fee || '',
                    withdrawDone: false,
                }));
            }
        }
    }

    public render() {
        const {
            wallets,
            currencies,
            markets,
            tickers,
            historyList,
            mobileWalletChosen,
            walletsLoading,
        } = this.props;
        const {
            amount,
            fee,
            otpCode,
            beneficiary,
            total,
            selectedWalletIndex,
            withdrawSubmitModal,
            withdrawConfirmModal,
            currentTabIndex,
            nonZeroSelected,
        } = this.state;

        const selectedCurrency = (wallets[selectedWalletIndex] || { currency: '' }).currency;
        const currencyType = (wallets[selectedWalletIndex] || { currency: '' }).type;
        let confirmationAddress = '';
        let selectedWalletPrecision = DEFAULT_CCY_PRECISION;

        if (wallets[selectedWalletIndex]) {
            selectedWalletPrecision = wallets[selectedWalletIndex].fixed;

            if (wallets[selectedWalletIndex].type === 'fiat') {
                confirmationAddress = beneficiary.name;
            } else if (beneficiary.data) {
                confirmationAddress = beneficiary.data.address as string;
            }
        }

        return (
            <div className="pg-wallet">
                <div className="text-center">
                    {walletsLoading && <Spinner animation="border" variant="primary" />}
                </div>
                <div className={`row no-gutters pg-wallet__tabs-content ${!historyList.length && 'pg-wallet__tabs-content-height'}`}>
                    <div className={`col-md-3 col-sm-12 col-12 ${mobileWalletChosen && 'd-none d-md-block'}`}>
                        <WalletsHeader
                            wallets={wallets}
                            nonZeroSelected={nonZeroSelected}
                            setFilterValue={this.setFilterValue}
                            setFilteredWallets={this.handleFilter}
                            handleClickCheckBox={this.handleToggleCheckbox}
                        />
                        <WalletList
                            onWalletSelectionChange={this.onWalletSelectionChange}
                            walletItems={this.formattedWallets()}
                            activeIndex={this.state.activeIndex}
                            onActiveIndexChange={this.onActiveIndexChange}
                            currencies={currencies}
                            markets={markets}
                            tickers={tickers}
                        />
                    </div>
                    <div className={`pg-wallet__tabs col-md-7 col-sm-12 col-12 ${!mobileWalletChosen && 'd-none d-md-block'}`}>
                        <TabPanel
                            panels={this.renderTabs()}
                            onTabChange={(_, label) => this.onTabChange(label)}
                            currentTabIndex={currentTabIndex}
                            onCurrentTabChange={this.onCurrentTabChange}
                        />
                    </div>
                </div>
                <ModalWithdrawSubmit
                    show={withdrawSubmitModal}
                    currency={selectedCurrency}
                    onSubmit={this.toggleSubmitModal}
                />
                <ModalWithdrawConfirmation
                    beneficiary={beneficiary}
                    otpCode={otpCode}
                    show={withdrawConfirmModal}
                    type={currencyType}
                    amount={amount}
                    fee={fee}
                    total={total}
                    currency={selectedCurrency}
                    rid={confirmationAddress}
                    onSubmit={this.handleWithdraw}
                    onDismiss={this.toggleConfirmModal}
                    handleChangeCodeValue={this.handleChangeCodeValue}
                    precision={selectedWalletPrecision}
                />
            </div>
        );
    }

    private handleIntegrationFetching = (currency: string) => {
        this.props.fetchIntegration({currency: currency})
        this.setState({
            isIntegrationFetched: true
        })
    }

    private formattedWallets = () => {
        const { nonZeroSelected, filteredWallets } = this.state;

        const list = nonZeroSelected ? filteredWallets.filter(i => i.balance && Number(i.balance) > 0) : filteredWallets;

        return list.map((wallet: Wallet) => ({
            ...wallet,
            currency: wallet.currency.toUpperCase(),
            iconUrl: wallet.iconUrl ? wallet.iconUrl : '',
        }));
    }

    private setFilterValue = (value: string) => {
        this.setState({
            filterValue: value,
        });
    };

    private handleFilter = (result: object[]) => {
        this.setState({
            filteredWallets: result as Wallet[],
        });
    };

    private handleToggleCheckbox = () => {
        this.setState(prevState => ({
            nonZeroSelected: !prevState.nonZeroSelected,
        }));
    };

    private onTabChange = label => this.setState({ tab: label });
    private onActiveIndexChange = index => this.setState({ activeIndex: index });
    private onCurrentTabChange = index => {
        const { selectedWalletIndex } = this.state;
        const { wallets } = this.props;

        this.setState({ currentTabIndex: index });
        wallets && wallets[selectedWalletIndex] &&
            this.props.history.push(`/wallets/spot/${wallets[selectedWalletIndex].currency?.toLowerCase()}/${this.tabMapping[index]}`)
    };

    private toggleSubmitModal = () => {
        this.setState((state: WalletsState) => ({
            withdrawSubmitModal: !state.withdrawSubmitModal,
            withdrawDone: true,
        }));
    };

    private handleChangeCodeValue = (value: string) => {
        this.setState({
            otpCode: value,
        });
    };

    private renderTabs() {
        const { tab, selectedWalletIndex } = this.state;
        const { wallets } = this.props;

        if (selectedWalletIndex === -1) {
            return [{ content: null, label: '' }];
        }

        const showWithdraw = wallets[selectedWalletIndex].type === 'fiat' || wallets[selectedWalletIndex].balance;

        return [
            {
                content: tab === this.translate('page.body.wallets.tabs.deposit') ? this.renderDeposit(!!showWithdraw) : null,
                label: this.translate('page.body.wallets.tabs.deposit'),
            },
            {
                content: tab === this.translate('page.body.wallets.tabs.withdraw') ? this.renderWithdraw() : null,
                label: this.translate('page.body.wallets.tabs.withdraw'),
                disabled: !showWithdraw,
            },
        ];
    }

    private toggleConfirmModal = () => {
        if (this.state.withdrawConfirmModal) {
            this.props.clearWithdrawAllow();
        }

        this.setState((state: WalletsState) => ({
            withdrawConfirmModal: !state.withdrawConfirmModal,
        }))
    };

    private onOpenConfirmationModal = (amount?: string, total?: string, beneficiary?: Beneficiary, otpCode?: string, fee?: string) => {
        if (this.props.wallets[this.state.selectedWalletIndex].type === 'coin') {
            this.setState({
                withdrawConfirmModal: true,
                beneficiary,
                fee,
                otpCode,
                total,
                amount,
            });
        }

        if (this.props.wallets[this.state.selectedWalletIndex].type === 'fiat') {
            this.props.fetchWithdrawAllow({
                amount,
                beneficiary,
                otpCode,
                total,
                fee,
            });
        }
    };

    private handleWithdraw = () => {
        const { selectedWalletIndex, otpCode, amount, beneficiary } = this.state;
        if (selectedWalletIndex === -1) {
            return;
        }

        const { currency, type } = this.props.wallets[selectedWalletIndex];
        const withdrawCryptoRequest = {
            amount,
            currency: currency.toLowerCase(),
            otp: otpCode,
            beneficiary_id: String(beneficiary.id),
        };
        const withdrawFiatRequest = {
            beneficiary_id: String(beneficiary.id),
            currency: currency.toLowerCase(),
            otp: otpCode,
            amount,
            account_no: beneficiary.data.account_no,
            bank_code: beneficiary.data.bank_code,
        };

        if (type === 'fiat') {
            this.props.fetchWithdraw(withdrawFiatRequest);
        } else {
            this.props.walletsWithdrawCcy(withdrawCryptoRequest);
        }
        this.toggleConfirmModal();
    };

    private handleOnCopy = () => {
        this.props.fetchSuccess({ message: ['page.body.wallets.tabs.deposit.ccy.message.success'], type: 'success'});
    };

    private handleGenerateAddress = () => {
        const { selectedWalletIndex } = this.state;
        const { wallets } = this.props;

        const wallet: Wallet = wallets[selectedWalletIndex] || defaultWallet;

        if (!wallet.deposit_address && wallets.length && wallet.type !== 'fiat') {
            this.props.fetchAddress({ currency: wallets[selectedWalletIndex].currency });
        }
    };

    private renderDeposit = (isAccountActivated: boolean) => {
        const {
            currencies,
            user,
            wallets,
        } = this.props;
        const { selectedWalletIndex } = this.state;
        const wallet: Wallet = (wallets[selectedWalletIndex] || defaultWallet);
        const currencyItem = (currencies && currencies.find(item => item.id === wallet.currency)) || { min_confirmations: 6, deposit_enabled: false };
        const text = this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.deposit.ccy.message.submit' },
                                                   { confirmations: currencyItem.min_confirmations });
        const error = this.props.intl.formatMessage({id: 'page.body.wallets.tabs.deposit.ccy.message.pending'});

        const blurCryptoClassName = classnames('pg-blur-deposit-crypto', {
            'pg-blur-deposit-crypto--active': isAccountActivated,
        });

        const buttonLabel = `${this.translate('page.body.wallets.tabs.deposit.ccy.button.generate')} ${wallet.currency.toUpperCase()} ${this.translate('page.body.wallets.tabs.deposit.ccy.button.address')}`;

        if (wallets[selectedWalletIndex].type === 'coin') {
            return (
                <React.Fragment>
                    <CurrencyInfo
                        wallet={wallets[selectedWalletIndex]}
                        handleClickTransfer={currency => this.props.history.push(`/wallets/transfer/${currency}`)}
                    />
                    {currencyItem && !currencyItem.deposit_enabled ? (
                        <Blur
                            className={blurCryptoClassName}
                            text={this.translate('page.body.wallets.tabs.deposit.disabled.message')}
                        />
                    ) : null}
                    <DepositCrypto
                        buttonLabel={buttonLabel}
                        copiableTextFieldText={this.translate('page.body.wallets.tabs.deposit.ccy.message.address')}
                        copyButtonText={this.translate('page.body.wallets.tabs.deposit.ccy.message.button')}
                        error={error}
                        handleGenerateAddress={this.handleGenerateAddress}
                        handleOnCopy={this.handleOnCopy}
                        text={text}
                        wallet={wallet}
                    />
                    {wallet.currency && <WalletHistory label="deposit" type="deposits" currency={wallet.currency} />}
                </React.Fragment>
            );
        } else {
            return (
                <React.Fragment>
                    <CurrencyInfo
                        wallet={wallets[selectedWalletIndex]}
                        handleClickTransfer={currency => this.props.history.push(`/wallets/transfer/${currency}`)}
                    />
                    {currencyItem && !currencyItem.deposit_enabled ? (
                        <Blur
                            className="pg-blur-deposit-fiat"
                            text={this.translate('page.body.wallets.tabs.deposit.disabled.message')}
                        />
                    ) : null}
                    <DepositFiat title={this.title} description={this.description} uid={user ? user.uid : ''}/>
                    {wallet.currency && <WalletHistory label="deposit" type="deposits" currency={wallet.currency} />}
                </React.Fragment>
            );
        }
    };

    private renderWithdraw = () => {
        const { currencies, user, wallets, walletsError } = this.props;
        const { selectedWalletIndex } = this.state;
        const wallet = (wallets[selectedWalletIndex] || defaultWallet);
        const currencyItem = (currencies && currencies.find(item => item.id === wallet.currency));

        return (
            <React.Fragment>
                <CurrencyInfo
                    wallet={wallets[selectedWalletIndex]}
                    handleClickTransfer={currency => this.props.history.push(`/wallets/transfer/${currency}`)}
                />
                {walletsError && <p className="pg-wallet__error">{walletsError.message}</p>}
                {currencyItem && !currencyItem.withdrawal_enabled ? (
                    <Blur
                        className="pg-blur-withdraw"
                        text={this.translate('page.body.wallets.tabs.withdraw.disabled.message')}
                    />
                ) : null}
                {this.renderWithdrawContent()}
                {user.otp && wallet.currency && <WalletHistory label="withdraw" type="withdraws" currency={wallet.currency} />}
            </React.Fragment>
        );
    };

    private renderWithdrawWarningNoBanks = () => {
        return (
            <span>
                <span>
                    <FormattedMessage id="page.body.wallets.warning.withdraw.no.banks" />
                </span>
            </span>
        );
    };

    private renderWithdrawWarningLimits = () => {
        const { integration } = this.props;
        const currency = this.props.wallets[this.state.selectedWalletIndex].currency;

        return (
            <span>
                <span>
                    {`${this.translate('page.body.wallets.warning.withdraw.limits.min')} ${integration?.min_withdrawal_amount} `}<b>{currency.toUpperCase()}</b>
                    <br/>
                    {`${this.translate('page.body.wallets.warning.withdraw.limits.max')} ${integration?.max_withdrawal_amount} `}<b>{currency.toUpperCase()}</b>
                </span>
            </span>
        );
    };

    private renderWithdrawOTP = () => {
        return (
            <React.Fragment>
                <span>
                    <FormattedMessage id="page.body.wallets.tabs.withdraw.content.enable2fa" />
                </span>
                <Link to={{pathname: '/security/2fa', state: {enable2fa: true} }} className="cr-warning-message--button">
                    <span><FormattedMessage id="page.body.wallets.tabs.withdraw.content.enable2faButton"/></span>
                    <div className="cr-warning-message--arrow" />
                </Link>
            </React.Fragment>
        )
    };

    private renderWithdrawWarningKYC = () => {
        return (
            <React.Fragment>
                <span>
                    <FormattedMessage id="page.body.wallets.warning.withdraw.verification" />
                </span>
                <Link to="/confirm" className="cr-warning-message--button">
                    <span><FormattedMessage id="page.body.wallets.warning.withdraw.verification.button"/></span>
                    <div className="cr-warning-message--arrow" />
                </Link>
            </React.Fragment>
        );
    };

    private isLimitedWithdraw = () => {
        const { wallets } = this.props;
        const fee = wallets[this.state.selectedWalletIndex].fee;
        const total =  Number(this.state.amount) - fee;
        return (total && (Number(total) < Number(this.props.integration?.min_withdrawal_amount) || Number(total) > Number(this.props.integration?.max_withdrawal_amount)))
    };

    private renderWithdrawWarning = () => {
        const { user: { otp, level }, memberLevels, beneficiaries } = this.props;

        return (
            <div>
                {this.isLimitedWithdraw() && <WarningMessage children={this.renderWithdrawWarningLimits()} hint="page.body.wallets.warning.withdraw.limits.hint" />}
                {!beneficiaries.length && <WarningMessage children={this.renderWithdrawWarningNoBanks()} hint="page.body.wallets.warning.withdraw.no.banks" />}
                {level < memberLevels?.withdraw.minimum_level && <WarningMessage children={this.renderWithdrawWarningKYC()} hint="page.body.wallets.warning.withdraw.verification.hint"/>}
                {!otp && <WarningMessage children={this.renderWithdrawOTP()} hint="page.body.wallets.warning.withdraw.otp.hint"/>}
            </div>
        );
    };

    private handleOnChangeAmount = (amount) => {
        this.setState({
            amount: amount,
        });
    };

    private renderWithdrawContent = () => {
        const { withdrawDone, selectedWalletIndex } = this.state;

        if (selectedWalletIndex === -1) {
            return [{ content: null, label: '' }];
        }
        const { user: { level, otp }, wallets } = this.props;
        const wallet = wallets[selectedWalletIndex];
        const { currency, type, balance, fee } = wallet;
        const fixed = (wallet || { fixed: 0 }).fixed;

        const withdrawProps: WithdrawProps = {
            handleOnChangeAmount: this.handleOnChangeAmount,
            withdrawDone,
            currency,
            fee,
            balance,
            beneficiaries: this.props.beneficiaries,
            onClick: this.onOpenConfirmationModal,
            twoFactorAuthRequired: this.isTwoFactorAuthRequired(level, otp),
            fixed,
            type,
            min_withdraw: this.props.integration?.min_withdrawal_amount,
            max_withdraw: this.props.integration?.max_withdrawal_amount,
            withdrawAmountLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.amount' }),
            withdraw2faLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.code2fa' }),
            withdrawFeeLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.fee' }),
            withdrawTotalLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.total' }),
            withdrawButtonLabel: this.props.intl.formatMessage({ id: 'page.body.wallets.tabs.withdraw.content.button' }),
        };

        if(!otp) {
            return this.isOtpDisabled();
        };

        return (
            <React.Fragment>
                {this.renderWithdrawWarning()}
                <Withdraw {...withdrawProps} />
            </React.Fragment>
        );
    };


    private isOtpDisabled = () => {
        return (
            <React.Fragment>
                <p className="pg-wallet__enable-2fa-message">
                    {this.translate('page.body.wallets.tabs.withdraw.content.enable2fa')}
                </p>
                <Button
                    block={true}
                    onClick={this.redirectToEnable2fa}
                    size="lg"
                    variant="primary"
                >
                    {this.translate('page.body.wallets.tabs.withdraw.content.enable2faButton')}
                </Button>
            </React.Fragment>
        );
    };

    private redirectToEnable2fa = () => this.props.history.push('/security/2fa', { enable2fa: true });

    private isTwoFactorAuthRequired(level: number, is2faEnabled: boolean) {
        return level > 1 || (level === 1 && is2faEnabled);
    }

    private onWalletSelectionChange = (value: Wallet) => {
        const { wallets } = this.props;
        const { currentTabIndex } = this.state;

        const nextWalletIndex = this.props.wallets.findIndex(
            wallet => wallet.currency.toLowerCase() === value.currency.toLowerCase()
        );

        this.setState({
            selectedWalletIndex: nextWalletIndex,
            withdrawDone: false,
        });

        this.props.fetchBeneficiaries({ currency_id: value.currency.toLowerCase() });
        this.props.history.push(`/wallets/spot/${value.currency.toLowerCase()}/${this.tabMapping[currentTabIndex]}`);
        this.props.setMobileWalletUi(wallets[nextWalletIndex].name);

        wallets[nextWalletIndex]?.type === 'fiat' && this.handleIntegrationFetching(value.currency.toLowerCase())

    };
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    markets: selectMarkets(state),
    tickers: selectMarketTickers(state),
    user: selectUserInfo(state),
    wallets: selectWallets(state),
    walletsLoading: selectWalletsLoading(state),
    withdrawSuccess: selectWithdrawSuccess(state),
    historyList: selectHistory(state),
    mobileWalletChosen: selectMobileWalletUi(state),
    beneficiariesActivateSuccess: selectBeneficiariesActivateSuccess(state),
    beneficiariesDeleteSuccess: selectBeneficiariesDeleteSuccess(state),
    currencies: selectCurrencies(state),
    beneficiariesAddSuccess: selectBeneficiariesCreateSuccess(state),
    memberLevels: selectMemberLevels(state),
    banks: selectBanks(state),
    isFetchingBanks: selectBanksLoading(state),
    beneficiaries: selectBeneficiaries(state),
    integration: selectIntegration(state),
    withdrawAllow: selectWithdrawAllow(state),
    withdrawData: selectWithdrawFiatData(state),
});

const mapDispatchToProps: MapDispatchToProps<DispatchProps, {}> = dispatch => ({
    fetchMarkets: () => dispatch(marketsFetch()),
    fetchTickers: () => dispatch(marketsTickersFetch()),
    fetchBeneficiaries: params => dispatch(beneficiariesFetch(params)),
    fetchWallets: () => dispatch(walletsFetch()),
    fetchAddress: ({ currency }) => dispatch(walletsAddressFetch({ currency })),
    walletsWithdrawCcy: params => dispatch(walletsWithdrawCcyFetch(params)),
    clearWallets: () => dispatch(walletsData([])),
    fetchSuccess: payload => dispatch(alertPush(payload)),
    setMobileWalletUi: payload => dispatch(setMobileWalletUi(payload)),
    currenciesFetch: () => dispatch(currenciesFetch()),
    memberLevelsFetch: () => dispatch(memberLevelsFetch()),
    fetchBanks: () => dispatch(banksFetch()),
    fetchIntegration: (payload) => dispatch(integrationFetch(payload)),
    fetchWithdrawAllow: (payload) => dispatch(withdrawAllowFetch(payload)),
    fetchWithdraw: (payload) => dispatch(withdrawFetch(payload)),
    clearWithdrawAllow: () => dispatch(withdrawAllowClear()),
});

export const WalletsSpot = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, mapDispatchToProps),
)(WalletsSpotComponent) as any; // tslint:disable-this-line:no-any
