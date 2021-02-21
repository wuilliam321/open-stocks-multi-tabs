import app from './app';

const tickerForm = document.getElementById("form");
tickerForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const tickerInput = <HTMLInputElement>document.getElementById("ticker");
  if (!tickerInput.value) {
    // TODO: add error class to the input
    return false;
  } else {
    // TODO: remove error class
  }

  const sites = [
    'https://www.google.com/search?q=<TKR>',
    'https://finance.yahoo.com/quote/<TKR>',
    'https://marketchameleon.com/Overview/<TKR>',
    'https://www.earningswhispers.com/stocks/<TKR>',
    'https://www.morningstar.com/search?query=<TKR>',
    'https://www.tradingview.com/symbols/<TKR>',
    'https://www.sectorspdr.com/sectorspdr/resolve/<TKR>',
    'https://finviz.com/quote.ashx?t=<TKR>',
  ]

  sites.forEach(site => {
    app.openTab({
      url: site.replace('<TKR>', tickerInput.value),
      active: false
    })
  })
})

// chrome.storage.sync.get("color", ({ color }) => {
//   openTabsBtn.style.backgroundColor = color;
// });

