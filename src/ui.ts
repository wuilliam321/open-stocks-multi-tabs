import { Site } from './types';

function buildSitesList() {
  const itemList = <HTMLLIElement>document.createElement('li');
  return itemList;
}

function buildEnabledCheckbox(site: Site) {
  const input = document.createElement('input');
  input.type = 'checkbox';
  input.value = site.url;
  input.checked = site.enabled;
  input.setAttribute('id', site.url);
  return input;
}

function buildSiteDeleteBtn(site: Site) {
  const input = document.createElement('input');
  input.type = 'button';
  input.value = 'X';
  input.setAttribute('data-url', site.url);
  input.setAttribute('name', site.url);
  return input;
}

function buildSiteElement(site: Site) {
  const elem = document.createElement('label');
  elem.setAttribute('class', 'site-url');
  elem.setAttribute('for', site.url);
  elem.textContent = site.url;
  return elem;
}

function buildSuccessMessage(errorMessage: string) {
  const container = document.createElement('div');
  container.setAttribute('class', 'success');
  const elem = document.createElement('span');
  elem.textContent = errorMessage;
  container.append(elem);
  return container;
}

function buildOptionsMessage() {
  const container = document.createElement('div');
  const msg = buildSuccessMessage("Let's get started!");
  container.append(msg);

  const stepOne = document.createElement('p');
  stepOne.textContent = 'Paste an URL like: ';

  const urlCode = document.createElement('code');
  urlCode.textContent = 'http://website.com/q=TICKER';
  stepOne.append(urlCode);
  container.append(stepOne);

  const stepTwo = document.createElement('p');
  stepTwo.textContent = 'Notice the TICKER word in the URL';
  container.append(stepTwo);

  const stepThree = document.createElement('p');
  stepThree.textContent =
    'Or simply click on "Load Sample Data" to make it easy';
  container.append(stepThree);

  return container;
}

function buildWelcomeMessage() {
  const container = document.createElement('div');
  const msg = buildSuccessMessage('YAY! You are almost done!');
  container.append(msg);

  const stepOne = document.createElement('p');
  stepOne.textContent = 'Click on "Options" and add some URLs to visit';
  container.append(stepOne);

  const stepTwo = document.createElement('p');
  stepTwo.textContent = 'Remember to add the TICKER word to the URL';
  container.append(stepTwo);
  return container;
}

const ui = {
  buildSitesList,
  buildSiteDeleteBtn,
  buildSiteElement,
  buildEnabledCheckbox,
  buildSuccessMessage,
  buildWelcomeMessage,
  buildOptionsMessage,
};

export default ui;
