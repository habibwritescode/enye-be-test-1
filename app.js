const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const fetch = require('node-fetch');

// function error(status, msg) {
//   var err = new Error(msg);
//   err.status = status;
//   return err;
// }

let rates;

app.get('/api/rates/', (req, res, next) => {
  const {base, currency} = req.query
  console.log('bc',base, currency)
  
  if(!base || !currency){
    res.status(400).json({
      error: 'Some required parameters are missing'
    })
  }
  
  async function getApiResults() {
    try {
      const response = await fetch(`https://api.exchangeratesapi.io/latest?base=${base}`)
      const json = await response.json()
      rates = await json.rates;
      // console.log(rates)
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
  
  // console.log('td',today);
  // console.log('0', currencies[0]);
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
  // console.log(req.query)
})

app.listen(port, () => {
  console.log(`listening at port ${port}`)
})