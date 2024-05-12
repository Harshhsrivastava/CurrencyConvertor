const fromCurrencySelect = document.getElementById('fromCurrency');
const toCurrencySelect = document.getElementById('toCurrency');
const fromAmountInput = document.getElementById('fromAmount');
const toAmountInput = document.getElementById('toAmount');

// Populate currency options
fetch('https://api.exchangerate-api.com/v4/latest/INR')
  .then(response => response.json())
  .then(data => {
    const currencies = Object.keys(data.rates);
    currencies.forEach(currency => {
      const option1 = document.createElement('option');
      option1.value = currency;
      option1.textContent = currency;
      fromCurrencySelect.appendChild(option1);

      const option2 = document.createElement('option');
      option2.value = currency;
      option2.textContent = currency;
      toCurrencySelect.appendChild(option2);
    });
  });

// Event listeners for input change
fromAmountInput.addEventListener('input', () => {
  convertCurrency();
});

fromCurrencySelect.addEventListener('change', () => {
  convertCurrency();
});

toCurrencySelect.addEventListener('change', () => {
  convertCurrency();
});

// Conversion function
function convertCurrency() {
  const fromCurrency = fromCurrencySelect.value;
  const toCurrency = toCurrencySelect.value;
  const amount = parseFloat(fromAmountInput.value);

  fetch(`https://api.exchangerate-api.com/v4/latest/${fromCurrency}`)
    .then(response => response.json())
    .then(data => {
      const exchangeRate = data.rates[toCurrency];
      const convertedAmount = amount * exchangeRate;
      toAmountInput.value = convertedAmount.toFixed(2);
    })
    .catch(error => {
      console.log('Error:', error);
    });
}
