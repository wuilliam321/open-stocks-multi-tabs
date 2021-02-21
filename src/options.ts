import storage from './storage';

const addBtn = <HTMLButtonElement>document.getElementById('add_site');
const urlInput = <HTMLInputElement>document.getElementById('new_site');

addBtn.addEventListener('click', handleAddNewSite);

function handleDeteleSite(event: any) {
  event.preventDefault();
  storage.get('sites', ({ sites }) => {
    const idx = sites.findIndex(
      (site: Site) => site.url == event.target.getAttribute('data-url'),
    );
    if (idx > -1) {
      sites.splice(idx, 1);
    }
    storage.set({ sites });
    handleRenderSites();
  });
}

function handleAddNewSite(event: InputEvent) {
  event.preventDefault();
  storage.get('sites', ({ sites }) => {
    const url = validateURL(urlInput.value);
    if (!url) {
      // TODO add error here
      return false;
    }
    sites = sites || [];
    sites.push({ url });
    storage.set({ sites });
    urlInput.value = '';
    urlInput.focus();
    handleRenderSites();
  });
}

function handleRenderSites() {
  const sitesList = document.getElementById('sites');
  sitesList.innerHTML = '';
  storage.get('sites', ({ sites }) => {
    if (!sites.length) {
      sitesList.innerHTML = 'Empty list! add a new url to make it work!';
    }
    sites.forEach((site: Site) => {
      const itemList = <HTMLLIElement>document.createElement('li');
      const delBtn = buildSiteDeleteBtn(site);
      const siteElement = buildSiteElement(site);
      itemList.append(delBtn);
      itemList.append(siteElement);
      sitesList.appendChild(itemList);
    });
  });
}

// ui
function buildSiteDeleteBtn(site: Site) {
  const delBtn = document.createElement('input');
  delBtn.type = 'button';
  delBtn.value = 'X';
  delBtn.setAttribute('data-url', site.url);
  delBtn.addEventListener('click', handleDeteleSite);
  return delBtn;
}

// ui
function buildSiteElement(site: Site) {
  const siteElement = document.createElement('span');
  siteElement.setAttribute('class', 'site-url');
  siteElement.textContent = site.url;
  return siteElement;
}

handleRenderSites();

// out of here
function validateURL(rawURL: string) {
  return rawURL;
}

type Site = {
  url: string;
};

