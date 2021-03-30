import { LandingBlock } from '@openware/react-components';
import * as React from 'react';
import { injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { Link, RouteProps, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import { IntlProps } from '../../';
import { Logo } from '../../components';
import { toggleColorTheme } from '../../helpers';
import {
    RootState,
    selectCurrentColorTheme,
    selectUserLoggedIn,
} from '../../modules';
import { HowItWorks } from './HowItWorks';
import { MarketSlideShow } from '../../containers';

import transferMoney from 'src/assets/images/landing/nairaex/transferMoney.png';
import quickExchange from 'src/assets/images/landing/nairaex/quickExchange.png';
import mobTrading from 'src/assets/images/landing/nairaex/mobTrading.png';
import withdraw from 'src/assets/images/landing/nairaex/withdraw.png';

import maestro from 'src/assets/images/landing/nairaex/payment/visa.svg';
import mastercard from 'src/assets/images/landing/nairaex/payment/viseElectron.svg';
import visa from 'src/assets/images/landing/nairaex/payment/mastercard.svg';
import visaElectron from 'src/assets/images/landing/nairaex/payment/maestro.svg';

import TwitterIcon from 'src/assets/images/landing/nairaex/socials/Twitter.svg';
import YouTubeIcon from 'src/assets/images/landing/nairaex/socials/Youtube.svg';
import InstagramIcon from 'src/assets/images/landing/nairaex/socials/Instagram.svg';
import FacebookIcon from 'src/assets/images/landing/nairaex/socials/Facebook.svg';

import topImage from 'src/assets/images/landing/nairaex/topImage.png';

import footerLogo from 'src/assets/images/landing/nairaex/footerLogo.svg';

const withdrawMethodIcons = [visa, visaElectron, mastercard, maestro];

interface ReduxProps {
    isLoggedIn: boolean;
    colorTheme: string;
}

type Props = ReduxProps & RouteProps & IntlProps;

class Landing extends React.Component<Props> {
    public componentDidMount() {
        if (this.props.colorTheme === 'dark') {
            toggleColorTheme('light');
        }
    }

    public componentWillReceiveProps(next: Props) {
        if (next.colorTheme === 'dark') {
            toggleColorTheme('light');
        }
    }

    public componentWillUnmount() {
        if (this.props.colorTheme === 'light') {
            toggleColorTheme(this.props.colorTheme);
        }
    }

    public learnMoreList = [
        {
            title: 'What is bitcoin?',
            description: 'A quick start guide on how to buy Bitcoin and the basics of trading cryptocurrencies.',
            link: '/',
            buttonName: 'Learn',
        },
        {
            title: 'What is bitcoin?',
            description: 'A quick start guide on how to buy Bitcoin and the basics of trading cryptocurrencies.',
            link: '/',
            buttonName: 'Learn',
        },
        {
            title: 'What is bitcoin?',
            description: 'A quick start guide on how to buy Bitcoin and the basics of trading cryptocurrencies.',
            link: '/',
            buttonName: 'Learn',
        }
    ]

    public renderNavbarItems = [
        {name: 'About', link: '/'},
        {name: 'Learn', link: '/'},
        {name: 'Features', link: '/'},
        {name: 'Support', link: '/'},
        {name: 'Blog', link: '/'},
    ];

    public fotterLinks = [
        {
            category: 'Company',
            links: [{name: 'About us', link: '/'}, {name: 'Jobs', link: '/'}, {name: 'Privacy Policy', link: '/'}, {name: 'Terms of service', link: '/'}]
        },
        {
            category: 'Exchange',
            links: [{name: 'Simple Buy/Sell', link: '/'}, {name: 'Advanced Buy/Sell', link: '/'}, {name: 'Internal transers', link: '/'}, {name: 'Withdrawal', link: '/'}]
        },
        {
            category: 'Services',
            links: [{name: 'Mobile Top-up', link: '/'}, {name: 'Electricity bill', link: '/'}, {name: 'Cable TV', link: '/'}, {name: 'Internet', link: '/'}]
        },
        {
            category: 'Learn',
            links: [{name: 'What is Bitcoin', link: '/'}, {name: 'How to buy Bitcoin', link: '/'}, {name: 'How to sell Bitcoin', link: '/'}, {name: 'FAQs', link: '/'}, {name: 'Blog', link: '/'}]
        }
    ]

    public render() {
        return (
            <main className="pg-landing-screen">
                <nav className="pg-landing-screen__header">
                    <div className="pg-landing-screen__header__wrap">
                        <div className="pg-landing-screen__header__wrap__left" onClick={(e) => this.handleScrollTop()}>
                            <Logo />
                        </div>
                        <div className="pg-landing-screen__header__wrap__left" onClick={(e) => this.handleScrollTop()}>
                            {this.renderNavbarItems.map(item => (<Link className="pg-landing-screen__header__wrap__center-item" to={item.link}>{item.name}</Link>))}
                        </div>
                        <div className="pg-landing-screen__header__wrap__right">
                            {this.props.isLoggedIn ? (
                                <Link to="/profile" className="landing-button">
                                    {this.translate('page.body.landing.header.button1')}
                                </Link>
                            ) : (
                                <>
                                    <Link to="/signin" className="landing-button landing-button--simple">
                                        {this.translate('page.body.landing.header.button2')}
                                    </Link>
                                    <Link to="/signup" className="landing-button">
                                        {this.translate('page.body.landing.header.button3')}
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </nav>

                <section className="pg-landing-screen__top container">
                    <LandingBlock contentClassName="pg-landing-screen__top-content">
                        <div className="pg-landing-screen__market-info">
                            <div className="pg-landing-screen__market-info__wrap">
                                <div className="pg-landing-screen__market-info__wrap__title">
                                    <h1>{this.translate('page.body.landing.marketInfo.title.text1')}</h1>
                                    <h3>{this.translate('page.body.landing.marketInfo.title.text2')}</h3>
                                    <Link to="/singup" className="landing-button">
                                        {this.translate('page.body.landing.marketInfo.title.button')}
                                    </Link>
                                </div>
                                <div>
                                    <img src={topImage} alt="nigerias_premier_crypto_exchange" />
                                </div>
                            </div>
                        </div>
                    </LandingBlock>
                </section>

                <section>
                    <div className="pg-landing-screen__slider"><MarketSlideShow /></div> 
                </section>

                <section className="pg-landing-screen__how_it_works">
                    <LandingBlock contentClassName="pg-landing-screen__how_it_works-content">
                        <div className="pg-landing-screen__how_it_works__item">
                            <h1>{this.translate('page.body.landing.how_it_works.item.title')}</h1>
                            <h2>{this.translate('page.body.landing.how_it_works.item.text')}</h2>
                        </div>
                        <div className="pg-landing-screen__how_it_works__block">
                            <HowItWorks />
                        </div>
                    </LandingBlock>
                </section>

                <section className="pg-landing-screen__blocks background-image">
                    <LandingBlock contentClassName="pg-landing-screen__blocks">
                        <div className="pg-landing-screen__blocks-info">
                            <h1>{this.translate('page.body.landing.simple.exchange.title')}</h1>
                            <h3>{this.translate('page.body.landing.simple.exchange.subtitle')}</h3>
                            <p>{this.translate('page.body.landing.simple.exchange.description')}</p>
                            <Link to="/trading" className="landing-button">
                                {this.translate('page.body.landing.simple.exchange.button')}
                            </Link>
                        </div>
                        <img src={quickExchange} alt="" />
                    </LandingBlock>
                </section>

                <section className="pg-landing-screen__blocks container pg-landing-screen__blocks-reverse">
                    <LandingBlock contentClassName="pg-landing-screen__blocks">
                        <div className="pg-landing-screen__blocks-info">
                            <h1>{this.translate('page.body.landing.trade.title')}</h1>
                            <h3>{this.translate('page.body.landing.trade.subtitle')}</h3>
                            <p>{this.translate('page.body.landing.trade.description')}</p>
                            <Link to="/singup" className="landing-button">
                                {this.translate('page.body.landing.trade.button')}
                            </Link>
                        </div>
                        <img src={mobTrading} alt="" />
                    </LandingBlock>
                </section>

                <section className="pg-landing-screen__blocks background-image">
                    <LandingBlock contentClassName="pg-landing-screen__blocks">
                        <div className="pg-landing-screen__blocks-info">
                            <h1>{this.translate('page.body.landing.withdraw.title')}</h1>
                            <h3>{this.translate('page.body.landing.withdraw.subtitle')}</h3>
                            <p>{this.translate('page.body.landing.withdraw.description')}</p>
                            {withdrawMethodIcons.map(item => <img src={item} />)}
                        </div>
                        <img src={withdraw} alt="" />
                    </LandingBlock>
                </section>

                <section className="pg-landing-screen__blocks container">
                    <LandingBlock contentClassName="pg-landing-screen__blocks">
                        <div className="pg-landing-screen__blocks-info">
                            <h1>{this.translate('page.body.landing.transfers.title')}</h1>
                            <h3>{this.translate('page.body.landing.transfers.subtitle')}</h3>
                            <p>{this.translate('page.body.landing.transfers.description')}</p>
                            <Link to="/singup" className="landing-button">
                                {this.translate('page.body.landing.transfers.button')}
                            </Link>
                        </div>
                        <img src={transferMoney} className="pg-landing-screen__blocks-image" alt="" />
                    </LandingBlock>
                </section>

                <section className="pg-landing-screen__learn_more background-image">
                    <LandingBlock contentClassName="pg-landing-screen__learn-more-content">
                        <div className="pg-landing-screen__learn-more__item">
                            <h1>{this.translate('page.body.landing.learn-more.title')}</h1>
                        </div>
                        <div className="pg-landing-screen__learn-more__block">
                            {this.learnMoreList.map(item => (
                                <div className="pg-landing-screen__learn-more__block-card">
                                    <h3>{item.title}</h3>
                                    <p>{item.description}</p>
                                    <Link to={item.link} className="landing-button">{item.buttonName}</Link>
                                </div>
                            ))}
                        </div>
                    </LandingBlock>
                </section>

                <footer className="pg-landing-screen__footer">
                    <div className="pg-landing-screen__footer-links container">
                        {this.fotterLinks.map((item, index) => (
                            <div className="pg-landing-screen__footer-links-item" key={index}>
                                <h3>{item.category}</h3>
                                <div className="pg-landing-screen__footer-links-item-link">{item.links.map(e => <Link to={e.link}>{e.name}</Link>)}</div>
                            </div>
                        ))}
                    </div>
                    <div className="pg-landing-screen__footer-block container">
                        <div className="pg-landing-screen__footer-block-logo" onClick={(e) => this.handleScrollTop()}>
                            <img src={footerLogo} alt="nairaex"/>
                        </div>
                        <div className="pg-landing-screen__footer-block-socials">
                            <div className="pg-landing-screen__footer-block-socials__row">
                                <Link to='/'><img src={YouTubeIcon} alt="Youtube" /></Link>
                                <Link to='/'><img src={FacebookIcon} alt="Facebook" /></Link>
                                <Link to='/'><img src={InstagramIcon} alt="Instagram" /></Link>
                                <Link to='/'><img src={TwitterIcon} alt="Twitter" /></Link>
                            </div>
                        </div>
                    </div>
                </footer>
            </main>
        );
    }

    private handleScrollTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    private translate = (key: string) => this.props.intl.formatMessage({ id: key });
}

const mapStateToProps = (state: RootState): ReduxProps => ({
    isLoggedIn: selectUserLoggedIn(state),
    colorTheme: selectCurrentColorTheme(state),
});

export const LandingScreen = compose(
    injectIntl,
    withRouter,
    connect(mapStateToProps, null)
)(Landing) as React.ComponentClass;
