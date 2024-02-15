import React, { useState } from 'react';

const Converter = () => {
  const [amount, setAmount] = useState('');
  const [fromCurrency, setFromCurrency] = useState('EUR');
  const [toCurrency, setToCurrency] = useState('USD');
  const [result, setResult] = useState('');
  const [error, setError] = useState('');

  const convertCurrency = async () => {
    try {
      const response = await fetch(`https://currency-converter18.p.rapidapi.com/api/v1/convert?from=${fromCurrency}&to=${toCurrency}&amount=${amount}`, {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': '422b48771dmshe6b4e4b3b1b3eeep1bfbbfjsnb332ab7dacff',
          'X-RapidAPI-Host': 'currency-converter18.p.rapidapi.com'
        }
      });
      const data = await response.json();
      if (data.error) {
        setError(data.error);
        setResult('');
      } else {
        setResult(data.result);
        setError('');
      }
    } catch (error) {
      console.error('Error fetching conversion data:', error);
      setError('Error fetching conversion data. Please try again.');
      setResult('');
    }
  };

  const handleConvert = (e) => {
    e.preventDefault();
    convertCurrency();
  };

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Currency Converter</h1>
      <form onSubmit={handleConvert}>
        <div className="row justify-content-center">
          <div className="col-sm-4">
            <input type="number" className="form-control mb-3" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="Enter amount" required />
          </div>
          <div className="col-sm-2">
            <select className="form-select mb-3" value={fromCurrency} onChange={(e) => setFromCurrency(e.target.value)}>
              <option value="USD">United States Dollar</option>
              <option value="AOA">Angola Kwanza</option>
              <option value="AUD">Australia Dollar</option>
              <option value="NGN">Nigeria Naira</option>
              <option value="EUR">Euro Member Countries</option>
              <option value="GBP">United Kingdom Pound</option>
            </select>
          </div>
          <div className="col-sm-2">
            <select className="form-select mb-3" value={toCurrency} onChange={(e) => setToCurrency(e.target.value)}>
              <option value="USD">United States Dollar</option>
              <option value="AOA">Angola Kwanza</option>
              <option value="AUD">Australia Dollar</option>
              <option value="NGN">Nigeria Naira</option>
              <option value="EUR">Euro Member Countries</option>
              <option value="GBP">United Kingdom Pound</option>
            </select>
          </div>
          <div className="col-sm-2">
            <button type="submit" className="btn btn-primary mb-3">Convert</button>
          </div>
        </div>
      </form>
      {error && <p className="text-danger">{error}</p>}
      {result && (
        <div>
          <p className="fw-bold">Result:</p>
          <p>From: {result.from}</p>
          <p>To: {result.to}</p>
          <p>Amount to Convert: {result.amountToConvert}</p>
          <p>Converted Amount: {result.convertedAmount}</p>
        </div>
      )}
    </div>
  );
};

export default Converter;
