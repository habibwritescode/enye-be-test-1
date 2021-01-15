const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

let rates;

app.get('/', (req, res) => {
  res.send('Welcome! the endpoint is at "/api/rates"');
})

app.get('/api/rates/', (req, res) => {
  const {base, currency} = req.query;
  
  if(!base || !currency){
    res.status(400).json({
      error: 'A required parameter is missing'
    })
  }
  
  async function getApiResults() {
    try {
      const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`);
      const json = await response.json();
      rates = await json.rates;
    } catch (error) {
      console.error(error)
    }
    return rates;
  }
  getApiResults()
  
  const date = new Date();
  const dd = String(date.getDate()).padStart(2, '0');
  const mm = String(date.getMonth() + 1).padStart(2, '0'); //January is 0!
  const yyyy = date.getFullYear();
  
  const today = `${yyyy}-${mm}-${dd}`;
  
  const currencies = currency.split(',');
  
  res.json({
    "results": {
      "base": `${base}`,
      "date": `${today}`,
      "rates": {
        [currencies[0]]: rates[currencies[0]],
        [currencies[1]]: rates[currencies[1]],
        [currencies[2]]: rates[currencies[2]]
      }
    }
  })
})

app.listen(port, () => {
  console.log(`listening at port ${port}`);
})
