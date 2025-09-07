import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { serveStatic } from '@hono/node-server/serve-static';
import { fetchAndUpdatePrice, getPrice } from './binance';

const app = new Hono();

app.use('/index.html', serveStatic({ root: './public' }));
app.use('/script.js', serveStatic({ root: './public' }));
app.use('/index.css', serveStatic({ root: './public' }));

app.get('/', (c) => c.redirect('/index.html'));

app.get('/price', (c) => {
  const price = getPrice();
  if (!price) return c.json({ error: 'Цена ещё не загружена. Подождите.' }, 503);
  return c.json(price);
});

const startServer = async () => {
  await fetchAndUpdatePrice(); //

  setInterval(fetchAndUpdatePrice, 10000);

  console.log('Сервер запущен на порту 8080');
  serve({ ...app, port: 8080 });
};

startServer();