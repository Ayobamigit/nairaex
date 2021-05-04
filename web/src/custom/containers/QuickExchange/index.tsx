import classnames from 'classnames';
import React, { useCallback, useMemo, useState, useEffect } from 'react';
import { Button } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useIntl } from 'react-intl';
import {
    useCurrenciesFetch,
} from '../../../hooks';
import {
    marketsFetch,
    selectMarkets,
    selectWallets,
    walletsFetch,
    Market,
    Wallet,
    marketPriceFetch,
    selectMarketPrice,
    selectMarketPriceFetchSuccess,
    createQuickExchangeFetch,
} from '../../../modules'
import { PRIMARY_PLATFORM_CURRENCY } from '../../../constants';
import { msPricesUpdates } from '../../../api';
import { QuickExchangeForm, Timer, Slider, PercentageButton, Modal, Decimal } from '../../../components';
import { ssToMMSS } from '../../../helpers';
import { CurrencyIcon } from '../../../components/CurrencyInfo';
import { CloseIcon } from '../../../assets/images/CloseIcon';
import { ArrowDown } from '../../../assets/images/downArrow';

interface QuickExchangeInterface {
    amount: string;
    wallet: Wallet;
};

interface QuickExchangeTimer {
    initialSeconds: number;
    initialMinutes: number;
};

const DEFAULT_WALLET: Wallet = {
    name: '',
    currency: '',
    balance: '',
    type: 'coin',
    fixed: 0,
    fee: 0,
    account_type: 'spot',
};


const DEFAULT_VALUE: QuickExchangeInterface = {
    amount: '',
    wallet: DEFAULT_WALLET,
};

const DEFAULT_VALUE_TIMER: QuickExchangeTimer = {
    initialSeconds: 0,
    initialMinutes: 0,
}

const amountPercentageArray = [0.25, 0.5, 0.75, 1];

const DEFAULT_MARKET_PRICE = {
    market: '',
    side: '',
    price: 0,
}

const sides = ['buy', 'sell'];

interface QuickExchangeContainerProps {
    side: string;
    sideIndex: number;
    sliderItemIndex: number;
    handleChangeSliderItemIndex: (value: number) => void;
}

