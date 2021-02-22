import app, { TICKET_PLACEHOLDER } from './app';
import ui from './ui';

const addForm = <HTMLButtonElement>document.getElementById('add-site-form');
addForm.addEventListener('submit', handleAddNewSite);

async function handleAddNewSite(event: InputEvent) {
  event.preventDefault();
  const urlInput = <HTMLInputElement>document.getElementById('new_site');
  if (!app.hasTicker(urlInput.value)) {
    // TODO: add text to ui
    console.error(`url should contain ${TICKET_PLACEHOLDER} tag`);
    urlInput.focus();
    urlInput.setAttribute('class', 'error');
    return false;
  }

  if (!app.isValidURL(urlInput.value)) {
    // TODO: add text to ui
    console.error('invaid url');
    urlInput.focus();
    urlInput.setAttribute('class', 'error');
    return false;
  }

  const exists = await app.findSiteBy('url', urlInput.value);
  if (exists) {
    // TODO: add text to ui
    console.error('already added');
    urlInput.focus();
    urlInput.setAttribute('class', 'error');
    return false;
  }

  urlInput.setAttribute('class', '');
  try {
    await app.addSite({ url: urlInput.value, enabled: true });
    urlInput.value = TICKET_PLACEHOLDER;
    handleRenderSites();
  } catch (e) {
    console.error('could not add site');
  }

  urlInput.focus();
}

async function handleRenderSites() {
  const sitesContainer = document.getElementById('sites');
  sitesContainer.innerHTML = '';
  const sites = await app.getAllSites();
  if (!sites.length) {
    sitesContainer.innerHTML = 'Empty list! add a new url to make it work!';
  }
  sites.forEach(site => {
    const sitesList = ui.buildSitesList();
    const deleteBtn = ui.buildSiteDeleteBtn(site);
    deleteBtn.addEventListener('click', handleDeteleSite);
    const siteBody = ui.buildSiteElement(site);
    sitesList.append(deleteBtn);
    sitesList.append(siteBody);
    sitesContainer.appendChild(sitesList);
  });
}

async function handleDeteleSite(event: any) {
  event.preventDefault();
  const url = event.target.getAttribute('data-url');
  const site = await app.findSiteBy('url', url);
  if (!site) {
    // TODO: add text to ui
    console.error('no site found');
    return false;
  }
  const urlInput = <HTMLInputElement>document.getElementById('new_site');
  try {
    await app.deleteSite(site);
    handleRenderSites();
  } catch (e) {
    console.error('could not delete site');
  }
  urlInput.focus();
}

handleRenderSites();
