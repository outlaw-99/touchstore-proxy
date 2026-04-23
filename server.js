const express = require('express');
const cors = require('cors');

const app = express();
app.use(express.json());

// Allow requests from your Netlify site
app.use(cors({
  origin: ['https://touchstoregigs.netlify.app', 'http://localhost'],
}));

const DATAMART_KEY = "a87b5807959fcd976a08981d0b20a528fdfea6417435a710dc38f125c242a21d";
const DATAMART_URL = "https://api.datamartgh.shop/api/developer";

// Purchase data
app.post('/purchase', async (req, res) => {
  try {
    const response = await fetch(`${DATAMART_URL}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': DATAMART_KEY,
      },
      body: JSON.stringify(req.body),
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// Check order status
app.get('/order-status/:reference', async (req, res) => {
  try {
    const response = await fetch(`${DATAMART_URL}/order-status/${req.params.reference}`, {
      headers: { 'X-API-Key': DATAMART_KEY },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// Check wallet balance
app.get('/balance', async (req, res) => {
  try {
    const response = await fetch(`${DATAMART_URL}/balance`, {
      headers: { 'X-API-Key': DATAMART_KEY },
    });
    const data = await response.json();
    res.status(response.status).json(data);
  } catch (e) {
    res.status(500).json({ status: 'error', message: e.message });
  }
});

// Health check
app.get('/', (req, res) => res.json({ status: 'Touch Store proxy running' }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Proxy running on port ${PORT}`));
