# Backend Test for enye's cohort 5 application

- https://habib-enye-be-test-1.herokuapp.com/

## Overview

- This is a service integration to [Exhange Rate API](https://api.exchangeratesapi.io/latest) and exposes a RESTful endpoint. The endpoint accepts GET requests and returns a modified response schema from the integrated API.

-  The REST endpoint `/api/rates` returns a JSON object of the latest currency rates in the following format/schema:

```jsx
{
    "results": {
        "base": "",
        "date": "",
        "rates": {
        }
    }
}
```

- The `/api/rates` endpoint accepts the following request query parameter strings

  - **base**: the home currency rates to be quoted against (e.g. `CZK`)
  
  - **currency**: the specific exchange rates based on a comma-separated symbols parameter (e.g. `EUR,GBP,USD`).

- Upon a successful API response, the fetched payload is an object containing the following keys:

  1. **results**: JSON object containing the results from the API
  2. **base**: the requested home rate from the request URL query strings
  3. **date**: the current date 
  4. **rates**: An Object containing the requested currency in the request URL query strings

### Example

- As an example, a request to fetch the currency exchange rates from `CZK` to `EUR,GBP,USD`  might look like:

```jsx
/api/rates?base=CZK&currency=EUR,GBP,USD
```

- A successful response for the above request should return the following schema (of course with a more up-to-date values)

```jsx
{
    "results": {
        "base": "CZK",
        "date": "2020-11-17",
        "rates": {
            "EUR": 0.0377244605,
            "GBP": 0.033795458,
            "USD": 0.044824204
        }
    }
}
```