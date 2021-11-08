import * as React from 'react';
import {
    injectIntl,
} from 'react-intl';
import { connect, MapDispatchToPropsFunction } from 'react-redux';
import { IntlProps } from 'src';
import { History, Pagination } from 'src/components';
import { Decimal } from 'src/components/Decimal';
import { localeDate } from 'src/helpers';
import {
    currenciesFetch,
    Currency,
    fetchHistory,
    resetHistory,
    RootState,
    selectCurrencies,
    selectCurrentPage,
    selectFirstElemIndex,
    selectHistory,
    selectHistoryLoading,
    selectLastElemIndex,
    selectNextPageExists,
    selectWallets,
    Wallet,
    WalletHistoryList,
} from 'src/modules';
import { FailIcon } from './FailIcon';
import { SuccessIcon } from './SuccessIcon';
import { PendingIcon } from './PendingIcon';

export interface HistoryProps {
    label: string;
    type: string;
    currency: string;
}

export interface ReduxProps {
    currencies: Currency[];
    list: WalletHistoryList;
    wallets: Wallet[];
    fetching: boolean;
    page: number;
    firstElemIndex: number;
    lastElemIndex: number;
    nextPageExists: boolean;
}

interface DispatchProps {
    fetchCurrencies: typeof currenciesFetch;
    fetchHistory: typeof fetchHistory;
    resetHistory: typeof resetHistory;
}

export type Props = HistoryProps & ReduxProps & DispatchProps & IntlProps;

export class WalletTable extends React.Component<Props> {
    public componentDidMount() {
        const {
            currencies,
            currency,
            type,
        } = this.props;
        this.props.fetchHistory({ page: 0, currency, type, limit: 6 });

        if (!currencies.length) {
            this.props.fetchCurrencies();
        }
    }

    public componentWillReceiveProps(nextProps) {
        const {
            currencies,
            currency,
            type,
        } = this.props;
        if (nextProps.currency !== currency || nextProps.type !== type) {
            this.props.resetHistory();
            this.props.fetchHistory({ page: 0, currency: nextProps.currency, type, limit: 6 });
        }

        if (!currencies.length && nextProps.currencies.length) {
            this.props.fetchCurrencies();
        }
    }

    public componentWillUnmount() {
        this.props.resetHistory();
    }

    public render() {
        const { label, list, firstElemIndex, lastElemIndex, page, nextPageExists } = this.props;

        if (!list.length) {
            return null;
        }

        return (
            <div className="pg-history-elem__wallet">
                <div className="pg-history-elem__label">
                    {this.props.intl.formatMessage({ id: `page.body.history.${label}` })}
                </div>
                <History headers={this.getHeaders(label)} data={this.retrieveData(list)} />
                <Pagination
                    firstElemIndex={firstElemIndex}
                    lastElemIndex={lastElemIndex}
                    page={page}
                    nextPageExists={nextPageExists}
                    onClickPrevPage={this.onClickPrevPage}
                    onClickNextPage={this.onClickNextPage}
                />
            </div>
        );
    }

    private getHeaders = (label: string) => [
        this.props.intl.formatMessage({ id: `page.body.history.${label}.header.date` }),
        this.props.intl.formatMessage({ id: `page.body.history.${label}.header.fullName` }),
        null,
        this.props.intl.formatMessage({ id: `page.body.history.${label}.header.amount` }),
        this.props.intl.formatMessage({ id: `page.body.history.${label}.header.status` }),
    ];

    private onClickPrevPage = () => {
        const { page, type, currency } = this.props;
        this.props.fetchHistory({ page: Number(page) - 1, currency, type, limit: 6 });
    };

    private onClickNextPage = () => {
        const { page, type, currency } = this.props;
        this.props.fetchHistory({ page: Number(page) + 1, currency, type, limit: 6 });
    };

    private retrieveData = list => {
        const {
            currency,
            currencies,
            type,
            wallets,
        } = this.props;
        const { fixed } = wallets.find(w => w.currency === currency) || { fixed: 8 };
        if (list.length === 0) {
            return [[]];
        }

        return list.sort((a, b) => {
            return localeDate(a.created_at, 'fullDate') > localeDate(b.created_at, 'fullDate') ? -1 : 1;
        }).map((item, index) => {
            const amount = 'amount' in item ? Number(item.amount) : Number(item.price) * Number(item.volume);
            const confirmations = type === 'deposits' && item.confirmations;
            const itemCurrency = currencies && currencies.find(cur => cur.id === currency);
            const minConfirmations = itemCurrency && itemCurrency.min_confirmations;
            const state = 'state' in item ? this.formatTxState(item.state, confirmations, minConfirmations) : '';
            const rid = item.rid && item.rid.split('-').slice(0,3).reduce( (res, cur, i) => i !== 2 ? res + cur[0].toUpperCase() + cur.slice(1) + ' ' : res + cur.toUpperCase(), '' );

            return [
                localeDate(item.created_at, 'shortDate'),
                rid,
                null,
                <Decimal key={index} fixed={fixed} thousSep=",">{amount}</Decimal>,
                state,
            ];
        });
    };

    private formatTxState = (tx: string, confirmations?: number, minConfirmations?: number) => {
        const statusMapping = {
            succeed: <span className="cr-table__body-status--success">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.succeed' })} <SuccessIcon /></span>,
            failed: <span className="cr-table__body-status--fail">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.failed' })} <FailIcon /></span>,
            accepted: <span className="cr-table__body-status--success">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.accepted' })} <SuccessIcon /></span>,
            collected: <span className="cr-table__body-status--success">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.collected' })} <SuccessIcon /></span>,
            canceled: <span className="cr-table__body-status--fail">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.canceled' })} <FailIcon /></span>,
            rejected: <span className="cr-table__body-status--fail">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.rejected' })} <FailIcon /></span>,
            processing: <span className="cr-table__body-status--pending">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.processing' })} <PendingIcon/></span>,
            prepared: <span className="cr-table__body-status--pending">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.prepared' })} <PendingIcon/></span>,
            submitted: (confirmations !== undefined && minConfirmations !== undefined) ? (
                `${confirmations}/${minConfirmations}`
            ) : (
                <span className="cr-table__body-status--pending">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.pending' })} <PendingIcon/></span>
            ),
            skipped: <span className="cr-table__body-status--success">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.skipped' })} <SuccessIcon /></span>,
            under_review: <span className="cr-table__body-status--pending">{this.props.intl.formatMessage({ id: 'page.body.wallets.table.pending' })} <PendingIcon/></span>,
        };

        return statusMapping[tx];
    };
}


export const mapStateToProps = (state: RootState): ReduxProps => ({
    currencies: selectCurrencies(state),
    list: selectHistory(state),
    wallets: selectWallets(state),
    fetching: selectHistoryLoading(state),
    page: selectCurrentPage(state),
    firstElemIndex: selectFirstElemIndex(state, 6),
    lastElemIndex: selectLastElemIndex(state, 6),
    nextPageExists: selectNextPageExists(state, 6),
});

export const mapDispatchToProps: MapDispatchToPropsFunction<DispatchProps, {}> =
    dispatch => ({
        fetchCurrencies: () => dispatch(currenciesFetch()),
        fetchHistory: params => dispatch(fetchHistory(params)),
        resetHistory: () => dispatch(resetHistory()),
    });

export const WalletHistory = injectIntl(connect(mapStateToProps, mapDispatchToProps)(WalletTable)) as any;
