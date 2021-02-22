import storage from './storage';
import { TabOptions } from './types';

async function openTab(opts: TabOptions): Promise<number> {
  return new Promise(resolve => {
    chrome.tabs.create(opts, tab => resolve(tab.id));
  });
}

async function setOpenTabs(tabs: number[]): Promise<number[]> {
  return new Promise(resolve => {
    const handler = async () => {
      storage.set({ tabs }, () => resolve(tabs));
    };
    handler();
  });
}

async function closeAllTabs(): Promise<boolean> {
  return new Promise(async resolve => {
    const tabs = await getOpenTabs();
    const promises = [];
    tabs.forEach(async tabId => {
      promises.push(closeTab(tabId));
    });
    await Promise.all(promises);
    storage.set({ tabs: [] }, () => resolve(true));
  });
}

async function closeTab(tabId: number): Promise<number> {
  return new Promise(async resolve => {
    const tabs = await getOpenTabs();
    const idx = tabs.indexOf(tabId);
    if (idx != -1) {
      tabs.splice(idx, 1);
      chrome.tabs.remove(tabId);
    }
    storage.set({ tabs }, () => resolve(tabId));
  });
}

async function getOpenTabs(): Promise<number[]> {
  return new Promise(resolve => {
    storage.get('tabs', ({ tabs }) => {
      resolve(tabs || []);
    });
  });
}

const tabs = {
  openTab,
  closeTab,
  closeAllTabs,
  getOpenTabs,
  setOpenTabs,
};

export default tabs;
