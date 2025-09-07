let cachedPrice: any = null;

export const fetchAndUpdatePrice = async () => {
  try {
    const res = await fetch('https://api.binance.com/api/v3/ticker/bookTicker?symbol=BTCUSDT');
    const data = await res.json();

    const bid = parseFloat(data.bidPrice);
    const ask = parseFloat(data.askPrice);
    const fee = 0.0001;

    const bidWithFee = bid * (1 - fee);
    const askWithFee = ask * (1 + fee);
    const avg = (bidWithFee + askWithFee) / 2;

    cachedPrice = {
      bidPriceWithFee: bidWithFee,
      askPriceWithFee: askWithFee,
      averagePrice: avg,
      lastUpdated: new Date().toISOString(),
    };

    console.log(`Цена BTC: $${avg.toFixed(2)}`);
  } catch (err) {
    console.error('Ошибка обновления:', err);
  }
};

export const getPrice = () => cachedPrice;