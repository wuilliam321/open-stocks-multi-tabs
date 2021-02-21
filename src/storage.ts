const set = (item) => {
    chrome.storage.sync.set(item);
}

const get = (key, cb) => {
  chrome.storage.sync.get(key, cb);
}

const storage = {
  set,
  get,
}

export default storage
