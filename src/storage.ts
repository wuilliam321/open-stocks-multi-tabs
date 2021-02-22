const set = (item: any, cb: (...args: any[]) => any) => {
  chrome.storage.sync.set(item, cb);
};

const get = (key: string, cb: (...args: any[]) => any) => {
  chrome.storage.sync.get(key, cb);
};

const storage = {
  set,
  get,
};

export default storage;
