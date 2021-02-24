import storage from './storage';
import { Site } from './types';

export const TICKET_PLACEHOLDER = 'TICKER';

// utils
function hasValidURLPattern(url: string) {
  return /^(http|https):\/\/[^ "]+$/.test(url);
}

function hasTicker(rawURL: string) {
  return rawURL.indexOf(TICKET_PLACEHOLDER) !== -1;
}

function isValidURL(rawURL: string) {
  if (
    !rawURL ||
    rawURL.trim() == '' ||
    !hasTicker(rawURL) ||
    !hasValidURLPattern(rawURL)
  ) {
    return false;
  }
  return true;
}

function prepareURL(rawURL: string) {
  return rawURL;
}

function findSiteBy(key: string, value: string): Promise<Site | void> {
  return new Promise(resolve => {
    storage.get('sites', ({ sites }) => {
      const idx = sites.findIndex((site: Site) => site[key] === value);
      if (idx > -1) {
        resolve(sites[idx]);
      } else {
        resolve();
      }
    });
  });
}

function getAllSites(): Promise<Site[]> {
  return new Promise(resolve => {
    storage.get('sites', ({ sites }) => {
      resolve(sites || []);
    });
  });
}

function deleteSite(site: Site): Promise<Site> {
  return new Promise((resolve, reject) => {
    storage.get('sites', async ({ sites }) => {
      const idx = sites.findIndex((curr: Site) => curr.url === site.url);
      if (idx > -1) {
        sites.splice(idx, 1);
        storage.set({ sites }, () => resolve(sites));
      } else {
        reject('unable to delete site');
      }
    });
  });
}

function setSites(sites: Site[]): Promise<Site[]> {
  return new Promise(resolve => {
    storage.set({ sites }, () => resolve(sites));
  });
}

function addSite(site: Site): Promise<Site> {
  return new Promise((resolve, reject) => {
    if (!isValidURL(site.url)) {
      reject('missing url');
    } else {
      site.url = prepareURL(site.url);
      storage.get('sites', async ({ sites }) => {
        sites = sites || [];
        const curr = await findSiteBy('url', site.url);
        if (curr) {
          reject('already exists');
        } else {
          sites.push(site);
          storage.set({ sites }, () => resolve(site));
        }
      });
    }
  });
}

function updateSite(site: Site): Promise<Site> {
  return new Promise((resolve, reject) => {
    if (!isValidURL(site.url)) {
      reject('missing url');
    } else {
      site.url = prepareURL(site.url);
      storage.get('sites', async ({ sites }) => {
        const idx = sites.findIndex((s: Site) => s.url === site.url);
        if (idx > -1) {
          sites[idx] = site;
          storage.set({ sites }, () => resolve(site));
        }
      });
    }
  });
}

const app = {
  isValidURL,
  hasTicker,
  hasValidURLPattern,
  getAllSites,
  findSiteBy,
  deleteSite,
  addSite,
  setSites,
  updateSite,
};

export default app;
