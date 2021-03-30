import React, { useCallback } from 'react';
import { useIntl } from 'react-intl';

import login from 'src/assets/images/landing/nairaex/login.png';
import order from 'src/assets/images/landing/nairaex/illustration.png';
import pay from 'src/assets/images/landing/nairaex/pay.png';


interface HowItWorksInterface {
    image: string;
    title: string;
    description: string;
}

export const HowItWorks = () => {
    const { formatMessage } = useIntl();

    const translate = useCallback((id: string) => formatMessage({ id: id }), [formatMessage]);

    const howitworks: HowItWorksInterface[] = [
        { image: login, title: translate('page.body.landing.how_it_works.card.title.first'), description: translate('page.body.landing.how_it_works.card.description.first') },
        { image: order, title: translate('page.body.landing.how_it_works.card.title.second'), description: translate('page.body.landing.how_it_works.card.description.second') },
        { image: pay, title: translate('page.body.landing.how_it_works.card.title.third'), description: translate('page.body.landing.how_it_works.card.description.third') },
    ];
    
    return (
        <>
            {howitworks.map((item: HowItWorksInterface) => (
                <div className="how-it-works-card">
                    <img src={item.image} alt="verification"/>
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                </div>
            ))}
        </>
    )
}