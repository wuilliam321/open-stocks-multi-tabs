import app, { TICKET_PLACEHOLDER } from './app';
import tabs from './tabs';
import ui from './ui';

const tickerForm = document.getElementById('form');
tickerForm.addEventListener('submit', handleOpenTicketTabs);

const closeTabsLink = document.getElementById('close-tabs');
closeTabsLink.addEventListener('click', handleCloseAllTabs);

const optionsLink = document.getElementById('go-to-options');
optionsLink.addEventListener('click', handleOpenOptions);

async function handleOpenTicketTabs(event) {
  event.preventDefault();
  const tickerInput = <HTMLInputElement>document.getElementById('ticker');
  if (!tickerInput.value) {
    // TODO: add error class to the input
    tickerInput.setAttribute('class', 'error');
    return false;
  } else {
    // TODO: remove error class
    tickerInput.setAttribute('class', '');
  }
  const sites = await app.getAllSites();
  const promises = [];
  const availableSites = sites.filter(s => s.enabled);
  availableSites.forEach(async site => {
    promises.push(
      tabs.openTab({
        url: site.url.replace(TICKET_PLACEHOLDER, tickerInput.value),
        active: false,
      }),
    );
  });
  const ids = await Promise.all(promises);
  await tabs.setOpenTabs(ids);
}

async function handleCloseAllTabs(event) {
  event.preventDefault();
  await tabs.closeAllTabs();
}

async function renderAvailableTabs() {
  const sites = await app.getAllSites();
  const sitesContainer = document.getElementById('tabs');
  sitesContainer.innerHTML = '';
  sites.forEach(site => {
    const sitesList = ui.buildSitesList();
    const enabledCheckbox = ui.buildEnabledCheckbox(site);
    enabledCheckbox.addEventListener('click', handleToggleSiteState);
    const siteBody = ui.buildSiteElement(site);
    sitesList.append(enabledCheckbox);
    sitesList.append(siteBody);
    sitesContainer.appendChild(sitesList);
  });
}

async function handleToggleSiteState(event) {
  const input = <HTMLInputElement>event.target;
  const site = (await app.getAllSites()).find(s => s.url === input.value);
  site.enabled = !site.enabled;
  await app.updateSite(site);
  renderAvailableTabs();
}

function handleOpenOptions(event) {
  event.preventDefault();
  if (chrome.runtime.openOptionsPage) {
    chrome.runtime.openOptionsPage();
  } else {
    window.open(chrome.runtime.getURL('options.html'));
  }
}

renderAvailableTabs();
