import React, { FC, ReactElement } from 'react';
import { useSelector } from 'react-redux';
import { Decimal } from '../../components';
import {
    useMarketsFetch,
    useMarketsTickersFetch,
    useRangerConnectFetch,
} from '../../hooks';
import {
    selectMarkets,
    selectMarketTickers,
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
    useMarketsFetch();
    useMarketsTickersFetch();
    useRangerConnectFetch();
    const markets = useSelector(selectMarkets);
    const marketTickers = useSelector(selectMarketTickers);

    const marketsWithTicker = markets.map(market =>
        ({
            ...market,
            last: Decimal.format(Number((marketTickers[market.id] || defaultTicker).last), market.amount_precision),
            open: Decimal.format(Number((marketTickers[market.id] || defaultTicker).open), market.price_precision),
            price_change_percent: String((marketTickers[market.id] || defaultTicker).price_change_percent),
            high: Decimal.format(Number((marketTickers[market.id] || defaultTicker).high), market.amount_precision),
            low: Decimal.format(Number((marketTickers[market.id] || defaultTicker).low), market.amount_precision),
            volume: Decimal.format(Number((marketTickers[market.id] || defaultTicker).volume), market.amount_precision),
        }),
    ).map(market =>
        ({
            ...market,
            change: Decimal.format((+market.last - +market.open)
                .toFixed(market.price_precision), market.price_precision),
        }),
    );

    return (
        <div className="ticker">
            {
                marketsWithTicker.length ?
                    <Ticker>
                        {({ index }) => (
                            <span className="ticker_content">
                                <div style={{display: 'flex'}}>
                                    {marketsWithTicker.map((market, marketIndex) => {
                                        const marketChangeColor = +(market.change || 0) < 0 ? 'negative' : 'positive';

                                        return (
                                            <span key={marketIndex}>
                                                <div className="carousel__slider-slide-card">
                                                    <div className="carousel__slider-slide-card-block">
                                                        <h3>{market.base_unit?.toUpperCase()}/<span>{market.quote_unit?.toUpperCase()}</span></h3>
                                                        <span className={marketChangeColor}>{market.change}</span>
                                                    </div>
                                                    <span className="carousel__slider-slide-card-price">{market.last} {market.quote_unit?.toUpperCase()}</span>
                                                </div>
                                            </span>)}
                                        )
                                    }
                                </div>
                            </span>
                        )}
                    </Ticker>
                : <div>Markets not exist</div>
            }
        </div>
    );
};
