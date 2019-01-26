import { eventChannel } from 'redux-saga';
// tslint:disable-next-line no-submodule-imports
import { call, put, race, take, takeEvery } from 'redux-saga/effects';
import { rangerUrl } from '../../../api/config';
import { tradePush } from '../../history/trades/actions';
import { marketsTickersData, SetCurrentMarket } from '../../markets';
import { SET_CURRENT_MARKET } from '../../markets/constants';
import { depthData } from '../../orderBook';
import { userOrdersUpdate } from '../../orders';
import { recentTradesPush } from '../../recentTrades';
import { rangerSubscribeMarket, rangerUnsubscribeMarket } from '../actions';
import { RANGER_CONNECT_DATA, RANGER_DIRECT_WRITE, RANGER_DISCONNECT } from '../constants';

const streams: string[] = [
    'global.tickers',
    'order',
    'trade',
];

const generateSocketURI = (s: string[]) => `${rangerUrl()}/?stream=${s.sort().join('&stream=')}`;

export const formatTicker = event => {
    const tickers = {};
    for (const market in event) {
        if (event.hasOwnProperty(market)) {
            const { low, high, last, volume, sell, buy } = event[market];
            tickers[market] = { low, high, last, sell, buy, vol: volume };
        }
    }
    return tickers;
};

// tslint:disable no-console
const initRanger = () => {
    const ws = new WebSocket(generateSocketURI(streams));
    const channel = eventChannel(emitter => {
        ws.onopen = () => {
            emitter({ type: RANGER_CONNECT_DATA });
        };
        ws.onerror = error => {
            console.log(`WebSocket error ${error}`);
            console.dir(error);
        };
        ws.onmessage = ({ data }) => {
            let routingKey;
            let payload;
            try {
                [routingKey, payload] = JSON.parse(data as string);
            } catch (e) {
                console.error(`Error parsing : ${e.data}`);
            }

            if (routingKey && payload) {
                // public
                if (/([^.]*)\.update/.test(routingKey)) {
                    emitter(depthData(payload));
                    return;
                }

                // public
                const m = String(routingKey).match(/([^.]*)\.trades/);
                if (m) {
                    emitter(recentTradesPush({
                        trades: payload.trades,
                        market: m[1],
                    }));
                    return;
                }

                switch (routingKey) {
                    // public
                    case 'global.tickers':
                        emitter(marketsTickersData(formatTicker(payload)));
                        return;

                    // private
                    case 'order':
                        emitter(userOrdersUpdate(payload));
                        return;

                    // private
                    case 'trade':
                        emitter(tradePush(payload));
                        return;

                    default:
                }
            }
            console.log(`Unhandeled websocket channel: ${routingKey}`);
        };
        // unsubscribe function
        return () => {
            console.log('Socket off');
        };
    });
    return [channel, ws];
};

function* writter(socket) {
    while (true) {
        const data = yield take(RANGER_DIRECT_WRITE);
        socket.send(JSON.stringify(data.payload));
    }
}

function* reader(channel) {
    while (true) {
        const action = yield take(channel);
        yield put(action);
    }
}

let previousMarketId: string;

function* switchMarket(action: SetCurrentMarket) {
    if (previousMarketId && previousMarketId !== action.payload.id) {
        yield put(rangerUnsubscribeMarket(previousMarketId));
    }
    previousMarketId = action.payload.id;
    yield put(rangerSubscribeMarket(action.payload.id));
}

export function* rangerSagas() {
    yield takeEvery(SET_CURRENT_MARKET, switchMarket);

    const [channel, ws] = yield call(initRanger);
    const { cancel } = yield race({
        task: [
            call(reader, channel),
            call(writter, ws),
        ],
        cancel: take(RANGER_DISCONNECT),
    });

    if (cancel) {
        ws.close();
    }
}