export const QuickExchangeContainer = (props: QuickExchangeContainerProps) => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const [exchange, setExchange] = useState<QuickExchangeInterface>(DEFAULT_VALUE);
    const [receive, setReceive] = useState<QuickExchangeInterface>(DEFAULT_VALUE)
    const [time, settime] = useState<QuickExchangeTimer>(DEFAULT_VALUE_TIMER);
    const [show, setShow] = useState(false);

    const wallets = useSelector(selectWallets) || [];
    const markets = useSelector(selectMarkets) || [];
    const marketPrice = useSelector(selectMarketPrice) || DEFAULT_MARKET_PRICE;
    const updateTimer = useSelector(selectMarketPriceFetchSuccess);

    useCurrenciesFetch();

    const updatemarketPrices = () => {
        if (exchange.wallet?.currency && receive.wallet?.currency) {
            const market = exchange.wallet?.currency + receive.wallet?.currency;
            dispatch(marketPriceFetch({ market, side: sides[props.sideIndex] }));
        }
    }

    useEffect(() => {
        const seconds = +msPricesUpdates()/1000;
        settime(ssToMMSS(seconds));

        const nknWallet = wallets.find(item => item.currency === PRIMARY_PLATFORM_CURRENCY.toLowerCase());

        setReceive({
            amount: '',
            wallet: nknWallet,
        });

        dispatch(walletsFetch());
        dispatch(marketsFetch({type: 'qe'}))
    }, []);

    useEffect(() => {
        handleUpdateSlider(props.sliderItemIndex);
    }, [wallets, markets]);

    useEffect(() => {
        updatemarketPrices()
    }, [exchange.wallet?.currency, receive.wallet?.currency, props.sideIndex]);

    const getCurrencyForMarket = (market: Market) => (market.quote_unit.toLowerCase() === PRIMARY_PLATFORM_CURRENCY.toLowerCase())

    const marketBaseCurrencyList = markets.filter(getCurrencyForMarket).map((market: Market) => market.base_unit);

    const baseCurrencies = wallets.filter(item => {
        const baseIndex = marketBaseCurrencyList.findIndex(marketBaseCurrency => marketBaseCurrency === item.currency);

        return baseIndex !== -1;
    });

    const createOrder = () => {
        const params = {
            amount: exchange.amount,
            price: String(+marketPrice.price),
            side: props.side,
            market: exchange.wallet?.currency + receive.wallet?.currency

        }

        dispatch(createQuickExchangeFetch(params))

        setShow(false);
    };

    const handleUpdateField = (field: string, formSide: string) => (value: string | number) => {
        let updatedExchange;
        let updatedReceive;

        if (formSide === 'receive') {
            updatedReceive = {
                ...receive,
                amount: value,
            }

            updatedExchange = {
                ...exchange,
                amount: String(+value / +marketPrice.price),
            }

            setExchange(updatedExchange);
            setReceive(updatedReceive);
        }

        if (formSide === 'exchange') {
            updatedReceive = {
                ...receive,
                amount: String(+value * +marketPrice.price),
            }

            updatedExchange = {
                ...exchange,
                amount: value,
            }

            setExchange(updatedExchange);
            setReceive(updatedReceive);
        }
    };

    const handleUpdateSlider = (index: number) => {
        const nknWallet = wallets.find(item => item.currency === PRIMARY_PLATFORM_CURRENCY.toLowerCase());

        const updatedExchange = {
            ...exchange,
            amount: '',
            wallet: baseCurrencies[index],
        }

        const updatedReceive = {
            ...receive,
            amount: '',
            wallet: nknWallet,
        }

        props.handleChangeSliderItemIndex(index);
        setExchange(updatedExchange);
        setReceive(updatedReceive);
    };

    const handleChangeAmountByButton = (value: number) => {
        let updatedExchange;
        let updatedReceive;

        if (props.side === 'buy') {
            updatedReceive = {
                ...receive,
                amount: Decimal.format((+receive.wallet.balance * value), receive.wallet?.fixed, ''),
            }

            updatedExchange = {
                ...exchange,
                amount: Decimal.format((+receive.wallet.balance * value / +marketPrice.price), exchange.wallet?.fixed, ''),
            }

            setExchange(updatedExchange);
            setReceive(updatedReceive);
        } else {
            updatedExchange = {
                ...exchange,
                amount: Decimal.format((+exchange.wallet.balance * value), exchange.wallet?.fixed, ''),

            }

            updatedReceive = {
                ...receive,
                amount: Decimal.format((+exchange.wallet.balance * value * +marketPrice.price), receive.wallet?.fixed, ''),
            }

            setExchange(updatedExchange);
            setReceive(updatedReceive);
        }
    };

    const renderBaseCurrencies = (item: Wallet, index) => {
        const classname = classnames('cr-quick-exchange__slider', {
            'cr-quick-exchange__slider--alone': baseCurrencies.length <= 1,
        });

        return (
            <div key={index} className={classname}>
                <CurrencyIcon icon={item.iconUrl} currency={item.currency}/>
            </div>
        );
    }

    const renderButtons = () => {
        const orderItem = useMemo(() => classnames('cr-order-item', {
            'cr-order-item__buy': props.side === 'buy',
        }), [props.side]);

        return (
            <div className={orderItem}>
                <div className="cr-order-item__percentage-buttons">
                    {
                        amountPercentageArray.map((value, index) => <PercentageButton
                            value={value}
                            key={index}
                            onClick={handleChangeAmountByButton}
                        />)
                    }
                </div>
                <div className="cr-order-item__balance">
                    <div className="cr-order-item__balance-title">{translate('page.body.quick.exchange.balance')}</div>
                    <div className="cr-order-item__balance-amount">
                        {props.side === 'buy' ?
                            <span><Decimal fixed={receive.wallet?.fixed ? receive.wallet?.fixed : 0} thousSep=",">{receive.wallet?.balance}</Decimal> {receive.wallet?.currency?.toUpperCase()}</span>
                            : <span><Decimal fixed={exchange.wallet?.fixed ? exchange.wallet?.fixed : 0} thousSep=",">{exchange.wallet?.balance}</Decimal> {exchange.wallet?.currency?.toUpperCase()}</span>}
                    </div>
                </div>
        </div>
        );
    };

    const translate = useCallback((id: string) => formatMessage({ id: id }), [formatMessage]);

    const emptyFormClass = useMemo(() => classnames('cr-quick-exchange__form cr-quick-exchange__form__second', {
        'cr-quick-exchange__form__empty': !receive.amount,
    }), [receive.amount]);

    const renderFooter = useMemo(() => {
        return (
            <Button
                block={true}
                type="button"
                onClick={createOrder}
                size="lg"
                variant="primary"
            >
                {translate('page.body.quick.exchange.confirm')}
            </Button>
        );
    }, [receive, exchange]);

    const renderHeader = useMemo(() => {
        return (
            <React.Fragment>
                <div className="cr-modal__container-header-text">
                    {translate('page.body.quick.exchange.header')}
                </div>
                <CloseIcon className={'cr-modal__container-header-cancel'} onClick={() => setShow(false)}/>
            </React.Fragment>
        );
    }, [translate, setShow]);

    const renderCard = (amount: string, currency: string, iconUrl: string, fixed: number, text: string) => (
        <div className="cr-modal_body-card">
            <div className="cr-modal_body-card-block">
                <div>{text}</div>
                <div><Decimal fixed={fixed ? fixed : 0} thousSep=",">{amount.toString()}</Decimal> {currency?.toUpperCase()}</div>
            </div>
            <CurrencyIcon icon={iconUrl} currency={currency}/>
        </div>
    );

    const renderBody = useMemo(() => {
        const firstCardText = props.side === 'buy' ? translate('page.body.quick.exchange.spend') : translate('page.body.quick.exchange.receive');
        const SecondCardText = props.side === 'sell' ? translate('page.body.quick.exchange.spend') : translate('page.body.quick.exchange.receive');

        return (
            <React.Fragment>
                {renderCard(receive.amount, receive.wallet?.currency, receive.wallet?.iconUrl, receive.wallet?.fixed, firstCardText)}
                <div className="cr-modal_body-image">
                    <ArrowDown />
                </div>
                {renderCard(exchange.amount, exchange.wallet?.currency, exchange.wallet?.iconUrl, exchange.wallet?.fixed, SecondCardText)}
            </React.Fragment>
        );
    }, [receive, exchange]);

    return (
        <React.Fragment>
            <Slider
                loop={baseCurrencies.length > 1}
                selected={props.sliderItemIndex}
                showArrows={baseCurrencies.length > 1}
                onChanged={handleUpdateSlider}
            >{baseCurrencies.map(renderBaseCurrencies)}</Slider>
            <div className="cr-quick-exchange__currency">{exchange.wallet?.name} ({exchange.wallet?.currency?.toUpperCase()})</div>
            <div className="cr-quick-exchange__timer">{translate('page.body.quick.exchange.quotes')}
                {time.initialMinutes || time.initialSeconds ? <Timer updateTimer={updateTimer} {...time} handleRequest={updatemarketPrices} /> : null}
            </div>
            <div className="cr-quick-exchange__price">1 {exchange.wallet?.currency.toUpperCase()} = {Decimal.format(marketPrice.price, receive.wallet?.fixed, ',')} {PRIMARY_PLATFORM_CURRENCY?.toUpperCase()}</div>
            <div className="cr-quick-exchange__form">
                <div className="cr-quick-exchange__form-type">{props.side === 'buy' ? translate('page.body.quick.exchange.buy') : translate('page.body.quick.exchange.sell')}</div>
                <QuickExchangeForm
                    field="exchange"
                    fixed={exchange.wallet?.fixed}
                    handleChangeInput={handleUpdateField('amount', 'exchange')}
                    value={exchange.amount}
                />
                <div className="cr-quick-exchange__form-currency">{exchange.wallet?.currency?.toUpperCase()}</div>
            </div>
            {props.side === 'sell' ? renderButtons() : null}
            <div className={emptyFormClass}>
                <div className="cr-quick-exchange__form-type">{props.side === 'buy' ? translate('page.body.quick.exchange.pay') : translate('page.body.quick.exchange.get')}</div>
                <QuickExchangeForm
                    field="receive"
                    fixed={receive.wallet?.fixed}
                    handleChangeInput={handleUpdateField('amount', 'receive')}
                    value={receive.amount}
                />
                <div className="cr-quick-exchange__form-currency">{receive.wallet?.currency?.toUpperCase()}</div>
            </div>
            {props.side === 'buy' ? renderButtons() : null}
            <div className="cr-quick-exchange__preview">
                <Button
                    block={true}
                    type="button"
                    onClick={() => setShow(!show)}
                    size="lg"
                    variant="primary"
                    disabled={!receive.amount || !exchange.amount}
                >
                    {translate('page.body.quick.exchange.preview')}
                </Button>
            </div>
            <Modal
                show={show}
                header={renderHeader}
                content={renderBody}
                footer={renderFooter}
            />
        </React.Fragment>
    );
};
