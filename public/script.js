let polling = null;

const updateUI = (data) => {
  const avgEl = document.getElementById('avg');
  const bidEl = document.getElementById('bid');
  const askEl = document.getElementById('ask');
  const updatedEl = document.getElementById('updated');

  if (!avgEl || !bidEl || !askEl || !updatedEl) return;

  avgEl.innerText = `$${data.averagePrice.toFixed(2)}`;
  bidEl.innerText = `Цена для покупки (с учётом комиссии): $${data.bidPriceWithFee.toFixed(2)}`;
  askEl.innerText = `Цена для продажи (с учётом комиссии): $${data.askPriceWithFee.toFixed(2)}`;
  updatedEl.innerText = `Обновлено: ${new Date(data.lastUpdated).toLocaleTimeString()}`;
};

const loadPrice = async () => {
  try {
    const res = await fetch('/price');
    if (res.ok) {
      const data = await res.json();
      updateUI(data);
      if (polling) clearInterval(polling);
      polling = setInterval(loadPrice, 10000);
      return;
    }
  } catch (e) {
    console.error('Ошибка загрузки:', e);
  }
  if (!polling) {
    polling = setTimeout(loadPrice, 1000);
  }
};

loadPrice();