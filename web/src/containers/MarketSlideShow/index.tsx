import React, { FC, ReactElement, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { Decimal } from '../../components';
import {
    useMarketsFetch,
    useMarketsTickersFetch,
} from '../../hooks';
import {
    selectMarkets,
    selectMarketTickers,
    setCurrentMarket,
    Market,
} from '../../modules';
import Ticker from "react-ticker";

const defaultTicker = {
    amount: '0.0',
    last: '0.0',
    high: '0.0',
    open: '0.0',
    low: '0.0',
    price_change_percent: '+0.00%',
    volume: '0.0',
};

export const MarketSlideShow: FC = (): ReactElement => {
    const history = useHistory();
    const dispatch = useDispatch();
    useMarketsFetch();
    useMarketsTickersFetch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);
    const [stopLine, setStopLine] = useState(false);

    const marketsWithTicker = markets.map(market =>
        ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
        }),
    ).map(market =>
        ({
            ...market,
            change: Decimal.format((+market.last - +market.open)
                .toFixed(market.price_precision), market.price_precision),
        }),
    );

    const handleRedirectToTrading = (id: string) => {
        const currentMarket: Market | undefined = markets.find(item => item.id === id);

        if (currentMarket) {
            dispatch(setCurrentMarket(currentMarket));
            history.push(`/trading/${currentMarket.id}`);
        }
    };

    const renderMarketCards = useMemo(() => {
        return (
            <Ticker speed={10} move={!stopLine}>
                {({ index }) => (
                    <span className="ticker_content">
                        <div style={{display: 'flex'}}>
                            {
                                marketsWithTicker.map((market, marketIndex) => {
                                    const marketChangeColor = +(market.change || 0) < 0 ? 'negative' : 'positive';

                                    return (
                                        <span onMouseEnter={() => setStopLine(true)} onMouseLeave={() => setStopLine(false)} onClick={() => handleRedirectToTrading(market.id)} key={marketIndex}>
                                            <div className="carousel__slider-slide-card">
                                                <div className="carousel__slider-slide-card-block">
                                                    <h3>{market.base_unit?.toUpperCase()}/<span>{market.quote_unit?.toUpperCase()}</span></h3>
                                                    <span className={marketChangeColor}>{market.change}</span>
                                                </div>
                                                <span className="carousel__slider-slide-card-price">{market.last} {market.quote_unit?.toUpperCase()}</span>
                                            </div>
                                        </span>
                                    )
                                })
                            }
                        </div>
                    </span>
                )}
            </Ticker>
    )}, [marketTickers, markets, marketsWithTicker]);

    return (
        <div className="ticker">
            {marketsWithTicker.length ? renderMarketCards : <div>Markets not exist</div>}
        </div>
    );
};
