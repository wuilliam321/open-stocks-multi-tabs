type TabOptions = {
  url: string
  active: boolean
};

const openTab = (opts: TabOptions) => {
  chrome.tabs.create(opts)
}

const app = {
  openTab,
}

export default app
