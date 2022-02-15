import React, { useEffect, useCallback, useState } from 'react';
import { useIntl } from 'react-intl';
import { useDispatch } from 'react-redux';
import { QuickExchangeContainer } from '../../containers';
import { setDocumentTitle } from '../../../helpers';
import { TabPanel } from '../../../components';

export const QuickExchange: React.FC = () => {
    const { formatMessage } = useIntl();
    const dispatch = useDispatch();

    const [index, setIndex] = useState(0);
    const [sliderItemIndex, setSliderItemIndex] = useState(0);

    useEffect(() => {
        setDocumentTitle('Quick Exchange');
    }, [dispatch]);

    const translate = useCallback((id: string) => formatMessage({ id: id }), [formatMessage]);

    const isSideSell = (side: string) => side === 'sell';

    const getPanel = (side: string) => {
        const preLabel = isSideSell(side) ? (
            translate('page.body.trade.header.newOrder.content.tabs.sell')
        ) : (
            translate('page.body.trade.header.newOrder.content.tabs.buy')
        );
        const label = isSideSell(side) ? 'Sell' : 'Buy';

        return {
            content: (
                <QuickExchangeContainer
                    side={side}
                    sideIndex={index}
                    sliderItemIndex={sliderItemIndex}
                    handleChangeSliderItemIndex={value => setSliderItemIndex(value)}
                />
            ),
            label: preLabel || label,
        };
    };

    const getPanels = () => {
        return [getPanel('buy'), getPanel('sell')];
    };

    return (
        <div className="pg-quick-exchange">
            <div className="cr-quick-exchange">
                <div className="cr-quick-exchange__header">{translate('page.body.quick.exchange.header')}</div>
                    <TabPanel
                        fixed={true}
                        panels={getPanels()}
                        onTabChange={(index: number) => setIndex(index)}
                        currentTabIndex={index}
                    />
                </div>
        </div>
    );
};
